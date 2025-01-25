import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import path from 'path';
import fs from 'fs';

export async function consolidateMigrations() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const migrationClient = postgres(process.env.DATABASE_URL, {
    max: 1,
    ssl: { rejectUnauthorized: false }
  });

  const db = drizzle(migrationClient);
  
  try {
    const migrationsDir = path.join(process.cwd(), 'drizzle');
    
    await migrate(db, { 
      migrationsFolder: migrationsDir 
    });
    
    return { 
      success: true,
      message: 'Migrations consolidated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  } finally {
    await migrationClient.end();
  }
}

// Export for use in scripts
export { consolidateMigrations as consolidate }; 