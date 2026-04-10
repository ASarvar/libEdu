import { getEventsBySite } from '@/lib/events';
import { getSiteBySubdomain } from '@/lib/site';
import { headers } from 'next/headers';
import { apiError, apiOk } from '@/lib/api-response';

// GET - Get published events for current site (public)
export async function GET() {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = host.split('.')[0];

    const site = await getSiteBySubdomain(subdomain);

    if (!site) {
      return apiError(404, { code: 'SITE_NOT_FOUND', message: 'Site not found' });
    }

    const events = await getEventsBySite(site.id, false);

    return apiOk({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return apiError(500, { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' });
  }
}
