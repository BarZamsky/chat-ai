import { createTRPCReact, CreateTRPCReact, httpBatchLink } from '@trpc/react-query'
import { AppRouter } from '@repo/trpc'
import { QueryClient } from '@tanstack/react-query'
import superjson from 'superjson'

export const trpc: CreateTRPCReact<AppRouter, object> = createTRPCReact<AppRouter, object>()

export const queryClient = new QueryClient()

export const createTrpcClient = (url: string) => {
    return trpc.createClient({
        links: [
            httpBatchLink({
                url,
                transformer: superjson,
            }),
        ],
    })
}
