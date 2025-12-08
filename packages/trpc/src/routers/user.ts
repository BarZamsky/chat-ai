import { privateProcedure } from '../procedures'
import { createRouter, publicProcedure } from '../trpc'
import { eq } from 'drizzle-orm'
import { UserConversationTable } from '@repo/db/schema'

export const userRouter = createRouter({
    // Public procedures
    getUserConversations: publicProcedure.query(async ({ ctx }) => {
        console.log('here')
        // Get user conversations with full conversation data and prompts
        try {
            const userConversations = await ctx.db.query.UserConversationTable.findMany({
                where: eq(UserConversationTable.userId, ctx.user.userId),
                with: {
                    conversation: {
                        with: {
                            prompts: {
                                orderBy: (prompts, { desc }) => [desc(prompts.createdAt)]
                            }
                        }
                    }
                },
                orderBy: (userConversations, { desc }) => [desc(userConversations.updatedAt)]
            })


            console.log(userConversations)
            // Transform to a cleaner structure
            return userConversations.map(uc => ({
                id: uc.conversation.id,
                createdAt: uc.conversation.createdAt,
                updatedAt: uc.conversation.updatedAt,
                prompts: uc.conversation.prompts,
                // Include the latest prompt for preview
                latestPrompt: uc.conversation.prompts[0]?.prompt || null,
                promptCount: uc.conversation.prompts.length
            }))
        } catch (error) {
            console.error(error)
            throw error
        }
    }),

    // Private procedures (require authentication)
    me: privateProcedure.query(({ ctx }) => {
        return {
            userId: ctx.user.userId,
            name: ctx.user.name
        }
    }),
})
