import { getNewsBySite } from '@/lib/news';
import { getSiteBySubdomain } from '@/lib/site';
import { headers } from 'next/headers';
import { apiError, apiOk } from '@/lib/api-response';

// GET - Get published news for current site (public)
export async function GET() {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = host.split('.')[0];

    // Get site by subdomain
    const site = await getSiteBySubdomain(subdomain);
    
    if (!site) {
      return apiError(404, { code: 'SITE_NOT_FOUND', message: 'Site not found' });
    }

    // Get only published news
    const news = await getNewsBySite(site.id, false);

    return apiOk({ news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return apiError(500, {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  }
}
