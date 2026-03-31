import { getNewsBySlug } from '@/lib/news';
import { getSiteBySubdomain } from '@/lib/site';
import { headers } from 'next/headers';
import { apiError, apiOk } from '@/lib/api-response';

// GET - Get single published news by slug (public)
export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = host.split('.')[0];

    // Get site by subdomain
    const site = await getSiteBySubdomain(subdomain);
    
    if (!site) {
      return apiError(404, { code: 'SITE_NOT_FOUND', message: 'Site not found' });
    }

    const { slug } = await context.params;
    const news = await getNewsBySlug(site.id, slug, {
      publishedOnly: true,
      incrementViews: true,
    });

    if (!news) {
      return apiError(404, { code: 'NEWS_NOT_FOUND', message: 'News not found' });
    }

    return apiOk({ news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return apiError(500, {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  }
}
