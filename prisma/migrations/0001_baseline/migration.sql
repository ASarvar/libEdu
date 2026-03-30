-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('superadmin', 'admin', 'user', 'moderator');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "user_role" DEFAULT 'user',
    "is_active" BOOLEAN DEFAULT true,
    "email_verified" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "last_login" TIMESTAMP(6),
    "site_id" UUID,
    "failed_login_attempts" INTEGER DEFAULT 0,
    "locked_until" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sites" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "subdomain" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "logo_url" VARCHAR(500),
    "primary_color" VARCHAR(7) DEFAULT '#3498db',
    "secondary_color" VARCHAR(7) DEFAULT '#2ecc71',
    "contact_email" VARCHAR(255),
    "contact_phone" VARCHAR(20),
    "contact_address" TEXT,
    "facebook_url" VARCHAR(500),
    "instagram_url" VARCHAR(500),
    "twitter_url" VARCHAR(500),
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "header_style" VARCHAR(20) DEFAULT 'header1',
    "footer_style" VARCHAR(20) DEFAULT 'footer1',
    "home_style" VARCHAR(20) DEFAULT 'home1',
    "logo_path" VARCHAR(500),
    "enable_dark_mode" BOOLEAN DEFAULT false,
    "custom_css" TEXT,

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "site_id" UUID NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "slug" VARCHAR(500) NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "cover_image" VARCHAR(500),
    "author_id" UUID NOT NULL,
    "is_published" BOOLEAN DEFAULT false,
    "published_at" TIMESTAMP(6),
    "views_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "title_uz" VARCHAR(500),
    "title_ru" VARCHAR(500),
    "title_en" VARCHAR(500),
    "excerpt_uz" TEXT,
    "excerpt_ru" TEXT,
    "excerpt_en" TEXT,
    "content_uz" TEXT,
    "content_ru" TEXT,
    "content_en" TEXT,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "site_id" UUID NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "slug" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "cover_image" VARCHAR(500),
    "location" VARCHAR(255),
    "event_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6),
    "is_published" BOOLEAN DEFAULT false,
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "title_uz" VARCHAR(500),
    "title_ru" VARCHAR(500),
    "title_en" VARCHAR(500),
    "description_uz" TEXT,
    "description_ru" TEXT,
    "description_en" TEXT,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "site_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'moderator',
    "assigned_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" UUID,

    CONSTRAINT "site_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "site_id" UUID,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN DEFAULT false,
    "replied" BOOLEAN DEFAULT false,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "session_token" VARCHAR(500) NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID,
    "action" VARCHAR(100) NOT NULL,
    "entity_type" VARCHAR(50),
    "entity_id" UUID,
    "details" JSONB,
    "ip_address" VARCHAR(45),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "token" VARCHAR(500) NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "used" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_verification_tokens" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "token" VARCHAR(500) NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "used" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "site_id" UUID NOT NULL,
    "page_type" VARCHAR(50) NOT NULL,
    "title_uz" VARCHAR(500),
    "title_ru" VARCHAR(500),
    "title_en" VARCHAR(500),
    "content_uz" TEXT,
    "content_ru" TEXT,
    "content_en" TEXT,
    "meta_description_uz" TEXT,
    "meta_description_ru" TEXT,
    "meta_description_en" TEXT,
    "is_published" BOOLEAN DEFAULT true,
    "created_by" UUID NOT NULL,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_blocks" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "site_id" UUID NOT NULL,
    "block_name" VARCHAR(255) NOT NULL,
    "html_content" TEXT,
    "css_content" TEXT,
    "js_content" TEXT,
    "thumbnail_url" VARCHAR(500),
    "is_global" BOOLEAN DEFAULT false,
    "created_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "custom_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_library" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "site_id" UUID NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "file_path" VARCHAR(500) NOT NULL,
    "file_url" VARCHAR(500) NOT NULL,
    "file_size" INTEGER,
    "mime_type" VARCHAR(100),
    "width" INTEGER,
    "height" INTEGER,
    "alt_text" VARCHAR(255),
    "uploaded_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_layouts" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "site_id" UUID NOT NULL,
    "page_type" VARCHAR(50) NOT NULL,
    "page_slug" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "is_published" BOOLEAN DEFAULT false,
    "version" INTEGER DEFAULT 1,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "page_layouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_revisions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "page_layout_id" UUID NOT NULL,
    "version_number" INTEGER NOT NULL,
    "snapshot" JSONB NOT NULL,
    "change_description" TEXT,
    "created_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_revisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schema_migrations" (
    "id" SERIAL NOT NULL,
    "migration_name" VARCHAR(255) NOT NULL,
    "applied_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_configs" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "section_instance_id" UUID NOT NULL,
    "config_key" VARCHAR(100) NOT NULL,
    "config_value" TEXT,
    "config_type" VARCHAR(50) NOT NULL,
    "language_code" VARCHAR(10) DEFAULT 'en',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "section_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_instances" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "page_layout_id" UUID NOT NULL,
    "section_type" VARCHAR(100) NOT NULL,
    "section_component" VARCHAR(150) NOT NULL,
    "display_order" INTEGER NOT NULL,
    "is_visible" BOOLEAN DEFAULT true,
    "css_classes" VARCHAR(500),
    "inline_styles" TEXT,
    "animation_type" VARCHAR(50),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "section_instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_templates" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "section_type" VARCHAR(100) NOT NULL,
    "section_component" VARCHAR(150) NOT NULL,
    "display_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(50),
    "thumbnail_url" VARCHAR(500),
    "default_config" JSONB,
    "schema" JSONB,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "section_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_role" ON "users"("role");

-- CreateIndex
CREATE INDEX "idx_users_site_id" ON "users"("site_id");

-- CreateIndex
CREATE INDEX "idx_users_locked_until" ON "users"("locked_until");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sites_subdomain_key" ON "sites"("subdomain");

-- CreateIndex
CREATE INDEX "idx_sites_is_active" ON "sites"("is_active");

-- CreateIndex
CREATE INDEX "idx_sites_subdomain" ON "sites"("subdomain");

-- CreateIndex
CREATE INDEX "idx_news_site_id" ON "news"("site_id");

-- CreateIndex
CREATE INDEX "idx_news_published" ON "news"("site_id", "is_published");

-- CreateIndex
CREATE UNIQUE INDEX "news_site_id_slug_key" ON "news"("site_id", "slug");

-- CreateIndex
CREATE INDEX "idx_events_site_id" ON "events"("site_id");

-- CreateIndex
CREATE INDEX "idx_events_date" ON "events"("site_id", "event_date");

-- CreateIndex
CREATE UNIQUE INDEX "events_site_id_slug_key" ON "events"("site_id", "slug");

-- CreateIndex
CREATE INDEX "idx_site_users_site_id" ON "site_users"("site_id");

-- CreateIndex
CREATE INDEX "idx_site_users_user_id" ON "site_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "site_users_site_id_user_id_key" ON "site_users"("site_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_contact_submissions_site_id" ON "contact_submissions"("site_id");

-- CreateIndex
CREATE INDEX "idx_contact_submissions_created_at" ON "contact_submissions"("created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE INDEX "idx_sessions_user_id" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "idx_sessions_expires" ON "sessions"("expires_at");

-- CreateIndex
CREATE INDEX "idx_sessions_token" ON "sessions"("session_token");

-- CreateIndex
CREATE INDEX "idx_audit_logs_user_id" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "idx_audit_logs_created_at" ON "audit_logs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_key" ON "password_reset_tokens"("token");

-- CreateIndex
CREATE INDEX "idx_password_reset_tokens_token" ON "password_reset_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_tokens_token_key" ON "email_verification_tokens"("token");

-- CreateIndex
CREATE INDEX "idx_email_verification_tokens_token" ON "email_verification_tokens"("token");

-- CreateIndex
CREATE INDEX "idx_email_verification_tokens_user_id" ON "email_verification_tokens"("user_id");

-- CreateIndex
CREATE INDEX "idx_email_verification_tokens_expires_at" ON "email_verification_tokens"("expires_at");

-- CreateIndex
CREATE INDEX "idx_pages_site_id" ON "pages"("site_id");

-- CreateIndex
CREATE INDEX "idx_pages_page_type" ON "pages"("page_type");

-- CreateIndex
CREATE INDEX "idx_pages_published" ON "pages"("site_id", "is_published");

-- CreateIndex
CREATE UNIQUE INDEX "pages_site_id_page_type_key" ON "pages"("site_id", "page_type");

-- CreateIndex
CREATE INDEX "idx_custom_blocks_is_global" ON "custom_blocks"("is_global");

-- CreateIndex
CREATE INDEX "idx_custom_blocks_site_id" ON "custom_blocks"("site_id");

-- CreateIndex
CREATE UNIQUE INDEX "custom_blocks_site_id_block_name_key" ON "custom_blocks"("site_id", "block_name");

-- CreateIndex
CREATE INDEX "idx_media_library_mime_type" ON "media_library"("mime_type");

-- CreateIndex
CREATE INDEX "idx_media_library_site_id" ON "media_library"("site_id");

-- CreateIndex
CREATE INDEX "idx_page_layouts_is_active" ON "page_layouts"("is_active");

-- CreateIndex
CREATE INDEX "idx_page_layouts_is_published" ON "page_layouts"("is_published");

-- CreateIndex
CREATE INDEX "idx_page_layouts_page_type" ON "page_layouts"("page_type");

-- CreateIndex
CREATE INDEX "idx_page_layouts_site_id" ON "page_layouts"("site_id");

-- CreateIndex
CREATE UNIQUE INDEX "page_layouts_site_id_page_type_page_slug_key" ON "page_layouts"("site_id", "page_type", "page_slug");

-- CreateIndex
CREATE INDEX "idx_page_revisions_page_layout_id" ON "page_revisions"("page_layout_id");

-- CreateIndex
CREATE INDEX "idx_page_revisions_version" ON "page_revisions"("page_layout_id", "version_number");

-- CreateIndex
CREATE UNIQUE INDEX "schema_migrations_migration_name_key" ON "schema_migrations"("migration_name");

-- CreateIndex
CREATE INDEX "idx_section_configs_language" ON "section_configs"("language_code");

-- CreateIndex
CREATE INDEX "idx_section_configs_section_instance_id" ON "section_configs"("section_instance_id");

-- CreateIndex
CREATE UNIQUE INDEX "section_configs_section_instance_id_config_key_language_cod_key" ON "section_configs"("section_instance_id", "config_key", "language_code");

-- CreateIndex
CREATE INDEX "idx_section_instances_display_order" ON "section_instances"("page_layout_id", "display_order");

-- CreateIndex
CREATE INDEX "idx_section_instances_page_layout_id" ON "section_instances"("page_layout_id");

-- CreateIndex
CREATE INDEX "idx_section_instances_section_type" ON "section_instances"("section_type");

-- CreateIndex
CREATE UNIQUE INDEX "section_templates_section_type_key" ON "section_templates"("section_type");

-- CreateIndex
CREATE INDEX "idx_section_templates_active" ON "section_templates"("is_active");

-- CreateIndex
CREATE INDEX "idx_section_templates_category" ON "section_templates"("category");

-- CreateIndex
CREATE INDEX "idx_section_templates_component" ON "section_templates"("section_component");

-- CreateIndex
CREATE INDEX "idx_section_templates_is_active" ON "section_templates"("is_active");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "site_users" ADD CONSTRAINT "site_users_assigned_by_fkey" FOREIGN KEY ("assigned_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "site_users" ADD CONSTRAINT "site_users_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "site_users" ADD CONSTRAINT "site_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contact_submissions" ADD CONSTRAINT "contact_submissions_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "custom_blocks" ADD CONSTRAINT "custom_blocks_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "custom_blocks" ADD CONSTRAINT "custom_blocks_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "media_library" ADD CONSTRAINT "media_library_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "media_library" ADD CONSTRAINT "media_library_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "page_layouts" ADD CONSTRAINT "page_layouts_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "page_layouts" ADD CONSTRAINT "page_layouts_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "page_layouts" ADD CONSTRAINT "page_layouts_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "page_revisions" ADD CONSTRAINT "page_revisions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "page_revisions" ADD CONSTRAINT "page_revisions_page_layout_id_fkey" FOREIGN KEY ("page_layout_id") REFERENCES "page_layouts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "section_configs" ADD CONSTRAINT "section_configs_section_instance_id_fkey" FOREIGN KEY ("section_instance_id") REFERENCES "section_instances"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "section_instances" ADD CONSTRAINT "section_instances_page_layout_id_fkey" FOREIGN KEY ("page_layout_id") REFERENCES "page_layouts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

