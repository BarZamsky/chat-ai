import { z } from 'zod'
import { publicProcedure, createRouter } from '../trpc'

export const apiRouter = createRouter({
    version: publicProcedure.query(() => {
        return { version: '0.1.0' }
    }),
    hello: publicProcedure.input(z.object({ username: z.string().nullish() }).nullish()).query(({ input, ctx }) => {
        return {
            text: `hello ${input?.username ?? ctx.user?.name ?? 'world'}`,
        }
    }),
})
