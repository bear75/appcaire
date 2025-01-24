/**
 * @deprecated This file is being moved to src/lib/db/migrations.ts
 * Please update your imports to use the new location.
 * This file will be removed once all dependencies are updated.
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

async function runMigrations() {
  console.log('Starting migration process...');
  const migrationsFolder = path.join(process.cwd(), 'migrations');
  console.log(`Using migrations folder: ${migrationsFolder}`);

  // Create a connection for migrations
  const sql = postgres(connectionString as string, { 
    max: 1,
    ssl: "require",
    connection: {
      options: `--search_path=public`
    }
  });

  try {
    // Step 1: Run organization cleanup first
    console.log('Step 1: Cleaning up organization table...');
    const cleanupSql = fs.readFileSync(path.join(migrationsFolder, '0004_clean_organization.sql'), 'utf-8');
    await sql.unsafe(cleanupSql);

    // Step 2: Run remaining migrations
    console.log('Step 2: Running remaining migrations...');
    const db = drizzle(sql);
    await migrate(db, { migrationsFolder });

    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

runMigrations().catch((err) => {
  console.error(err);
  process.exit(1);
}); 