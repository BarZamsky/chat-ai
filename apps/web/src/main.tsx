import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from './utils/trpc'
import { App } from './App'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'

const queryClient = new QueryClient()

const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:4000/api',
            transformer: superjson,
        }),
    ],
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </trpc.Provider>
)
