import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { env } from '../env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connectionString = env.DATABASE_URL;
const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function runMigration() {
    console.log('Running migrations!');
    
    await migrate(db, { migrationsFolder: path.resolve(__dirname, 'migrations')});

    console.log('Migrations finished!');

    await sql.end();
    process.exit(0);
}

runMigration().catch(err => {
    console.error('Migration failed', err);
    process.exit(1);
})