import { unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const MANAGED_UPLOAD_PREFIXES = ['/uploads/logos/', '/uploads/news/'];
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

function normalizeUploadPath(uploadPath: string): string {
  return uploadPath.replace(/\\/g, '/').trim();
}

function isManagedUploadPath(uploadPath: string): boolean {
  const normalized = normalizeUploadPath(uploadPath);
  return MANAGED_UPLOAD_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

function toAbsolutePublicPath(uploadPath: string): string | null {
  const normalized = normalizeUploadPath(uploadPath);
  if (!normalized.startsWith('/')) {
    return null;
  }

  const absolutePath = path.resolve(PUBLIC_DIR, `.${normalized}`);
  if (!absolutePath.startsWith(PUBLIC_DIR)) {
    return null;
  }

  return absolutePath;
}

export async function deleteManagedUploadFile(uploadPath?: string | null): Promise<boolean> {
  if (!uploadPath || !isManagedUploadPath(uploadPath)) {
    return false;
  }

  const absolutePath = toAbsolutePublicPath(uploadPath);
  if (!absolutePath) {
    return false;
  }

  if (!existsSync(absolutePath)) {
    return false;
  }

  await unlink(absolutePath);
  return true;
}

export async function deleteManagedUploadFiles(paths: Array<string | null | undefined>): Promise<void> {
  const uniquePaths = Array.from(
    new Set(paths.filter((value): value is string => Boolean(value && value.trim())))
  );

  for (const uploadPath of uniquePaths) {
    try {
      await deleteManagedUploadFile(uploadPath);
    } catch (error) {
      console.error('Failed to delete managed upload file:', uploadPath, error);
    }
  }
}
