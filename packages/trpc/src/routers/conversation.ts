import { createRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { ConversationTable, PromptTable, UserConversationTable } from "@repo/db/schema";
import { v4 as uuidv4 } from 'uuid';

export const conversationRouter = createRouter({
    getConversationById: publicProcedure
        .input(z.object({
            conversationId: z.string()
        }))
        .query(async ({ ctx, input }) => {
            // Verify user has access to this conversation
            const userConversation = await ctx.db.query.UserConversationTable.findFirst({
                where: and(
                    eq(UserConversationTable.userId, ctx.user.userId),
                    eq(UserConversationTable.conversationId, input.conversationId)
                ),
                with: {
                    conversation: {
                        with: {
                            prompts: {
                                orderBy: (prompts, { asc }) => [asc(prompts.createdAt)]
                            }
                        }
                    }
                }
            })

            if (!userConversation) {
                throw new Error('Conversation not found or access denied')
            }

            return {
                id: userConversation.conversation.id,
                createdAt: userConversation.conversation.createdAt,
                updatedAt: userConversation.conversation.updatedAt,
                prompts: userConversation.conversation.prompts
            }
        }),

    createConversation: publicProcedure
        .input(z.object({
            initialPrompt: z.string().optional()
        }))
        .mutation(async ({ ctx, input }) => {
            const userConversationId = uuidv4()
            const userId = ctx.user.userId

            try {
                const [conversation] = await ctx.db.insert(ConversationTable).values({}).returning()

                await ctx.db.insert(UserConversationTable)
                    .values({
                        id: userConversationId,
                        userId,
                        conversationId: conversation.id,
                    })

                if (input.initialPrompt) {
                    const promptId = uuidv4()
                    await ctx.db.insert(PromptTable)
                        .values({
                            id: promptId,
                            conversationId: conversation.id,
                            prompt: input.initialPrompt,
                        })
                }

                return conversation
            } catch (error) {
                console.error(error)
                throw error
            }
        }),

    addPromptToConversation: publicProcedure
        .input(z.object({
            conversationId: z.string(),
            prompt: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            // Verify user has access to this conversation
            const userConversation = await ctx.db.query.UserConversationTable.findFirst({
                where: and(
                    eq(UserConversationTable.userId, ctx.user.userId),
                    eq(UserConversationTable.conversationId, input.conversationId)
                )
            })

            if (!userConversation) {
                throw new Error('Conversation not found or access denied')
            }

            // Add the prompt
            const promptId = `prompt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            const [prompt] = await ctx.db.insert(PromptTable)
                .values({
                    id: promptId,
                    conversationId: input.conversationId,
                    prompt: input.prompt,
                })
                .returning()

            // Update conversation's updatedAt timestamp
            await ctx.db.update(ConversationTable)
                .set({ updatedAt: new Date() })
                .where(eq(ConversationTable.id, input.conversationId))

            // Update user conversation's updatedAt timestamp
            await ctx.db.update(UserConversationTable)
                .set({ updatedAt: new Date() })
                .where(eq(UserConversationTable.id, userConversation.id))

            return prompt
        }),

    deleteConversation: publicProcedure
        .input(z.object({
            conversationId: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            // Verify user has access to this conversation
            const userConversation = await ctx.db.query.UserConversationTable.findFirst({
                where: and(
                    eq(UserConversationTable.userId, ctx.user.userId),
                    eq(UserConversationTable.conversationId, input.conversationId)
                )
            })

            if (!userConversation) {
                throw new Error('Conversation not found or access denied')
            }

            // Delete prompts first (foreign key constraint)
            await ctx.db.delete(PromptTable)
                .where(eq(PromptTable.conversationId, input.conversationId))

            // Delete user conversation link
            await ctx.db.delete(UserConversationTable)
                .where(eq(UserConversationTable.id, userConversation.id))

            // Delete conversation
            await ctx.db.delete(ConversationTable)
                .where(eq(ConversationTable.id, input.conversationId))

            return { success: true }
        }),
})