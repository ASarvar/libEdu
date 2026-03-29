import { NextRequest, NextResponse } from 'next/server';
import { getNewsById, updateNews, deleteNews } from '@/lib/news';
import { withAuthAndRateLimitWithContext } from '@/lib/api-auth';
import { deleteManagedUploadFile } from '@/lib/upload-cleanup';

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
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    // Check if admin is accessing their own site's news
    if (user.role === 'admin' && news.site_id !== user.site_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
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
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    // Check if admin is updating their own site's news
    if (user.role === 'admin' && news.site_id !== user.site_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const updatedNews = await updateNews(id, body);

    if (
      news.cover_image &&
      body.cover_image !== undefined &&
      body.cover_image !== news.cover_image
    ) {
      await deleteManagedUploadFile(news.cover_image);
    }

    return NextResponse.json({ news: updatedNews });
  } catch (error: any) {
    console.error('Error updating news:', error);
    
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
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    // Check if admin is deleting their own site's news
    if (user.role === 'admin' && news.site_id !== user.site_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await deleteNews(id);
    await deleteManagedUploadFile(news.cover_image);

    return NextResponse.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, { allowedRoles: ['admin', 'superadmin'] });
