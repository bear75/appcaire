import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import path from 'path';

// Standard migration function for new Drizzle migrations
export async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const migrationClient = postgres(process.env.DATABASE_URL, {
    max: 1,
    ssl: { rejectUnauthorized: false }
  });

  const db = drizzle(migrationClient);
  
  try {
    await migrate(db, { 
      migrationsFolder: path.join(process.cwd(), 'drizzle')
    });
    
    return {
      success: true,
      message: 'Migrations completed successfully'
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

// Export the migration function
export { runMigrations as migrate }; 