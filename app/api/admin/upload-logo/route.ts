// API endpoint for logo upload
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { withAuth } from '@/lib/api-auth';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ALLOWED_TYPES = ['image/png', 'image/svg+xml'];
const ALLOWED_EXTENSIONS = ['.png', '.svg'];
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'logos');

export const POST = withAuth(async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get('logo') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Logo fayli topilmadi' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Faqat PNG va SVG formatlar qo\'llab-quvvatlanadi' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Fayl hajmi 1MB dan oshmasligi kerak' },
        { status: 400 }
      );
    }

    // Validate file extension
    const fileExt = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return NextResponse.json(
        { error: 'Noto\'g\'ri fayl kengaytmasi' },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // Generate unique filename
    const uniqueFilename = `${uuidv4()}${fileExt}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFilename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return relative path for database storage
    const relativePath = `/uploads/logos/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      path: relativePath,
      message: 'Logo muvaffaqiyatli yuklandi'
    });
  } catch (error) {
    console.error('Logo upload error:', error);
    return NextResponse.json(
      { error: 'Logo yuklashda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}, { allowedRoles: ['superadmin', 'admin'] });

// Delete logo
export const DELETE = withAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const logoPath = searchParams.get('path');

    if (!logoPath) {
      return NextResponse.json(
        { error: 'Logo yo\'li ko\'rsatilmagan' },
        { status: 400 }
      );
    }

    // Security check - ensure path is within uploads directory
    const fullPath = path.join(process.cwd(), 'public', logoPath);
    if (!fullPath.includes(UPLOAD_DIR)) {
      return NextResponse.json(
        { error: 'Noto\'g\'ri fayl yo\'li' },
        { status: 400 }
      );
    }

    // Delete file if exists
    if (existsSync(fullPath)) {
      const { unlink } = await import('fs/promises');
      await unlink(fullPath);
    }

    return NextResponse.json({
      success: true,
      message: 'Logo o\'chirildi'
    });
  } catch (error) {
    console.error('Logo delete error:', error);
    return NextResponse.json(
      { error: 'Logo o\'chirishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}, { allowedRoles: ['superadmin', 'admin'] });
