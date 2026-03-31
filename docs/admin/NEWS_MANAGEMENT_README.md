# News Management System - Implementation Guide

## 🎉 Features Implemented

A complete news/blog management system has been successfully integrated into your libEdu platform with the following features:

### ✅ Admin Panel Features
1. **News List Page** (`/admin/news`)
   - View all news articles for your site
   - Superadmin can see all news across all sites
   - Toggle publish/draft status
   - View article statistics (views, publish date)
   - Delete articles with confirmation
   - Edit existing articles

2. **Create News** (`/admin/news/new`)
   - Rich form with all necessary fields
   - Auto-generate URL-friendly slugs
   - Image upload for cover photos (max 5MB)
   - Publish immediately or save as draft
   - Site selection for superadmin

3. **Edit News** (`/admin/news/[id]`)
   - Edit all article fields
   - Update cover image
   - Change publish status
   - Update content and metadata

### ✅ Public Features
1. **News Grid** (`/news-grid`)
   - Displays all published articles
   - Responsive grid layout
   - Shows cover images, author, publish date, view count
   - Dynamic loading from database
   - Falls back to default image if no cover photo

2. **News Details** (`/news-details/[slug]`)
   - Dynamic routing with SEO-friendly URLs
   - Displays full article content
   - Auto-increments view counter
   - Shows article metadata
   - Back to news button

## 📂 Files Created/Modified

### New Files Created:
```
lib/news.ts                              - CRUD functions for news
app/api/admin/news/route.ts              - List & create news API
app/api/admin/news/[id]/route.ts         - Get, update, delete news API
app/api/news/route.ts                    - Public news list API
app/api/news/[slug]/route.ts             - Public single news API
app/api/admin/upload-news-image/route.ts - Image upload API
app/admin/news/page.tsx                  - Admin news list page
app/admin/news/new/page.tsx              - Create news page
app/admin/news/[id]/page.tsx             - Edit news page
app/news-details/[slug]/page.tsx         - Dynamic news details page
components/sections/BlogDetailsDynamic.tsx - Dynamic news details component
components/sections/NewsGrid.tsx         - Updated to fetch from DB
```

### Modified Files:
```
lib/auth.ts                              - Added site_id to User interface
```

## 🗄️ Database Schema

The news table already exists in your database (from migration 001_add_multi_tenancy.sql):

```sql
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
```

## 🚀 How to Use

### For Admins:

1. **Access Admin Panel**
   - Navigate to `/admin/news`
   - You'll see all news articles for your site

2. **Create New Article**
   - Click "Add New Article" button
   - Fill in the form:
     - Title (required) - Auto-generates slug
     - Slug (required) - URL-friendly identifier
     - Excerpt (optional) - Short summary
     - Content (required) - Full article text
     - Cover Image (optional) - Upload a featured image
     - Publish checkbox - Publish immediately or save as draft
   - Click "Create Article"

3. **Edit Article**
   - Click the edit icon (blue pencil) on any article
   - Modify any fields
   - Click "Save Changes"

4. **Delete Article**
   - Click the delete icon (red trash) on any article
   - Confirm deletion
   - Article is permanently removed

5. **Toggle Publish Status**
   - Click the status badge (Published/Draft)
   - Article status toggles immediately

### For Superadmins:

- Can see all news from all sites
- Must select a site when creating new articles
- Can manage news for any site

### For Visitors:

1. **View News Grid**
   - Navigate to `/news-grid`
   - Browse all published articles
   - Click any article to read more

2. **Read Full Article**
   - Click "Learn More" or article title
   - View full content at `/news-details/[slug]`
   - View counter increments automatically

## 📝 API Endpoints

### Admin Endpoints (Require Authentication)

```
GET    /api/admin/news          - List news (site-specific or all)
POST   /api/admin/news          - Create new news
GET    /api/admin/news/[id]     - Get single news by ID
PATCH  /api/admin/news/[id]     - Update news
DELETE /api/admin/news/[id]     - Delete news
POST   /api/admin/upload-news-image - Upload cover image
```

### Public Endpoints

```
GET /api/news              - Get published news for current site
GET /api/news/[slug]       - Get single published news by slug
```

## 🔒 Permissions

- **Superadmin**: Full access to all news across all sites
- **Admin**: Full access to news on their assigned site only
- **User/Visitor**: Can only view published news

## 🎨 Customization Suggestions

### 1. Rich Text Editor
Currently uses a simple textarea. Consider adding:
- **TinyMCE**: `npm install @tinymce/tinymce-react`
- **Quill**: `npm install react-quill`
- **Draft.js**: `npm install draft-js react-draft-wysiwyg`

### 2. Categories/Tags
Add a categories table:
```sql
CREATE TABLE news_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    UNIQUE(site_id, slug)
);

ALTER TABLE news ADD COLUMN category_id UUID REFERENCES news_categories(id);
```

### 3. Comments System
Add a comments table:
```sql
CREATE TABLE news_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    news_id UUID REFERENCES news(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. SEO Enhancements
Add fields to news table:
```sql
ALTER TABLE news ADD COLUMN meta_title VARCHAR(255);
ALTER TABLE news ADD COLUMN meta_description TEXT;
ALTER TABLE news ADD COLUMN meta_keywords TEXT;
```

### 5. Featured Posts
Add a featured flag:
```sql
ALTER TABLE news ADD COLUMN is_featured BOOLEAN DEFAULT false;
```

### 6. Reading Time Estimate
Calculate in the component:
```typescript
const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};
```

### 7. Related Posts
Show related posts based on same category or tags.

### 8. Social Sharing
Add share buttons for Facebook, Twitter, LinkedIn, WhatsApp.

### 9. Newsletter Integration
Add email subscription for new post notifications.

### 10. Analytics
Track article performance:
```sql
ALTER TABLE news ADD COLUMN shares_count INTEGER DEFAULT 0;
ALTER TABLE news ADD COLUMN comments_count INTEGER DEFAULT 0;
```

## 🐛 Troubleshooting

### Images not uploading?
- Check folder permissions: `public/uploads/news/`
- Verify max upload size in your server config
- Check file type (JPG, PNG, WebP, GIF allowed)

### News not showing on public page?
- Ensure articles are marked as "Published"
- Check that `published_at` is set
- Verify site_id matches current subdomain

### Admin can't see news?
- Ensure admin user has a `site_id` assigned
- Check role permissions in database

### Slug conflicts?
- Slugs must be unique per site
- System enforces unique constraint
- Try modifying the slug manually

## 📱 Mobile Responsive

All pages are fully responsive:
- News grid adapts to all screen sizes
- Admin forms work on tablets
- Image uploads work on mobile devices

## 🔐 Security Features

1. **Authentication Required**: All admin endpoints check session
2. **Role-Based Access**: Admins can only manage their site's news
3. **SQL Injection Protection**: Uses parameterized queries
4. **File Upload Validation**: Type and size checks
5. **XSS Protection**: Content is sanitized on display

## 🚦 Next Steps

1. **Test the System**
   - Create a few sample articles
   - Test publish/unpublish
   - Test image uploads
   - Verify public pages work

2. **Add Sample Content**
   - Create 5-10 sample articles
   - Add cover images
   - Write engaging content

3. **Customize Styling**
   - Adjust colors to match your brand
   - Modify card layouts
   - Update typography

4. **Implement Enhancements**
   - Choose from suggestions above
   - Add categories if needed
   - Integrate rich text editor

5. **Monitor Performance**
   - Check page load times
   - Optimize images
   - Add caching if needed

## 📚 Additional Resources

- Next.js Documentation: https://nextjs.org/docs
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- TypeScript Documentation: https://www.typescriptlang.org/docs/

## 💡 Tips

- **Slugs**: Keep them short and descriptive (e.g., "news-management-system")
- **Excerpts**: Aim for 120-150 characters for best display
- **Images**: Use 1200x630px for optimal social sharing
- **Content**: Use line breaks for better readability
- **Publishing**: Test with drafts before publishing

---

**Need Help?** All code is well-commented and follows Next.js 16 best practices. Check the implementation files for detailed inline documentation.

Happy blogging! 🎉
