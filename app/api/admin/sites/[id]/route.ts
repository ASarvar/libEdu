import { NextRequest, NextResponse } from 'next/server';
import { getSiteById, updateSite } from '@/lib/site';
import { query } from '@/lib/db';
import { withAuthAndRateLimitWithContext } from '@/lib/api-auth';
import { deleteManagedUploadFile, deleteManagedUploadFiles } from '@/lib/upload-cleanup';

// GET - Get single site by ID
export const GET = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  _user,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await context.params;

    const site = await getSiteById(id);
    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    return NextResponse.json({ site });
  } catch (error) {
    console.error('Error fetching site:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, { allowedRoles: ['superadmin'] });

// PATCH - Update site
export const PATCH = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  _user,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await context.params;
    const currentSite = await getSiteById(id);

    if (!currentSite) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const body = await request.json();
    const site = await updateSite(id, body);

    if (
      currentSite.logo_path &&
      body.logo_path !== undefined &&
      body.logo_path !== currentSite.logo_path
    ) {
      await deleteManagedUploadFile(currentSite.logo_path);
    }

    return NextResponse.json({ site });
  } catch (error) {
    console.error('Error updating site:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, { allowedRoles: ['superadmin'] });

// DELETE - Delete site (hard delete)
export const DELETE = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  _user,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    void request;

    const { id } = await context.params;
    const site = await getSiteById(id);

    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const newsImagesResult = await query(
      'SELECT cover_image FROM news WHERE site_id = $1 AND cover_image IS NOT NULL',
      [id]
    );

    const newsImagePaths = newsImagesResult.rows.map((row) => row.cover_image as string);

    // Hard delete - completely remove the site
    const result = await query(
      'DELETE FROM sites WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    await deleteManagedUploadFiles([site.logo_path, ...newsImagePaths]);

    return NextResponse.json({ 
      success: true,
      message: 'Site deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting site:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, { allowedRoles: ['superadmin'] });
