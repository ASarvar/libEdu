// Script to apply database migrations with tracking
require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'kutubxona_db',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Create migrations tracking table
async function createMigrationsTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      migration_name VARCHAR(255) UNIQUE NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(createTableSQL);
}

// Get list of applied migrations
async function getAppliedMigrations() {
  const result = await pool.query('SELECT migration_name FROM schema_migrations ORDER BY id');
  return result.rows.map(row => row.migration_name);
}

// Mark migration as applied
async function markMigrationApplied(migrationName) {
  await pool.query(
    'INSERT INTO schema_migrations (migration_name) VALUES ($1) ON CONFLICT (migration_name) DO NOTHING',
    [migrationName]
  );
}

// Get all migration files
function getMigrationFiles() {
  const migrationsDir = path.join(__dirname, '..', 'database', 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();
  return files;
}

async function runMigrations() {
  try {
    console.log('🚀 Starting database migrations...\n');

    // Create migrations tracking table
    await createMigrationsTable();

    // Get applied migrations
    const appliedMigrations = await getAppliedMigrations();
    console.log(`📊 Applied migrations: ${appliedMigrations.length}`);

    // Get all migration files
    const migrationFiles = getMigrationFiles();
    console.log(`📁 Total migration files: ${migrationFiles.length}\n`);

    // Find pending migrations
    const pendingMigrations = migrationFiles.filter(
      file => !appliedMigrations.includes(file)
    );

    if (pendingMigrations.length === 0) {
      console.log('✅ All migrations are up to date! No pending migrations.\n');
      return;
    }

    console.log(`🔄 Running ${pendingMigrations.length} pending migration(s)...\n`);

    // Run each pending migration
    for (const migrationFile of pendingMigrations) {
      console.log(`⏳ Applying: ${migrationFile}`);
      
      const migrationPath = path.join(__dirname, '..', 'database', 'migrations', migrationFile);
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

      // Execute migration in a transaction
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        await client.query(migrationSQL);
        await markMigrationApplied(migrationFile);
        await client.query('COMMIT');
        console.log(`✅ Applied: ${migrationFile}\n`);
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    }

    console.log('🎉 All migrations completed successfully!\n');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
