import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getSiteBySubdomain } from '@/lib/site';
import { defaultMainSite } from '@/lib/defaultSite';

export async function GET() {
  try {
    const headersList = await headers();
    const subdomain = headersList.get('x-subdomain');

    // If no subdomain, return default main site
    if (!subdomain) {
      return NextResponse.json({
        site: defaultMainSite,
        message: 'Main site - using default configuration',
      }, { status: 200 });
    }

    // Fetch site from database
    const site = await getSiteBySubdomain(subdomain);

    if (!site) {
      return NextResponse.json({
        site: null,
        error: 'Site not found or inactive',
      }, { status: 200 }); // Return 200 with null site instead of 404
    }

    return NextResponse.json({ site });
  } catch (error) {
    console.error('Error fetching current site:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
