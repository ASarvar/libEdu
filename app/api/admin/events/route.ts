import { NextRequest } from 'next/server';
import { getEventsBySite, getAllEvents, createEvent, generateEventSlug } from '@/lib/events';
import { withAuthAndRateLimit } from '@/lib/api-auth';
import { apiError, apiOk } from '@/lib/api-response';
import { EventInputError, parseCreateEventInput } from '@/lib/events-validation';

// GET - List all events (admin: their site, superadmin: all sites)
export const GET = withAuthAndRateLimit(async (request: NextRequest, user) => {
  try {
    void request;

    let events;
    if (user.role === 'superadmin') {
      events = await getAllEvents();
    } else if (user.site_id) {
      events = await getEventsBySite(user.site_id, true);
    } else {
      return apiError(403, { code: 'SITE_ASSIGNMENT_REQUIRED', message: 'Admin must be assigned to a site' });
    }

    return apiOk({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return apiError(500, { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' });
  }
}, { allowedRoles: ['admin', 'superadmin'] });

// POST - Create new event
export const POST = withAuthAndRateLimit(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const input = parseCreateEventInput(body);

    let finalSiteId = input.site_id;
    if (user.role === 'admin') {
      if (!user.site_id) {
        return apiError(403, { code: 'SITE_ASSIGNMENT_REQUIRED', message: 'Admin must be assigned to a site' });
      }
      finalSiteId = user.site_id;
    } else if (user.role === 'superadmin' && !input.site_id) {
      return apiError(400, { code: 'MISSING_SITE_ID', message: 'site_id is required for superadmin' });
    }

    if (!finalSiteId) {
      return apiError(400, { code: 'MISSING_SITE_ID', message: 'site_id could not be resolved' });
    }

    const slug = input.slug || generateEventSlug(input.title);

    const event = await createEvent({
      site_id: finalSiteId,
      title: input.title,
      slug,
      description: input.description,
      cover_image: input.cover_image,
      location: input.location,
      event_date: input.event_date,
      end_date: input.end_date,
      is_published: input.is_published,
      created_by: user.id,
      title_uz: input.title_uz,
      title_ru: input.title_ru,
      title_en: input.title_en,
      description_uz: input.description_uz,
      description_ru: input.description_ru,
      description_en: input.description_en,
    });

    return apiOk({ event }, { status: 201 });
  } catch (error: any) {
    if (error instanceof EventInputError) {
      return apiError(error.status, { code: error.code, message: error.message });
    }
    console.error('Error creating event:', error);
    if (error.code === '23505') {
      return apiError(409, { code: 'DUPLICATE_EVENT_SLUG', message: 'An event with this slug already exists for this site' });
    }
    return apiError(500, { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' });
  }
}, { allowedRoles: ['admin', 'superadmin'] });
