import { NextRequest, NextResponse } from 'next/server';

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

    // TODO: Implement your actual email sending logic here
    // Examples:
    // - Send email via SendGrid, Mailgun, Resend, etc.
    // - Save to database
    // - Send to CRM

    console.log('Contact form submission:', body);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500));

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

