import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/tables';

// Check for required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create the connection
const connectionString = process.env.DATABASE_URL;

// Create a new postgres client for queries with SSL enabled
const queryClient = postgres(connectionString, {
  ssl: {
    rejectUnauthorized: false
  }
});

// Create a new postgres client for migrations with SSL enabled
const migrationClient = postgres(connectionString, {
  max: 1,
  ssl: {
    rejectUnauthorized: false
  }
});

// Create the database instances
export const db = drizzle(queryClient, { schema });
export const dbAdmin = drizzle(migrationClient, { schema });
