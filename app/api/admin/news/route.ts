import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { getNewsBySite, getAllNews, createNews, generateSlug } from '@/lib/news';
import { cookies } from 'next/headers';

// GET - List all news (admin: their site, superadmin: all sites)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifySession(sessionToken);
    if (!user || !['admin', 'superadmin'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    let news;
    if (user.role === 'superadmin') {
      // Superadmin can see all news from all sites
      news = await getAllNews();
    } else if (user.site_id) {
      // Admin can only see their site's news (including unpublished)
      news = await getNewsBySite(user.site_id, true);
    } else {
      return NextResponse.json(
        { error: 'Admin must be assigned to a site' },
        { status: 403 }
      );
    }

    return NextResponse.json({ news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new news
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifySession(sessionToken);
    if (!user || !['admin', 'superadmin'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { 
      site_id,
      title, 
      slug: customSlug,
      excerpt, 
      content, 
      cover_image,
      is_published
    } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Determine site_id
    let finalSiteId = site_id;
    if (user.role === 'admin') {
      if (!user.site_id) {
        return NextResponse.json(
          { error: 'Admin must be assigned to a site' },
          { status: 403 }
        );
      }
      finalSiteId = user.site_id; // Admins can only create for their site
    } else if (user.role === 'superadmin' && !site_id) {
      return NextResponse.json(
        { error: 'site_id is required for superadmin' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const slug = customSlug || generateSlug(title);

    const news = await createNews({
      site_id: finalSiteId,
      title,
      slug,
      excerpt,
      content,
      cover_image,
      author_id: user.id,
      is_published: is_published || false,
      published_at: is_published ? new Date() : undefined,
    });

    return NextResponse.json({ news }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating news:', error);
    
    // Handle unique constraint violation (duplicate slug)
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'A news item with this slug already exists for this site' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
