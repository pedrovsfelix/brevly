import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const links = pgTable('links', {
    id: serial('id').primaryKey(),
    code: text('code').notNull().unique(),
    originalUrl: text('original_url').notNull(),
    accessCount: integer('access_count').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
})