import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { UserConversationTable } from './user-conversation';
import { PromptTable } from './prompt';

export const ConversationTable = pgTable('conversations', {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const conversationRelations = relations(ConversationTable, ({ many }) => ({
    userConversations: many(UserConversationTable),
    prompts: many(PromptTable)
}))