import { apiRouter, conversationRouter, userRouter } from './routers'
import { createRouter } from './trpc'

export const appRouter = createRouter({
    api: apiRouter,
    user: userRouter,
    conversation: conversationRouter
})

export type AppRouter = typeof appRouter
export * from './context'
export * from './client'
export * from './routers'
