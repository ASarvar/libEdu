-- Migration: Add login lockout fields
-- Description: Track failed login attempts and temporarily lock accounts after repeated failures

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS locked_until TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_users_locked_until ON users(locked_until);
