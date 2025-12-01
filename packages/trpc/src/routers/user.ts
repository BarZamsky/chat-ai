import { privateProcedure } from '../procedures'
import { createRouter, publicProcedure } from '../trpc'
import { Context } from '../context'

export const userRouter = createRouter({
    // Public procedures
    getAllUsers: publicProcedure.query(({ ctx }) => {
        const context = ctx as Context
        console.log({ context })
        // return context.db.user.findMany()
    }),

    // Private procedures (require authentication)
    me: privateProcedure.query(({ ctx }) => {
        console.log({ ctx })
        // Get the current user based on auth context
        // In a real app, you'd get the user ID from the auth token
        // For demo purposes, using a hardcoded ID:
        // const userId = "current-user-id";
        // return ctx.prisma.user.findUnique({
        //   where: { id: userId }
        // });
    }),
})
