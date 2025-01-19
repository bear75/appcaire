import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load environment variables based on NODE_ENV
dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

// Parse database URL for drizzle-kit
const dbUrl = process.env.DATABASE_URL
  ? new URL(process.env.DATABASE_URL)
  : null;

export default defineConfig({
  schema: './src/models/Schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: dbUrl
    ? {
        host: dbUrl.hostname,
        port: Number.parseInt(dbUrl.port),
        user: dbUrl.username,
        password: dbUrl.password,
        database: dbUrl.pathname.slice(1),
        ssl: true,
      }
    : {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
      },
  verbose: true,
  strict: true,
});
