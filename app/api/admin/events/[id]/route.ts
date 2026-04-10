import { NextRequest } from 'next/server';
import { getEventById, updateEvent, deleteEvent } from '@/lib/events';
import { withAuthAndRateLimitWithContext } from '@/lib/api-auth';
import { deleteManagedUploadFile } from '@/lib/upload-cleanup';
import { apiError, apiOk } from '@/lib/api-response';
import { EventInputError, parseUpdateEventInput } from '@/lib/events-validation';

// GET - Get single event by ID
export const GET = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  user,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    void request;
    const { id } = await context.params;
    const event = await getEventById(id);

    if (!event) {
      return apiError(404, { code: 'EVENT_NOT_FOUND', message: 'Event not found' });
    }

    if (user.role === 'admin' && event.site_id !== user.site_id) {
      return apiError(403, { code: 'FORBIDDEN', message: 'Forbidden' });
    }

    return apiOk({ event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return apiError(500, { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' });
  }
}, { allowedRoles: ['admin', 'superadmin'] });

// PATCH - Update event
export const PATCH = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  user,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await context.params;
    const event = await getEventById(id);

    if (!event) {
      return apiError(404, { code: 'EVENT_NOT_FOUND', message: 'Event not found' });
    }

    if (user.role === 'admin' && event.site_id !== user.site_id) {
      return apiError(403, { code: 'FORBIDDEN', message: 'Forbidden' });
    }

    const body = await request.json();
    const input = parseUpdateEventInput(body);
    const updatedEvent = await updateEvent(id, input);

    if (event.cover_image && input.cover_image !== undefined && input.cover_image !== event.cover_image) {
      await deleteManagedUploadFile(event.cover_image);
    }

    return apiOk({ event: updatedEvent });
  } catch (error: any) {
    if (error instanceof EventInputError) {
      return apiError(error.status, { code: error.code, message: error.message });
    }
    console.error('Error updating event:', error);
    if (error.code === '23505') {
      return apiError(409, { code: 'DUPLICATE_EVENT_SLUG', message: 'An event with this slug already exists for this site' });
    }
    return apiError(500, { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' });
  }
}, { allowedRoles: ['admin', 'superadmin'] });

// DELETE - Delete event
export const DELETE = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  user,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    void request;
    const { id } = await context.params;
    const event = await getEventById(id);

    if (!event) {
      return apiError(404, { code: 'EVENT_NOT_FOUND', message: 'Event not found' });
    }

    if (user.role === 'admin' && event.site_id !== user.site_id) {
      return apiError(403, { code: 'FORBIDDEN', message: 'Forbidden' });
    }

    await deleteEvent(id);

    if (event.cover_image) {
      await deleteManagedUploadFile(event.cover_image);
    }

    return apiOk({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return apiError(500, { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' });
  }
}, { allowedRoles: ['admin', 'superadmin'] });
