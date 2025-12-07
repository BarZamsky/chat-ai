import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const UserTable = pgTable('users', {
    id: varchar('id').primaryKey(),
    email: varchar('email').notNull(),
    name: varchar('name').notNull().unique(),
    imageUrl: varchar('imageUrl').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});