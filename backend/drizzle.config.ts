import type { Config } from "drizzle-kit";

export default {
    schema: './src/db/schema.ts',
    out: '.src/db/migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: 'postgresql://docker:docker@localhost:5432/brevly',
    },
} satisfies Config;