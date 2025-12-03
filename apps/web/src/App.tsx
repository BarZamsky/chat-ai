import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from './utils/trpc'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import { Button } from '@repo/ui'

const queryClient = new QueryClient()

const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:4000/api',
            transformer: superjson,
        }),
    ],
})

export function App() {
    // const hello = trpc.user.useQuery({ name: 'Bar' })

    // if (hello.isLoading) return <div>Loading...</div>
    // if (hello.error) return <div>Error: {hello.error.message}</div>

    // return <h1>{hello.data?.greeting}</h1>
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <div>hi app</div>
                <Button> HI</Button>
            </QueryClientProvider>
        </trpc.Provider>
    )
}
