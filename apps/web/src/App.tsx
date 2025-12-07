import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from './utils/trpc'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import { HomePage } from './pages/HomePage'
import { useUser } from '@clerk/clerk-react'
import { useMemo } from 'react'

const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TRPCProvider>
                <HomePage />
            </TRPCProvider>
        </QueryClientProvider>
    )
}

function TRPCProvider({ children }: { children: React.ReactNode }) {
    const { user } = useUser()

    // Create tRPC client with user headers - recreate when user changes
    const trpcClient = useMemo(() => {
        return trpc.createClient({
            links: [
                httpBatchLink({
                    url: 'http://localhost:4000/api',
                    transformer: superjson,
                    headers() {
                        return {
                            'user-id': user?.id ?? 'anonymous',
                            'username': user?.fullName ?? user?.username ?? 'anonymous',
                        }
                    },
                }),
            ],
        })
    }, [user?.id, user?.fullName, user?.username])

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            {children}
        </trpc.Provider>
    )
}
