import { NextRequest } from 'next/server';
import { getAllSites, createSite } from '@/lib/site';
import { withAuthAndRateLimit } from '@/lib/api-auth';
import { apiError, apiOk } from '@/lib/api-response';
import { parseCreateSiteInput, SiteInputError } from '@/lib/site-validation';

// GET - List all sites (superadmin only)
export const GET = withAuthAndRateLimit(
  async () => {
    try {
      const sites = await getAllSites();
      return apiOk({ sites });
    } catch (error) {
      console.error('Error fetching sites:', error);
      return apiError(500, {
        code: 'INTERNAL_ERROR',
        message: 'Failed to fetch sites',
      });
    }
  },
  { allowedRoles: ['superadmin'] },
);

// POST - Create new site (superadmin only)
export const POST = withAuthAndRateLimit(
  async (request: NextRequest, user) => {
    try {
      const body = await request.json();
      const input = parseCreateSiteInput(body);

      const site = await createSite({
        ...input,
        created_by: user.id,
      });

      return apiOk({ site }, { status: 201 });
    } catch (error: any) {
      console.error('Error creating site:', error);

      if (error instanceof SiteInputError) {
        return apiError(error.status, {
          code: error.code,
          message: error.message,
        });
      }

      if (error.code === '23505') {
        return apiError(409, {
          code: 'SUBDOMAIN_ALREADY_EXISTS',
          message: 'Subdomain already exists',
        });
      }

      return apiError(500, {
        code: 'INTERNAL_ERROR',
        message: 'Failed to create site',
      });
    }
  },
  { allowedRoles: ['superadmin'] },
);
