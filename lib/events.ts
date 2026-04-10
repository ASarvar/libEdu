// Events management utilities
import { query } from './db';

export interface Event {
  id: string;
  site_id: string;
  title: string;
  slug: string;
  description: string;
  cover_image?: string;
  location?: string;
  event_date: Date;
  end_date?: Date;
  is_published: boolean;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  // Multilingual
  title_uz?: string;
  title_ru?: string;
  title_en?: string;
  description_uz?: string;
  description_ru?: string;
  description_en?: string;
  // Joined fields
  creator_name?: string;
  site_name?: string;
  site_subdomain?: string;
}

export interface CreateEventData {
  site_id: string;
  title: string;
  slug: string;
  description: string;
  cover_image?: string;
  location?: string;
  event_date: Date;
  end_date?: Date;
  is_published?: boolean;
  created_by: string;
  title_uz?: string;
  title_ru?: string;
  title_en?: string;
  description_uz?: string;
  description_ru?: string;
  description_en?: string;
}

export interface UpdateEventData {
  title?: string;
  slug?: string;
  description?: string;
  cover_image?: string | null;
  location?: string | null;
  event_date?: Date;
  end_date?: Date | null;
  is_published?: boolean;
  title_uz?: string;
  title_ru?: string;
  title_en?: string;
  description_uz?: string;
  description_ru?: string;
  description_en?: string;
}

export interface GetEventBySlugOptions {
  publishedOnly?: boolean;
}

// Generate slug from title
export function generateEventSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 200);
}

// Get all events for a site
export async function getEventsBySite(
  siteId: string,
  includeUnpublished: boolean = false
): Promise<Event[]> {
  try {
    let queryText = `
      SELECT 
        e.*,
        u.full_name as creator_name
      FROM events e
      LEFT JOIN users u ON e.created_by = u.id
      WHERE e.site_id = $1
    `;

    if (!includeUnpublished) {
      queryText += ` AND e.is_published = true`;
    }

    queryText += ` ORDER BY e.event_date DESC`;

    const result = await query(queryText, [siteId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Get all events across all sites (superadmin)
export async function getAllEvents(): Promise<Event[]> {
  try {
    const result = await query(`
      SELECT 
        e.*,
        u.full_name as creator_name,
        s.name as site_name,
        s.subdomain as site_subdomain
      FROM events e
      LEFT JOIN users u ON e.created_by = u.id
      LEFT JOIN sites s ON e.site_id = s.id
      ORDER BY e.event_date DESC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching all events:', error);
    return [];
  }
}

// Get single event by ID
export async function getEventById(id: string): Promise<Event | null> {
  try {
    const result = await query(
      `
      SELECT 
        e.*,
        u.full_name as creator_name,
        s.name as site_name,
        s.subdomain as site_subdomain
      FROM events e
      LEFT JOIN users u ON e.created_by = u.id
      LEFT JOIN sites s ON e.site_id = s.id
      WHERE e.id = $1
      `,
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

// Get event by slug
export async function getEventBySlug(
  siteId: string,
  slug: string,
  options: GetEventBySlugOptions = {}
): Promise<Event | null> {
  try {
    const { publishedOnly = false } = options;
    const publishedClause = publishedOnly ? ' AND e.is_published = true' : '';

    const result = await query(
      `
      SELECT 
        e.*,
        u.full_name as creator_name
      FROM events e
      LEFT JOIN users u ON e.created_by = u.id
      WHERE e.site_id = $1 AND e.slug = $2${publishedClause}
      `,
      [siteId, slug]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

// Create event
export async function createEvent(data: CreateEventData): Promise<Event> {
  const result = await query(
    `
    INSERT INTO events (
      site_id, title, slug, description, cover_image, location,
      event_date, end_date, is_published, created_by,
      title_uz, title_ru, title_en,
      description_uz, description_ru, description_en
    ) VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9, $10,
      $11, $12, $13,
      $14, $15, $16
    )
    RETURNING *
    `,
    [
      data.site_id,
      data.title,
      data.slug,
      data.description,
      data.cover_image || null,
      data.location || null,
      data.event_date,
      data.end_date || null,
      data.is_published ?? false,
      data.created_by,
      data.title_uz || null,
      data.title_ru || null,
      data.title_en || null,
      data.description_uz || null,
      data.description_ru || null,
      data.description_en || null,
    ]
  );
  return result.rows[0];
}

// Update event
export async function updateEvent(id: string, data: UpdateEventData): Promise<Event> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  const fieldMap: Record<string, unknown> = {
    title: data.title,
    slug: data.slug,
    description: data.description,
    cover_image: data.cover_image,
    location: data.location,
    event_date: data.event_date,
    end_date: data.end_date,
    is_published: data.is_published,
    title_uz: data.title_uz,
    title_ru: data.title_ru,
    title_en: data.title_en,
    description_uz: data.description_uz,
    description_ru: data.description_ru,
    description_en: data.description_en,
  };

  for (const [key, value] of Object.entries(fieldMap)) {
    if (value !== undefined) {
      fields.push(`${key} = $${idx++}`);
      values.push(value);
    }
  }

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const result = await query(
    `UPDATE events SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0];
}

// Delete event
export async function deleteEvent(id: string): Promise<void> {
  await query('DELETE FROM events WHERE id = $1', [id]);
}
