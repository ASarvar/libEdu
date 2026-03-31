// API endpoint for logo upload
import { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { withAuth } from '@/lib/api-auth';
import { apiOk, apiError } from '@/lib/api-response';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ALLOWED_TYPES = ['image/png', 'image/svg+xml'];
const ALLOWED_EXTENSIONS = ['.png', '.svg'];
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'logos');

export const POST = withAuth(async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get('logo') as File;

    if (!file) {
      return apiError(400, {
        code: 'MISSING_FILE',
        message: 'Logo file is required',
      });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return apiError(400, {
        code: 'INVALID_FILE_TYPE',
        message: 'Only PNG and SVG formats are supported',
      });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return apiError(400, {
        code: 'FILE_TOO_LARGE',
        message: 'File size must not exceed 1MB',
      });
    }

    // Validate file extension
    const fileExt = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return apiError(400, {
        code: 'INVALID_EXTENSION',
        message: 'Invalid file extension',
      });
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

    return apiOk({ path: relativePath }, { status: 201 });
  } catch (error) {
    console.error('Logo upload error:', error);
    return apiError(500, {
      code: 'UPLOAD_FAILED',
      message: 'Failed to upload logo',
    });
  }
}, { allowedRoles: ['superadmin', 'admin'] });

// Delete logo
export const DELETE = withAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const logoPath = searchParams.get('path');

    if (!logoPath) {
      return apiError(400, {
        code: 'MISSING_PATH',
        message: 'Logo path is required',
      });
    }

    // Security check - ensure path is within uploads directory
    const fullPath = path.join(process.cwd(), 'public', logoPath);
    if (!fullPath.includes(UPLOAD_DIR)) {
      return apiError(400, {
        code: 'INVALID_PATH',
        message: 'Invalid file path',
      });
    }

    // Delete file if exists
    if (existsSync(fullPath)) {
      const { unlink } = await import('fs/promises');
      await unlink(fullPath);
    }

    return apiOk({ message: 'Logo deleted successfully' });
  } catch (error) {
    console.error('Logo delete error:', error);
    return apiError(500, {
      code: 'DELETE_FAILED',
      message: 'Failed to delete logo',
    });
  }
}, { allowedRoles: ['superadmin', 'admin'] });
