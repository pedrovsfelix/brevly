import 'dotenv/config';
import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in the environment variables');
}

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  // CORREÇÃO: A propriedade 'driver' foi renomeada para 'dialect'
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL, // As versões mais novas também preferem 'url'
  },
} satisfies Config;