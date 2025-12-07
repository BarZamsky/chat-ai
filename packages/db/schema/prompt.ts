import { pgTable, timestamp, text, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm';
import { ConversationTable } from './conversation';

export const PromptTable = pgTable('prompts', {
    id: uuid('id').primaryKey().defaultRandom(),
    conversationId: uuid('conversationId').notNull(),
    prompt: text('prompt').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const promptRelations = relations(PromptTable, ({ one }) => ({
    conversation: one(ConversationTable, {
        fields: [PromptTable.conversationId],
        references: [ConversationTable.id],
    }),
}))
