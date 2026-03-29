import { NextRequest, NextResponse } from 'next/server';
import { getAllSites, createSite } from '@/lib/site';
import { withAuthAndRateLimit } from '@/lib/api-auth';

// GET - List all sites (superadmin only)
export const GET = withAuthAndRateLimit(async () => {
  try {
    const sites = await getAllSites();
    return NextResponse.json({ sites });
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, { allowedRoles: ['superadmin'] });

// POST - Create new site (superadmin only)
export const POST = withAuthAndRateLimit(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { 
      subdomain, 
      name, 
      description, 
      logo_url,
      logo_path,
      primary_color,
      secondary_color,
      contact_email, 
      contact_phone, 
      contact_address,
      facebook_url,
      instagram_url,
      twitter_url,
      header_style,
      footer_style,
      home_style,
      enable_dark_mode,
      custom_css
    } = body;

    // Validate required fields
    if (!subdomain || !name) {
      return NextResponse.json(
        { error: 'Subdomain and name are required' },
        { status: 400 }
      );
    }

    // Validate subdomain format (lowercase, alphanumeric, hyphens only, 3-50 chars)
    if (!/^[a-z0-9-]{3,50}$/.test(subdomain)) {
      return NextResponse.json(
        { error: 'Subdomain must be 3-50 characters and contain only lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    // Validate color format if provided
    if (primary_color && !/^#[0-9A-Fa-f]{6}$/.test(primary_color)) {
      return NextResponse.json(
        { error: 'Invalid primary color format. Use hex format (#RRGGBB)' },
        { status: 400 }
      );
    }

    if (secondary_color && !/^#[0-9A-Fa-f]{6}$/.test(secondary_color)) {
      return NextResponse.json(
        { error: 'Invalid secondary color format. Use hex format (#RRGGBB)' },
        { status: 400 }
      );
    }

    const site = await createSite({
      subdomain,
      name,
      description,
      logo_url,
      logo_path,
      primary_color,
      secondary_color,
      contact_email,
      contact_phone,
      contact_address,
      facebook_url,
      instagram_url,
      twitter_url,
      header_style,
      footer_style,
      home_style,
      enable_dark_mode,
      custom_css,
      created_by: user.id,
    });

    return NextResponse.json({ site }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating site:', error);
    
    // Handle unique constraint violation
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Subdomain already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, { allowedRoles: ['superadmin'] });
