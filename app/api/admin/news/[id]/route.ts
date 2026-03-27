import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { getNewsById, updateNews, deleteNews } from '@/lib/news';
import { cookies } from 'next/headers';

// GET - Get single news by ID
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifySession(sessionToken);
    if (!user || !['admin', 'superadmin'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

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
}

// PATCH - Update news
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifySession(sessionToken);
    if (!user || !['admin', 'superadmin'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

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
}

// DELETE - Delete news
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifySession(sessionToken);
    if (!user || !['admin', 'superadmin'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

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

    return NextResponse.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
