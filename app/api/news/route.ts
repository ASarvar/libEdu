import { NextResponse } from 'next/server';
import { getNewsBySite } from '@/lib/news';
import { getSiteBySubdomain } from '@/lib/site';
import { headers } from 'next/headers';

// GET - Get published news for current site (public)
export async function GET() {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = host.split('.')[0];

    // Get site by subdomain
    const site = await getSiteBySubdomain(subdomain);
    
    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    // Get only published news
    const news = await getNewsBySite(site.id, false);

    return NextResponse.json({ news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
