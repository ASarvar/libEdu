-- Migration: Add Layout and Theme Support
-- Description: Adds layout selection, logo upload, and creator tracking for sites

-- Step 1: Add layout and theme columns to sites table
ALTER TABLE sites 
    ADD COLUMN header_style VARCHAR(20) DEFAULT 'header1',
    ADD COLUMN footer_style VARCHAR(20) DEFAULT 'footer1',
    ADD COLUMN home_style VARCHAR(20) DEFAULT 'home1',
    ADD COLUMN logo_path VARCHAR(500),
    ADD COLUMN enable_dark_mode BOOLEAN DEFAULT false,
    ADD COLUMN custom_css TEXT;

-- Step 2: Add comment to explain logo_path vs logo_url
COMMENT ON COLUMN sites.logo_path IS 'Local file path for uploaded logo (PNG/SVG, max 1MB)';
COMMENT ON COLUMN sites.logo_url IS 'External URL for logo (legacy/external hosting)';

-- Step 3: Add check constraints for valid style values
ALTER TABLE sites 
    ADD CONSTRAINT check_header_style CHECK (header_style IN ('header1', 'header2', 'header3', 'header4', 'header5', 'header6', 'header7')),
    ADD CONSTRAINT check_footer_style CHECK (footer_style IN ('footer1', 'footer2', 'footer3')),
    ADD CONSTRAINT check_home_style CHECK (home_style IN ('home1', 'home2', 'home3', 'home4', 'home5', 'home6', 'home7'));

-- Step 4: Create site_users junction table for moderator assignments
CREATE TABLE site_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'moderator',
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_by UUID REFERENCES users(id),
    UNIQUE(site_id, user_id)
);

-- Step 5: Create indexes for site_users
CREATE INDEX idx_site_users_site_id ON site_users(site_id);
CREATE INDEX idx_site_users_user_id ON site_users(user_id);

-- Step 6: Create pages table for site-specific pages (contact, about, etc.)
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    page_type VARCHAR(50) NOT NULL, -- 'contact', 'about', 'faq', etc.
    title_uz VARCHAR(500),
    title_ru VARCHAR(500),
    title_en VARCHAR(500),
    content_uz TEXT,
    content_ru TEXT,
    content_en TEXT,
    meta_description_uz TEXT,
    meta_description_ru TEXT,
    meta_description_en TEXT,
    is_published BOOLEAN DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(site_id, page_type)
);

-- Step 7: Update news table to support multi-language content
ALTER TABLE news 
    ADD COLUMN title_uz VARCHAR(500),
    ADD COLUMN title_ru VARCHAR(500),
    ADD COLUMN title_en VARCHAR(500),
    ADD COLUMN excerpt_uz TEXT,
    ADD COLUMN excerpt_ru TEXT,
    ADD COLUMN excerpt_en TEXT,
    ADD COLUMN content_uz TEXT,
    ADD COLUMN content_ru TEXT,
    ADD COLUMN content_en TEXT;

-- Copy existing content to _uz columns (assuming existing content is in Uzbek)
UPDATE news SET 
    title_uz = title,
    excerpt_uz = excerpt,
    content_uz = content;

-- Step 8: Update events table to support multi-language content
ALTER TABLE events 
    ADD COLUMN title_uz VARCHAR(500),
    ADD COLUMN title_ru VARCHAR(500),
    ADD COLUMN title_en VARCHAR(500),
    ADD COLUMN description_uz TEXT,
    ADD COLUMN description_ru TEXT,
    ADD COLUMN description_en TEXT;

-- Copy existing content to _uz columns
UPDATE events SET 
    title_uz = title,
    description_uz = description;

-- Step 9: Create trigger for pages table
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 10: Create indexes for pages
CREATE INDEX idx_pages_site_id ON pages(site_id);
CREATE INDEX idx_pages_page_type ON pages(page_type);
CREATE INDEX idx_pages_published ON pages(site_id, is_published);

-- Step 11: Grant permissions
-- GRANT SELECT, INSERT, UPDATE, DELETE ON pages, site_users TO your_app_user;

-- Migration complete!
