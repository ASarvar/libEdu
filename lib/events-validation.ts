import type { UpdateEventData } from './events';

export class EventInputError extends Error {
  status: number;
  code: string;

  constructor(message: string, code: string = 'BAD_REQUEST', status: number = 400) {
    super(message);
    this.name = 'EventInputError';
    this.status = status;
    this.code = code;
  }
}

type CreateEventInput = {
  site_id?: string;
  title: string;
  slug?: string;
  description: string;
  cover_image?: string;
  location?: string;
  event_date: Date;
  end_date?: Date;
  is_published: boolean;
  title_uz?: string;
  title_ru?: string;
  title_en?: string;
  description_uz?: string;
  description_ru?: string;
  description_en?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function asOptionalString(value: unknown, fieldName: string): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string') throw new EventInputError(`${fieldName} must be a string`, 'INVALID_INPUT');
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asNullableString(value: unknown, fieldName: string): string | null {
  if (value === null) return null;
  const parsed = asOptionalString(value, fieldName);
  return parsed ?? null;
}

function asRequiredString(value: unknown, fieldName: string): string {
  const parsed = asOptionalString(value, fieldName);
  if (!parsed) throw new EventInputError(`${fieldName} is required`, 'MISSING_FIELD');
  return parsed;
}

function asRequiredDate(value: unknown, fieldName: string): Date {
  if (value === undefined || value === null) throw new EventInputError(`${fieldName} is required`, 'MISSING_FIELD');
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) throw new EventInputError(`${fieldName} must be a valid date`, 'INVALID_INPUT');
    return value;
  }
  if (typeof value !== 'string') throw new EventInputError(`${fieldName} must be an ISO date string`, 'INVALID_INPUT');
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) throw new EventInputError(`${fieldName} must be a valid date`, 'INVALID_INPUT');
  return parsed;
}

function asOptionalDate(value: unknown, fieldName: string): Date | undefined {
  if (value === undefined || value === null) return undefined;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? undefined : value;
  if (typeof value !== 'string') throw new EventInputError(`${fieldName} must be an ISO date string`, 'INVALID_INPUT');
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) throw new EventInputError(`${fieldName} must be a valid date`, 'INVALID_INPUT');
  return parsed;
}

function asOptionalBoolean(value: unknown, fieldName: string): boolean | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'boolean') throw new EventInputError(`${fieldName} must be a boolean`, 'INVALID_INPUT');
  return value;
}

export function parseCreateEventInput(raw: unknown): CreateEventInput {
  if (!isRecord(raw)) throw new EventInputError('Request body must be a JSON object', 'INVALID_INPUT');
  return {
    site_id: asOptionalString(raw.site_id, 'site_id'),
    title: asRequiredString(raw.title, 'title'),
    slug: asOptionalString(raw.slug, 'slug'),
    description: asRequiredString(raw.description, 'description'),
    cover_image: asOptionalString(raw.cover_image, 'cover_image'),
    location: asOptionalString(raw.location, 'location'),
    event_date: asRequiredDate(raw.event_date, 'event_date'),
    end_date: asOptionalDate(raw.end_date, 'end_date'),
    is_published: asOptionalBoolean(raw.is_published, 'is_published') ?? false,
    title_uz: asOptionalString(raw.title_uz, 'title_uz'),
    title_ru: asOptionalString(raw.title_ru, 'title_ru'),
    title_en: asOptionalString(raw.title_en, 'title_en'),
    description_uz: asOptionalString(raw.description_uz, 'description_uz'),
    description_ru: asOptionalString(raw.description_ru, 'description_ru'),
    description_en: asOptionalString(raw.description_en, 'description_en'),
  };
}

export function parseUpdateEventInput(raw: unknown): UpdateEventData {
  if (!isRecord(raw)) throw new EventInputError('Request body must be a JSON object', 'INVALID_INPUT');
  return {
    title: asOptionalString(raw.title, 'title'),
    slug: asOptionalString(raw.slug, 'slug'),
    description: asOptionalString(raw.description, 'description'),
    cover_image: 'cover_image' in raw ? asNullableString(raw.cover_image, 'cover_image') : undefined,
    location: 'location' in raw ? asNullableString(raw.location, 'location') : undefined,
    event_date: asOptionalDate(raw.event_date, 'event_date'),
    end_date: 'end_date' in raw ? asOptionalDate(raw.end_date, 'end_date') : undefined,
    is_published: asOptionalBoolean(raw.is_published, 'is_published'),
    title_uz: asOptionalString(raw.title_uz, 'title_uz'),
    title_ru: asOptionalString(raw.title_ru, 'title_ru'),
    title_en: asOptionalString(raw.title_en, 'title_en'),
    description_uz: asOptionalString(raw.description_uz, 'description_uz'),
    description_ru: asOptionalString(raw.description_ru, 'description_ru'),
    description_en: asOptionalString(raw.description_en, 'description_en'),
  };
}
