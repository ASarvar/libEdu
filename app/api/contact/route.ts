import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.form_name && !body.first_name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!body.form_email && !body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const name = body.form_name || body.first_name;
    const email = body.form_email || body.email;
    const message = body.form_message || body.message || '';
    const siteId = body.siteId || null;

    // Save contact form submission to database
    await query(
      `INSERT INTO contact_submissions 
       (site_id, name, email, message, created_at) 
       VALUES ($1, $2, $3, $4, NOW())`,
      [siteId, name, email, message]
    );

    // TODO: Send email notification to site admin
    // You can implement email sending logic here using the site's contact_email

    console.log('Contact form submission saved:', {
      siteId,
      name,
      email,
      messageLength: message.length
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

