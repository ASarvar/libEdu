import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { getAllSites, createSite } from '@/lib/site';
import { cookies } from 'next/headers';

// GET - List all sites (superadmin only)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifySession(sessionToken);
    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const sites = await getAllSites();
    return NextResponse.json({ sites });
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new site (superadmin only)
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifySession(sessionToken);
    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { 
      subdomain, 
      name, 
      description, 
      logo_url,
      primary_color,
      secondary_color,
      contact_email, 
      contact_phone, 
      contact_address,
      facebook_url,
      instagram_url,
      twitter_url
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
      primary_color,
      secondary_color,
      contact_email,
      contact_phone,
      contact_address,
      facebook_url,
      instagram_url,
      twitter_url,
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
}
