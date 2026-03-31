// News/Blog management utilities
import { query } from './db';

export interface News {
  id: string;
  site_id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  author_id: string;
  is_published: boolean;
  published_at?: Date;
  views_count: number;
  created_at: Date;
  updated_at: Date;
  // Joined fields
  author_name?: string;
  author_email?: string;
  site_name?: string;
}

export interface CreateNewsData {
  site_id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  author_id: string;
  is_published?: boolean;
  published_at?: Date;
}

export interface UpdateNewsData {
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  cover_image?: string | null;
  is_published?: boolean;
  published_at?: Date;
}

export interface GetNewsBySlugOptions {
  publishedOnly?: boolean;
  incrementViews?: boolean;
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .substring(0, 200); // Limit length
}

// Get all news for a site
export async function getNewsBySite(
  siteId: string,
  includeUnpublished: boolean = false
): Promise<News[]> {
  try {
    let queryText = `
      SELECT 
        n.*,
        u.full_name as author_name,
        u.email as author_email
      FROM news n
      LEFT JOIN users u ON n.author_id = u.id
      WHERE n.site_id = $1
    `;

    if (!includeUnpublished) {
      queryText += ` AND n.is_published = true`;
    }

    queryText += ` ORDER BY n.created_at DESC`;

    const result = await query(queryText, [siteId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Get single news by ID
export async function getNewsById(id: string): Promise<News | null> {
  try {
    const result = await query(
      `
      SELECT 
        n.*,
        u.full_name as author_name,
        u.email as author_email,
        s.name as site_name
      FROM news n
      LEFT JOIN users u ON n.author_id = u.id
      LEFT JOIN sites s ON n.site_id = s.id
      WHERE n.id = $1
      `,
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}

// Get news by slug
export async function getNewsBySlug(
  siteId: string,
  slug: string,
  options: GetNewsBySlugOptions = {}
): Promise<News | null> {
  try {
    const { publishedOnly = false, incrementViews = true } = options;
    const publishedClause = publishedOnly ? ' AND n.is_published = true' : '';

    if (incrementViews) {
      const result = await query(
        `
        WITH updated_news AS (
          UPDATE news n
          SET views_count = views_count + 1
          WHERE n.site_id = $1 AND n.slug = $2${publishedClause}
          RETURNING n.*
        )
        SELECT 
          u_n.*,
          u.full_name as author_name,
          u.email as author_email
        FROM updated_news u_n
        LEFT JOIN users u ON u_n.author_id = u.id
        `,
        [siteId, slug]
      );

      return result.rows[0] || null;
    }

    const result = await query(
      `
      SELECT 
        n.*,
        u.full_name as author_name,
        u.email as author_email
      FROM news n
      LEFT JOIN users u ON n.author_id = u.id
      WHERE n.site_id = $1 AND n.slug = $2${publishedClause}
      `,
      [siteId, slug]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }
}

// Create news
export async function createNews(data: CreateNewsData): Promise<News> {
  try {
    const result = await query(
      `
      INSERT INTO news (
        site_id, title, slug, excerpt, content, cover_image,
        author_id, is_published, published_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
      `,
      [
        data.site_id,
        data.title,
        data.slug,
        data.excerpt || null,
        data.content,
        data.cover_image || null,
        data.author_id,
        data.is_published || false,
        data.published_at || (data.is_published ? new Date() : null),
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating news:', error);
    throw error;
  }
}

// Update news
export async function updateNews(
  id: string,
  data: UpdateNewsData
): Promise<News | null> {
  try {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(data.title);
    }

    if (data.slug !== undefined) {
      updates.push(`slug = $${paramCount++}`);
      values.push(data.slug);
    }

    if (data.excerpt !== undefined) {
      updates.push(`excerpt = $${paramCount++}`);
      values.push(data.excerpt);
    }

    if (data.content !== undefined) {
      updates.push(`content = $${paramCount++}`);
      values.push(data.content);
    }

    if (data.cover_image !== undefined) {
      updates.push(`cover_image = $${paramCount++}`);
      values.push(data.cover_image);
    }

    if (data.is_published !== undefined) {
      updates.push(`is_published = $${paramCount++}`);
      values.push(data.is_published);

      // Set published_at if publishing for the first time
      if (data.is_published && !data.published_at) {
        updates.push(`published_at = $${paramCount++}`);
        values.push(new Date());
      }
    }

    if (data.published_at !== undefined) {
      updates.push(`published_at = $${paramCount++}`);
      values.push(data.published_at);
    }

    if (updates.length === 0) {
      return getNewsById(id);
    }

    values.push(id);

    const result = await query(
      `
      UPDATE news
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
      `,
      values
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
}

// Delete news
export async function deleteNews(id: string): Promise<boolean> {
  try {
    const result = await query(`DELETE FROM news WHERE id = $1`, [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
}

// Get all news (superadmin only)
export async function getAllNews(): Promise<News[]> {
  try {
    const result = await query(
      `
      SELECT 
        n.*,
        u.full_name as author_name,
        u.email as author_email,
        s.name as site_name,
        s.subdomain as site_subdomain
      FROM news n
      LEFT JOIN users u ON n.author_id = u.id
      LEFT JOIN sites s ON n.site_id = s.id
      ORDER BY n.created_at DESC
      `
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching all news:', error);
    return [];
  }
}

// Get recent news for a site (for homepage, etc.)
export async function getRecentNews(
  siteId: string,
  limit: number = 3
): Promise<News[]> {
  try {
    const result = await query(
      `
      SELECT 
        n.*,
        u.full_name as author_name
      FROM news n
      LEFT JOIN users u ON n.author_id = u.id
      WHERE n.site_id = $1 AND n.is_published = true
      ORDER BY n.published_at DESC
      LIMIT $2
      `,
      [siteId, limit]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching recent news:', error);
    return [];
  }
}
