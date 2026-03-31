import type { UpdateNewsData } from './news';

export class NewsInputError extends Error {
  status: number;
  code: string;

  constructor(message: string, code: string = 'BAD_REQUEST', status: number = 400) {
    super(message);
    this.name = 'NewsInputError';
    this.status = status;
    this.code = code;
  }
}

type CreateNewsInput = {
  site_id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  is_published: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function asOptionalString(value: unknown, fieldName: string): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== 'string') {
    throw new NewsInputError(`${fieldName} must be a string`, 'INVALID_INPUT');
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asNullableString(value: unknown, fieldName: string): string | null {
  if (value === null) {
    return null;
  }

  const parsed = asOptionalString(value, fieldName);
  return parsed ?? null;
}

function asRequiredString(value: unknown, fieldName: string): string {
  const parsed = asOptionalString(value, fieldName);
  if (!parsed) {
    throw new NewsInputError(`${fieldName} is required`, 'MISSING_FIELD');
  }
  return parsed;
}

function asOptionalBoolean(value: unknown, fieldName: string): boolean | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== 'boolean') {
    throw new NewsInputError(`${fieldName} must be a boolean`, 'INVALID_INPUT');
  }

  return value;
}

function asOptionalDate(value: unknown, fieldName: string): Date | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }

  if (typeof value !== 'string') {
    throw new NewsInputError(`${fieldName} must be an ISO date string`, 'INVALID_INPUT');
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new NewsInputError(`${fieldName} must be a valid date`, 'INVALID_INPUT');
  }

  return parsed;
}

export function parseCreateNewsInput(raw: unknown): CreateNewsInput {
  if (!isRecord(raw)) {
    throw new NewsInputError('Request body must be a JSON object', 'INVALID_INPUT');
  }

  return {
    site_id: asOptionalString(raw.site_id, 'site_id'),
    title: asRequiredString(raw.title, 'title'),
    slug: asOptionalString(raw.slug, 'slug'),
    excerpt: asOptionalString(raw.excerpt, 'excerpt'),
    content: asRequiredString(raw.content, 'content'),
    cover_image: asOptionalString(raw.cover_image, 'cover_image'),
    is_published: asOptionalBoolean(raw.is_published, 'is_published') ?? false,
  };
}

export function parseUpdateNewsInput(raw: unknown): UpdateNewsData {
  if (!isRecord(raw)) {
    throw new NewsInputError('Request body must be a JSON object', 'INVALID_INPUT');
  }

  const parsed: UpdateNewsData = {};

  if ('title' in raw) {
    parsed.title = asRequiredString(raw.title, 'title');
  }

  if ('slug' in raw) {
    parsed.slug = asRequiredString(raw.slug, 'slug');
  }

  if ('excerpt' in raw) {
    parsed.excerpt = asNullableString(raw.excerpt, 'excerpt');
  }

  if ('content' in raw) {
    parsed.content = asRequiredString(raw.content, 'content');
  }

  if ('cover_image' in raw) {
    parsed.cover_image = asNullableString(raw.cover_image, 'cover_image');
  }

  if ('is_published' in raw) {
    parsed.is_published = asOptionalBoolean(raw.is_published, 'is_published');
  }

  if ('published_at' in raw) {
    parsed.published_at = asOptionalDate(raw.published_at, 'published_at');
  }

  if (Object.keys(parsed).length === 0) {
    throw new NewsInputError('At least one valid field is required', 'NO_CHANGES');
  }

  return parsed;
}
