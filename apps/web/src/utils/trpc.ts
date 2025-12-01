import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@chat-ai/trpc'

export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> = createTRPCReact<AppRouter>()
