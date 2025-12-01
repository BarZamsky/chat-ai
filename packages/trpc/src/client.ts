import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from './index'
import superjson from 'superjson'

export const trpcClient = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/api',
            transformer: superjson,
        }),
    ],
})
