-- Migration: Add Multi-Tenancy Support
-- Description: Adds sites table and site_id to existing tables for subdomain-based multi-tenancy

-- Step 1: Create sites table
CREATE TABLE sites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Theme configuration
    logo_url VARCHAR(500),
    primary_color VARCHAR(7) DEFAULT '#3498db',
    secondary_color VARCHAR(7) DEFAULT '#2ecc71',
    
    -- Contact information
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    contact_address TEXT,
    
    -- Social media
    facebook_url VARCHAR(500),
    instagram_url VARCHAR(500),
    twitter_url VARCHAR(500),
    
    -- Site status
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id)
);

-- Step 2: Add site_id to users table
ALTER TABLE users ADD COLUMN site_id UUID REFERENCES sites(id) ON DELETE SET NULL;

-- Step 3: Create news table with site_id
CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image VARCHAR(500),
    author_id UUID NOT NULL REFERENCES users(id),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(site_id, slug)
);

-- Step 4: Create events table with site_id
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    cover_image VARCHAR(500),
    location VARCHAR(255),
    event_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    is_published BOOLEAN DEFAULT false,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(site_id, slug)
);

-- Step 5: Create indexes
CREATE INDEX idx_sites_subdomain ON sites(subdomain);
CREATE INDEX idx_sites_is_active ON sites(is_active);
CREATE INDEX idx_users_site_id ON users(site_id);
CREATE INDEX idx_news_site_id ON news(site_id);
CREATE INDEX idx_news_published ON news(site_id, is_published);
CREATE INDEX idx_events_site_id ON events(site_id);
CREATE INDEX idx_events_date ON events(site_id, event_date);

-- Step 6: Create triggers for updated_at
CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 7: Update existing superadmin to have NULL site_id (global access)
UPDATE users SET site_id = NULL WHERE role = 'superadmin';

-- Step 8: Add moderator role to user_role enum
ALTER TYPE user_role ADD VALUE 'moderator';

-- Migration complete!
