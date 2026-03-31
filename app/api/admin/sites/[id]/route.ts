import { NextRequest } from 'next/server';
import { getSiteById, updateSite } from '@/lib/site';
import { query } from '@/lib/db';
import { withAuthAndRateLimitWithContext } from '@/lib/api-auth';
import { deleteManagedUploadFile, deleteManagedUploadFiles } from '@/lib/upload-cleanup';
import { apiError, apiOk } from '@/lib/api-response';
import { parseUpdateSiteInput, SiteInputError } from '@/lib/site-validation';

// GET - Get single site by ID
export const GET = withAuthAndRateLimitWithContext(
  async (
    request: NextRequest,
    _user,
    context: { params: Promise<{ id: string }> },
  ) => {
    try {
      void request;

      const { id } = await context.params;
      const site = await getSiteById(id);
      if (!site) {
        return apiError(404, {
          code: 'SITE_NOT_FOUND',
          message: 'Site not found',
        });
      }

      return apiOk({ site });
    } catch (error) {
      console.error('Error fetching site:', error);
      return apiError(500, {
        code: 'INTERNAL_ERROR',
        message: 'Failed to fetch site',
      });
    }
  },
  { allowedRoles: ['superadmin'] },
);

// PATCH - Update site
export const PATCH = withAuthAndRateLimitWithContext(
  async (
    request: NextRequest,
    _user,
    context: { params: Promise<{ id: string }> },
  ) => {
    try {
      const { id } = await context.params;
      const currentSite = await getSiteById(id);

      if (!currentSite) {
        return apiError(404, {
          code: 'SITE_NOT_FOUND',
          message: 'Site not found',
        });
      }

      const body = await request.json();
      const input = parseUpdateSiteInput(body);
      const site = await updateSite(id, input);

      if (
        currentSite.logo_path &&
        input.logo_path !== undefined &&
        input.logo_path !== currentSite.logo_path
      ) {
        await deleteManagedUploadFile(currentSite.logo_path);
      }

      return apiOk({ site });
    } catch (error) {
      console.error('Error updating site:', error);

      if (error instanceof SiteInputError) {
        return apiError(error.status, {
          code: error.code,
          message: error.message,
        });
      }

      return apiError(500, {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update site',
      });
    }
  },
  { allowedRoles: ['superadmin'] },
);

// DELETE - Delete site (hard delete)
export const DELETE = withAuthAndRateLimitWithContext(
  async (
    request: NextRequest,
    _user,
    context: { params: Promise<{ id: string }> },
  ) => {
    try {
      void request;

      const { id } = await context.params;
      const site = await getSiteById(id);

      if (!site) {
        return apiError(404, {
          code: 'SITE_NOT_FOUND',
          message: 'Site not found',
        });
      }

      const newsImagesResult = await query(
        'SELECT cover_image FROM news WHERE site_id = $1 AND cover_image IS NOT NULL',
        [id],
      );

      const newsImagePaths = newsImagesResult.rows.map((row) => row.cover_image as string);

      const result = await query('DELETE FROM sites WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        return apiError(404, {
          code: 'SITE_NOT_FOUND',
          message: 'Site not found',
        });
      }

      await deleteManagedUploadFiles([site.logo_path, ...newsImagePaths]);

      return apiOk({ message: 'Site deleted successfully' });
    } catch (error) {
      console.error('Error deleting site:', error);
      return apiError(500, {
        code: 'INTERNAL_ERROR',
        message: 'Failed to delete site',
      });
    }
  },
  { allowedRoles: ['superadmin'] },
);
