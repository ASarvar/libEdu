import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { query } from './db';
import { UserRole } from './roles';

const LOGIN_LOCKOUT_MAX_ATTEMPTS = 5;
const LOGIN_LOCKOUT_MINUTES = 15;

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

export interface Session {
  id: string;
  user_id: string;
  session_token: string;
  expires_at: Date;
  created_at: Date;
}

export interface EmailVerificationResult {
  success: boolean;
  userId?: string;
  email?: string;
  reason?: 'invalid' | 'expired' | 'already-used';
}

export interface PasswordResetResult {
  success: boolean;
  userId?: string;
  reason?: 'invalid' | 'expired' | 'already-used';
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Create user
export async function createUser(
  data: {
    full_name: string;
    email: string;
    phone?: string;
    password: string;
    role?: UserRole;
    created_by?: string;
    email_verified?: boolean;
  }
): Promise<User> {
  const passwordHash = await hashPassword(data.password);
  const role = data.role || 'user';
  const emailVerified = data.email_verified ?? false;

  const result = await query(
    `INSERT INTO users (full_name, email, phone, password_hash, role, created_by, email_verified)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, full_name, email, phone, role, is_active, email_verified, created_at, updated_at`,
    [data.full_name, data.email, data.phone, passwordHash, role, data.created_by, emailVerified]
  );

  return result.rows[0];
}

// Create email verification token for a user
export async function createEmailVerificationToken(userId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Keep only one active token per user
  await query(
    `DELETE FROM email_verification_tokens WHERE user_id = $1 AND used = false`,
    [userId]
  );

  await query(
    `INSERT INTO email_verification_tokens (user_id, token, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, token, expiresAt]
  );

  return token;
}

// Verify email using token
export async function verifyEmailByToken(token: string): Promise<EmailVerificationResult> {
  const tokenResult = await query(
    `SELECT evt.user_id, evt.expires_at, evt.used, u.email
     FROM email_verification_tokens evt
     INNER JOIN users u ON u.id = evt.user_id
     WHERE evt.token = $1
     LIMIT 1`,
    [token]
  );

  const row = tokenResult.rows[0];
  if (!row) {
    return { success: false, reason: 'invalid' };
  }

  if (row.used) {
    return { success: false, reason: 'already-used' };
  }

  if (new Date(row.expires_at).getTime() < Date.now()) {
    return { success: false, reason: 'expired' };
  }

  await query(
    `UPDATE users SET email_verified = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
    [row.user_id]
  );

  await query(
    `UPDATE email_verification_tokens SET used = true WHERE token = $1`,
    [token]
  );

  return {
    success: true,
    userId: row.user_id,
    email: row.email,
  };
}

// Create password reset token for a user
export async function createPasswordResetToken(userId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await query(
    `DELETE FROM password_reset_tokens WHERE user_id = $1 AND used = false`,
    [userId]
  );

  await query(
    `INSERT INTO password_reset_tokens (user_id, token, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, token, expiresAt]
  );

  return token;
}

// Reset password using token
export async function resetPasswordByToken(token: string, newPassword: string): Promise<PasswordResetResult> {
  const tokenResult = await query(
    `SELECT user_id, expires_at, used
     FROM password_reset_tokens
     WHERE token = $1
     LIMIT 1`,
    [token]
  );

  const row = tokenResult.rows[0];
  if (!row) {
    return { success: false, reason: 'invalid' };
  }

  if (row.used) {
    return { success: false, reason: 'already-used' };
  }

  if (new Date(row.expires_at).getTime() < Date.now()) {
    return { success: false, reason: 'expired' };
  }

  const passwordHash = await hashPassword(newPassword);

  await query(
    `UPDATE users
     SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
     WHERE id = $2`,
    [passwordHash, row.user_id]
  );

  await query(
    `UPDATE password_reset_tokens
     SET used = true
     WHERE token = $1`,
    [token]
  );

  // Revoke all active sessions after password reset.
  await query(
    `DELETE FROM sessions WHERE user_id = $1`,
    [row.user_id]
  );

  return {
    success: true,
    userId: row.user_id,
  };
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await query(
    `SELECT id, full_name, email, phone, password_hash, role, site_id, is_active, email_verified, created_at, updated_at, last_login
     FROM users WHERE email = $1`,
    [email]
  );

  return result.rows[0] || null;
}

// Get user by id
export async function getUserById(id: string): Promise<User | null> {
  const result = await query(
    `SELECT id, full_name, email, phone, role, site_id, is_active, email_verified, created_at, updated_at, last_login
     FROM users WHERE id = $1`,
    [id]
  );

  return result.rows[0] || null;
}

// Authenticate user
export async function authenticateUser(
  email: string,
  password: string
): Promise<{ user: User; sessionToken: string } | null> {
  const result = await query(
    `SELECT id, full_name, email, phone, password_hash, role, site_id, is_active, email_verified, created_at, updated_at, last_login, failed_login_attempts, locked_until
     FROM users WHERE email = $1 AND is_active = true`,
    [email]
  );

  const user = result.rows[0];
  if (!user) return null;

  if (user.locked_until && new Date(user.locked_until).getTime() > Date.now()) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password_hash);

  if (!isValid) {
    const nextFailedAttempts = (user.failed_login_attempts || 0) + 1;

    if (nextFailedAttempts >= LOGIN_LOCKOUT_MAX_ATTEMPTS) {
      const lockedUntil = new Date(Date.now() + LOGIN_LOCKOUT_MINUTES * 60 * 1000);
      await query(
        `UPDATE users
         SET failed_login_attempts = 0,
             locked_until = $2,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [user.id, lockedUntil]
      );
    } else {
      await query(
        `UPDATE users
         SET failed_login_attempts = $2,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [user.id, nextFailedAttempts]
      );
    }

    return null;
  }

  // Update last login
  await query(
    `UPDATE users
     SET last_login = CURRENT_TIMESTAMP,
         failed_login_attempts = 0,
         locked_until = NULL,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1`,
    [user.id]
  );

  // Create session
  const sessionToken = uuidv4() + '-' + uuidv4();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await query(
    `INSERT INTO sessions (user_id, session_token, expires_at)
     VALUES ($1, $2, $3)`,
    [user.id, sessionToken, expiresAt]
  );

  delete user.password_hash;
  return { user, sessionToken };
}

// Verify session
export async function verifySession(
  sessionToken: string
): Promise<User | null> {
  const result = await query(
    `SELECT u.id, u.full_name, u.email, u.phone, u.role, u.site_id, u.is_active, u.email_verified, u.created_at, u.updated_at, u.last_login
     FROM users u
     INNER JOIN sessions s ON u.id = s.user_id
     WHERE s.session_token = $1 AND s.expires_at > CURRENT_TIMESTAMP AND u.is_active = true`,
    [sessionToken]
  );

  return result.rows[0] || null;
}

// Delete session (logout)
export async function deleteSession(sessionToken: string): Promise<void> {
  await query(`DELETE FROM sessions WHERE session_token = $1`, [sessionToken]);
}

// Get all users (admin only)
export async function getAllUsers(
  filters?: {
    role?: string;
    is_active?: boolean;
    search?: string;
  }
): Promise<User[]> {
  let queryText = `
    SELECT id, full_name, email, phone, role, is_active, email_verified, created_at, updated_at, last_login
    FROM users
    WHERE 1=1
  `;
  const params: any[] = [];
  let paramIndex = 1;

  if (filters?.role) {
    queryText += ` AND role = $${paramIndex}`;
    params.push(filters.role);
    paramIndex++;
  }

  if (filters?.is_active !== undefined) {
    queryText += ` AND is_active = $${paramIndex}`;
    params.push(filters.is_active);
    paramIndex++;
  }

  if (filters?.search) {
    queryText += ` AND (full_name ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`;
    params.push(`%${filters.search}%`);
    paramIndex++;
  }

  queryText += ` ORDER BY created_at DESC`;

  const result = await query(queryText, params);
  return result.rows;
}

// Update user
export async function updateUser(
  id: string,
  data: {
    full_name?: string;
    email?: string;
    phone?: string;
    role?: 'admin' | 'moderator' | 'user';
    is_active?: boolean;
  }
): Promise<User> {
  const fields: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (data.full_name !== undefined) {
    fields.push(`full_name = $${paramIndex}`);
    params.push(data.full_name);
    paramIndex++;
  }

  if (data.email !== undefined) {
    fields.push(`email = $${paramIndex}`);
    params.push(data.email);
    paramIndex++;
  }

  if (data.phone !== undefined) {
    fields.push(`phone = $${paramIndex}`);
    params.push(data.phone);
    paramIndex++;
  }

  if (data.role !== undefined) {
    fields.push(`role = $${paramIndex}`);
    params.push(data.role);
    paramIndex++;
  }

  if (data.is_active !== undefined) {
    fields.push(`is_active = $${paramIndex}`);
    params.push(data.is_active);
    paramIndex++;
  }

  params.push(id);

  const result = await query(
    `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
     WHERE id = $${paramIndex}
     RETURNING id, full_name, email, phone, role, is_active, email_verified, created_at, updated_at`,
    params
  );

  return result.rows[0];
}

// Delete user
export async function deleteUser(id: string): Promise<void> {
  await query(`DELETE FROM users WHERE id = $1`, [id]);
}

// Log audit action
export async function logAuditAction(
  userId: string | null,
  action: string,
  entityType?: string,
  entityId?: string,
  details?: any,
  ipAddress?: string
): Promise<void> {
  await query(
    `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details, ip_address)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [userId, action, entityType, entityId, JSON.stringify(details), ipAddress]
  );
}
