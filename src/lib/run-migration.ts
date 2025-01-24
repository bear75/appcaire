import * as fs from 'node:fs';
import * as path from 'node:path';

import * as dotenv from 'dotenv';

import { client } from '@/db';

// Load environment variables based on NODE_ENV
dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

/* eslint-disable no-console */
async function runMigration() {
  try {
    console.log('Current environment:', process.env.NODE_ENV || 'development');
    console.log('Environment variables:', {
      DATABASE_URL: process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
    });

    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // Read and run migrations in sequence
    const migrations = ['0000_initial.sql', '0001_add_trial_expiration.sql'];

    for (const migration of migrations) {
      const migrationPath = path.join(process.cwd(), 'migrations', migration);
      console.log(`Running migration ${migration}...`);
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      await client.unsafe(migrationSQL);
      console.log(`Migration ${migration} completed successfully`);
    }

    // Close the connection
    await client.end();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}
/* eslint-enable no-console */

// Run the migration
runMigration();
