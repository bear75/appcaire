import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config();

const dbUrl = process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL) : null;

export default {
  schema: './src/models/Schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: dbUrl
    ? {
        host: dbUrl.hostname,
        port: Number(dbUrl.port),
        user: dbUrl.username,
        password: dbUrl.password,
        database: dbUrl.pathname.slice(1),
        ssl: true,
      }
    : {
        host: 'localhost',
        port: 5432,
        database: 'postgres',
      },
  verbose: true,
  strict: true,
} satisfies Config;
