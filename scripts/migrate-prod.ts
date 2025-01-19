import * as fs from 'node:fs';
import * as path from 'node:path';

import * as dotenv from 'dotenv';

import { client } from '@/db';

// Force production environment
process.env.NODE_ENV = 'production';

// Load production environment variables
dotenv.config({ path: '.env.production' });

async function migrateProd() {
  try {
    // Safety checks
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('This script must be run in production mode');
    }

    if (!process.env.DATABASE_URL?.includes('pooler.supabase.com')) {
      throw new Error('Invalid production database URL');
    }

    console.log('Starting production migration...');
    console.log(
      'Database:',
      process.env.DATABASE_URL.split('@')[1].split('/')[0],
    );

    // Get confirmation
    if (!process.argv.includes('--confirm')) {
      console.log('\nThis will migrate the PRODUCTION database.');
      console.log('Run with --confirm to execute the migration.');
      process.exit(0);
    }

    // Read and run migrations in sequence
    const migrations = ['0000_initial.sql', '0001_add_trial_expiration.sql'];

    for (const migration of migrations) {
      const migrationPath = path.join(process.cwd(), 'migrations', migration);
      console.log(`\nRunning migration ${migration}...`);

      // Read migration content
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

      // Log migration SQL for verification
      console.log('Migration SQL:', migrationSQL);

      // Execute migration
      await client.unsafe(migrationSQL);
      console.log(`Migration ${migration} completed successfully`);
    }

    console.log('\nAll production migrations completed successfully!');

    // Close the connection
    await client.end();
  } catch (error) {
    console.error('Production migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateProd();
