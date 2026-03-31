import { NextRequest } from 'next/server';
import { getNewsBySite, getAllNews, createNews, generateSlug } from '@/lib/news';
import { withAuthAndRateLimit } from '@/lib/api-auth';
import { apiError, apiOk } from '@/lib/api-response';
import { NewsInputError, parseCreateNewsInput } from '@/lib/news-validation';
import { logNewsCreate, getIpFromRequest } from '@/lib/audit-log';

// GET - List all news (admin: their site, superadmin: all sites)
export const GET = withAuthAndRateLimit(async (request: NextRequest, user) => {
  try {
    void request;

    let news;
    if (user.role === 'superadmin') {
      // Superadmin can see all news from all sites
      news = await getAllNews();
    } else if (user.site_id) {
      // Admin can only see their site's news (including unpublished)
      news = await getNewsBySite(user.site_id, true);
    } else {
      return apiError(403, {
        code: 'SITE_ASSIGNMENT_REQUIRED',
        message: 'Admin must be assigned to a site',
      });
    }

    return apiOk({ news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return apiError(500, {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  }
}, { allowedRoles: ['admin', 'superadmin'] });

// POST - Create new news
export const POST = withAuthAndRateLimit(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const input = parseCreateNewsInput(body);

    // Determine site_id
    let finalSiteId = input.site_id;
    if (user.role === 'admin') {
      if (!user.site_id) {
        return apiError(403, {
          code: 'SITE_ASSIGNMENT_REQUIRED',
          message: 'Admin must be assigned to a site',
        });
      }
      finalSiteId = user.site_id; // Admins can only create for their site
    } else if (user.role === 'superadmin' && !input.site_id) {
      return apiError(400, {
        code: 'MISSING_SITE_ID',
        message: 'site_id is required for superadmin',
      });
    }

    if (!finalSiteId) {
      return apiError(400, {
        code: 'MISSING_SITE_ID',
        message: 'site_id could not be resolved',
      });
    }

    // Generate slug if not provided
    const slug = input.slug || generateSlug(input.title);

    const news = await createNews({
      site_id: finalSiteId,
      title: input.title,
      slug,
      excerpt: input.excerpt,
      content: input.content,
      cover_image: input.cover_image,
      author_id: user.id,
      is_published: input.is_published,
      published_at: input.is_published ? new Date() : undefined,
    });

    // Log the action
    await logNewsCreate(user.id, news.id, {
      title: news.title,
      siteId: finalSiteId,
    }, getIpFromRequest(request));

    return apiOk({ news }, { status: 201 });
  } catch (error: any) {
    if (error instanceof NewsInputError) {
      return apiError(error.status, {
        code: error.code,
        message: error.message,
      });
    }

    console.error('Error creating news:', error);
    
    // Handle unique constraint violation (duplicate slug)
    if (error.code === '23505') {
      return apiError(409, {
        code: 'DUPLICATE_NEWS_SLUG',
        message: 'A news item with this slug already exists for this site',
      });
    }

    return apiError(500, {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  }
}, { allowedRoles: ['admin', 'superadmin'] });
