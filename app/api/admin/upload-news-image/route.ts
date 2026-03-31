import { withAuth } from '@/lib/api-auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { apiOk, apiError } from '@/lib/api-response';

export const POST = withAuth(async (request) => {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return apiError(400, {
        code: 'MISSING_FILE',
        message: 'Image file is required',
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return apiError(400, {
        code: 'INVALID_FILE_TYPE',
        message: 'Only JPEG, PNG, WebP, and GIF formats are supported',
      });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return apiError(400, {
        code: 'FILE_TOO_LARGE',
        message: 'File size must not exceed 5MB',
      });
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const randomHash = crypto.randomBytes(16).toString('hex');
    const fileName = `news-${Date.now()}-${randomHash}.${fileExtension}`;

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'news');
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const filePath = path.join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return the path relative to public directory
    const imagePath = `/uploads/news/${fileName}`;

    return apiOk({ path: imagePath }, { status: 201 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return apiError(500, {
      code: 'UPLOAD_FAILED',
      message: 'Failed to upload image',
    });
  }
}, { allowedRoles: ['superadmin', 'admin'] });
