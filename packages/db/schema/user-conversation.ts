import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { UserTable } from './user';
import { ConversationTable } from './conversation';

export const UserConversationTable = pgTable('user_conversations', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('userId').notNull(),
    conversationId: uuid('conversationId').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const userConversationRelations = relations(UserConversationTable, ({ one }) => ({
    user: one(UserTable, {
        fields: [UserConversationTable.userId],
        references: [UserTable.id],
    }),
    conversation: one(ConversationTable, {
        fields: [UserConversationTable.conversationId],
        references: [ConversationTable.id],
    }),
}))
