import { NextRequest } from 'next/server';
import { getNewsById, updateNews, deleteNews } from '@/lib/news';
import { withAuthAndRateLimitWithContext } from '@/lib/api-auth';
import { deleteManagedUploadFile } from '@/lib/upload-cleanup';
import { apiError, apiOk } from '@/lib/api-response';
import { NewsInputError, parseUpdateNewsInput } from '@/lib/news-validation';
import { logNewsUpdate, logNewsDelete, getIpFromRequest } from '@/lib/audit-log';

// GET - Get single news by ID
export const GET = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  user,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    void request;

    const { id } = await context.params;
    const news = await getNewsById(id);

    if (!news) {
      return apiError(404, { code: 'NEWS_NOT_FOUND', message: 'News not found' });
    }

    // Check if admin is accessing their own site's news
    if (user.role === 'admin' && news.site_id !== user.site_id) {
      return apiError(403, { code: 'FORBIDDEN', message: 'Forbidden' });
    }

    return apiOk({ news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return apiError(500, {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  }
}, { allowedRoles: ['admin', 'superadmin'] });

// PATCH - Update news
export const PATCH = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  user,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await context.params;
    const news = await getNewsById(id);

    if (!news) {
      return apiError(404, { code: 'NEWS_NOT_FOUND', message: 'News not found' });
    }

    // Check if admin is updating their own site's news
    if (user.role === 'admin' && news.site_id !== user.site_id) {
      return apiError(403, { code: 'FORBIDDEN', message: 'Forbidden' });
    }

    const body = await request.json();
    const input = parseUpdateNewsInput(body);
    const updatedNews = await updateNews(id, input);

    if (
      news.cover_image &&
      input.cover_image !== undefined &&
      input.cover_image !== news.cover_image
    ) {
      await deleteManagedUploadFile(news.cover_image);
    }

    // Log the action
    await logNewsUpdate(user.id, id, input, getIpFromRequest(request));

    return apiOk({ news: updatedNews });
  } catch (error: any) {
    if (error instanceof NewsInputError) {
      return apiError(error.status, {
        code: error.code,
        message: error.message,
      });
    }

    console.error('Error updating news:', error);
    
    // Handle unique constraint violation (duplicate slug)
    if (error.code === '23505') {
      return apiError(409, {
        code: 'DUPLICATE_NEWS_SLUG',
        message: 'A news item with this slug already exists for this site',
      });
    }

    return apiError(500, {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  }
}, { allowedRoles: ['admin', 'superadmin'] });

// DELETE - Delete news
export const DELETE = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  user,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    void request;

    const { id } = await context.params;
    const news = await getNewsById(id);

    if (!news) {
      return apiError(404, { code: 'NEWS_NOT_FOUND', message: 'News not found' });
    }

    // Check if admin is deleting their own site's news
    if (user.role === 'admin' && news.site_id !== user.site_id) {
      return apiError(403, { code: 'FORBIDDEN', message: 'Forbidden' });
    }

    await deleteNews(id);
    await deleteManagedUploadFile(news.cover_image);

    // Log the action
    await logNewsDelete(user.id, id, {
      title: news.title,
      siteId: news.site_id,
    }, getIpFromRequest(request));

    return apiOk({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return apiError(500, {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  }
}, { allowedRoles: ['admin', 'superadmin'] });
