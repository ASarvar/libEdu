import { getEventBySlug } from '@/lib/events';
import { getSiteBySubdomain } from '@/lib/site';
import { headers } from 'next/headers';
import { apiError, apiOk } from '@/lib/api-response';

// GET - Get single published event by slug (public)
export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const subdomain = host.split('.')[0];

    const site = await getSiteBySubdomain(subdomain);

    if (!site) {
      return apiError(404, { code: 'SITE_NOT_FOUND', message: 'Site not found' });
    }

    const { slug } = await context.params;
    const event = await getEventBySlug(site.id, slug, { publishedOnly: true });

    if (!event) {
      return apiError(404, { code: 'EVENT_NOT_FOUND', message: 'Event not found' });
    }

    return apiOk({ event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return apiError(500, { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' });
  }
}
