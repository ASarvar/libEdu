// Utilities for site context and subdomain handling
import { query } from './db';

export interface Site {
  id: string;
  subdomain: string;
  name: string;
  description?: string;
  logo_url?: string;
  logo_path?: string;
  primary_color: string;
  secondary_color: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  // Layout and theme settings
  header_style?: string;
  footer_style?: string;
  home_style?: string;
  enable_dark_mode?: boolean;
  custom_css?: string;
}

export type UserRole = 'superadmin' | 'admin' | 'moderator' | 'user';

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  site_id?: string;
  is_active: boolean;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
}

// Get site by subdomain
export async function getSiteBySubdomain(subdomain: string): Promise<Site | null> {
  try {
    const result = await query(
      `SELECT * FROM sites WHERE subdomain = $1 AND is_active = true`,
      [subdomain]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching site:', error);
    return null;
  }
}

// Get site by ID
export async function getSiteById(id: string): Promise<Site | null> {
  try {
    const result = await query(
      `SELECT * FROM sites WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching site:', error);
    return null;
  }
}

// Extract subdomain from hostname
export function extractSubdomain(hostname: string, mainDomain: string): string | null {
  // Remove port if present
  const host = hostname.split(':')[0];
  
  // For localhost development
  if (host === 'localhost' || host === '127.0.0.1') {
    return null; // No subdomain in local development
  }

  // Check if hostname ends with main domain
  if (!host.endsWith(mainDomain)) {
    return null;
  }

  // Remove main domain to get subdomain
  const subdomain = host.replace(`.${mainDomain}`, '');
  
  // If subdomain equals hostname, there's no subdomain (accessing main domain)
  if (subdomain === host || subdomain === mainDomain) {
    return null;
  }

  return subdomain;
}

// Create a new site (superadmin only)
export async function createSite(data: {
  subdomain: string;
  name: string;
  description?: string;
  logo_url?: string;
  logo_path?: string;
  primary_color?: string;
  secondary_color?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  header_style?: string;
  footer_style?: string;
  home_style?: string;
  enable_dark_mode?: boolean;
  custom_css?: string;
  created_by: string;
}): Promise<Site> {
  const result = await query(
    `INSERT INTO sites (
      subdomain, name, description, logo_url, logo_path, primary_color, secondary_color,
      contact_email, contact_phone, contact_address,
      facebook_url, instagram_url, twitter_url,
      header_style, footer_style, home_style, enable_dark_mode, custom_css,
      created_by
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    RETURNING *`,
    [
      data.subdomain,
      data.name,
      data.description,
      data.logo_url,
      data.logo_path,
      data.primary_color || '#3498db',
      data.secondary_color || '#2ecc71',
      data.contact_email,
      data.contact_phone,
      data.contact_address,
      data.facebook_url,
      data.instagram_url,
      data.twitter_url,
      data.header_style || 'header1',
      data.footer_style || 'footer1',
      data.home_style || 'home1',
      data.enable_dark_mode || false,
      data.custom_css,
      data.created_by,
    ]
  );
  return result.rows[0];
}

// Update site
export async function updateSite(
  id: string,
  data: Partial<Omit<Site, 'id' | 'subdomain' | 'created_at' | 'updated_at'>>
): Promise<Site> {
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
  
  const result = await query(
    `UPDATE sites SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  
  return result.rows[0];
}

// List all sites (superadmin) - only active sites
export async function getAllSites(): Promise<Site[]> {
  const result = await query(
    `SELECT * FROM sites WHERE is_active = true ORDER BY created_at DESC`
  );
  return result.rows;
}
