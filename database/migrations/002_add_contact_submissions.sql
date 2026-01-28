-- Migration: Add contact submissions table for multi-tenant contact forms
-- Created: 2026-01-19

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT FALSE,
  replied BOOLEAN DEFAULT FALSE
);

-- Create indexes for better query performance
CREATE INDEX idx_contact_submissions_site_id ON contact_submissions(site_id);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_read ON contact_submissions(read) WHERE read = FALSE;

-- Add comment
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from site visitors';
COMMENT ON COLUMN contact_submissions.site_id IS 'Reference to the site where the form was submitted';
COMMENT ON COLUMN contact_submissions.read IS 'Whether the submission has been read by site admin';
COMMENT ON COLUMN contact_submissions.replied IS 'Whether the admin has replied to this submission';
