// Core database clients
export { db, dbAdmin } from './client';

// Schema types and tables
export * from './schema';

// Migration utilities
export { migrate } from './migrations';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Check for required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create the connection
const connectionString = process.env.DATABASE_URL;

// Create a new postgres client
const client = postgres(connectionString, { max: 1 });

// Create the database instance
export const db = drizzle(client, { schema });

// Export schema
export * from './schema'; 