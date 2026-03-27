import { NextResponse } from 'next/server';
import { getNewsBySlug } from '@/lib/news';
import { getSiteBySubdomain } from '@/lib/site';
import { headers } from 'next/headers';

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
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const { slug } = await context.params;
    const news = await getNewsBySlug(site.id, slug);

    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    // Only return if published
    if (!news.is_published) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
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
