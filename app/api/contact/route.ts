import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { rateLimiter, getClientIP, RATE_LIMITS } from '@/lib/rate-limit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 submissions per hour per IP
    const ip = getClientIP(request.headers);
    const isRateLimited = await rateLimiter.check(
      `contact:${ip}`,
      RATE_LIMITS.CONTACT.maxRequests,
      RATE_LIMITS.CONTACT.windowMs
    );

    if (isRateLimited) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

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

    const name = (body.form_name || body.first_name) as string;
    const email = (body.form_email || body.email) as string;
    const message = (body.form_message || body.message || '') as string;
    const siteId = body.siteId || null;

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Limit field lengths to prevent oversized payloads
    if (name.length > 255 || email.length > 255 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Input exceeds maximum allowed length' },
        { status: 400 }
      );
    }

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

