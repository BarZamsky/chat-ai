# tRPC Server API Setup Guide

## 🎯 Overview

Your tRPC server API is fully configured and ready to use! This document explains how everything works together.

## 📁 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (React)                        │
│  /apps/web/src/App.tsx                                      │
│  - Clerk Authentication (user info)                         │
│  - tRPC Client with headers                                 │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTP Request
                   │ Headers: user-id, username
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    Server (Fastify)                          │
│  /apps/api/src/index.ts                                     │
│  - Running on http://localhost:4000                         │
│  - Endpoint: /api                                           │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    tRPC Context                              │
│  /packages/trpc/src/context.ts                              │
│  - Extracts user-id and username from headers              │
│  - Creates context with { user, db, req, res }             │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    tRPC Routers                              │
│  /packages/trpc/src/routers/                                │
│  - user.ts (user-related queries)                           │
│  - api.ts (other API endpoints)                             │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Components

### 1. Server Setup (`/apps/api/src/index.ts`)

The Fastify server is configured with:
- **Port**: 4000 (configurable via `PORT` env variable)
- **CORS**: Enabled for all origins
- **tRPC Endpoint**: `/api`
- **Context Creation**: Extracts user info from request headers

```typescript
app.register(fastifyTRPCPlugin, {
    prefix: '/api',
    trpcOptions: { router: appRouter, createContext },
})
```

### 2. Client Setup (`/apps/web/src/App.tsx`)

The React client is configured with:
- **tRPC Client**: Connects to `http://localhost:4000/api`
- **Authentication**: Sends Clerk user info via headers
- **Data Transformer**: Uses `superjson` for complex data types
- **Query Client**: React Query for caching and state management

```typescript
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
```

### 3. Context (`/packages/trpc/src/context.ts`)

Creates the context for each request:
- Extracts `user-id` or `userid` header
- Extracts `username` header
- Provides database connection (`db`)
- Makes user info available to all procedures

```typescript
export function createContext({ req, res }: CreateFastifyContextOptions) {
    const userId = req.headers['user-id'] ?? req.headers['userid']
    const username = req.headers['username']

    const user: User = {
        userId: (Array.isArray(userId) ? userId[0] : userId) ?? 'anonymous',
        name: (Array.isArray(username) ? username[0] : username) ?? 'anonymous'
    }
    return { req, res, user, db }
}
```

### 4. Routers (`/packages/trpc/src/routers/`)

Define your API endpoints here. Example from `user.ts`:

```typescript
export const userRouter = createRouter({
    getUserConversations: publicProcedure.query(async ({ ctx }) => {
        // ctx.user.userId is automatically available from headers
        const conversations = await ctx.db.query.UserConversationTable.findMany({
            where: eq(UserConversationTable.userId, ctx.user.userId),
            columns: {
                conversationId: true
            }
        })
        return conversations
    }),
})
```

## 🚀 Usage in Components

### Basic Query

```typescript
import { trpc } from '../../utils/trpc'

function MyComponent() {
    const { data, isLoading, error } = trpc.user.getUserConversations.useQuery()
    
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    
    return <div>{/* Use data here */}</div>
}
```

### Query with Input

```typescript
const { data } = trpc.user.getConversation.useQuery({ 
    conversationId: '123' 
})
```

### Mutation

```typescript
const mutation = trpc.user.createConversation.useMutation({
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries()
    }
})

// Use it
mutation.mutate({ title: 'New Conversation' })
```

## 📝 Adding New Endpoints

### 1. Define the procedure in a router

```typescript
// /packages/trpc/src/routers/user.ts
import { z } from 'zod'

export const userRouter = createRouter({
    // ... existing procedures
    
    createConversation: publicProcedure
        .input(z.object({
            title: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const conversation = await ctx.db.insert(ConversationTable).values({
                userId: ctx.user.userId,
                title: input.title,
            }).returning()
            
            return conversation[0]
        }),
})
```

### 2. Use it in your component

```typescript
const createConversation = trpc.user.createConversation.useMutation()

const handleCreate = () => {
    createConversation.mutate({ title: 'My New Chat' })
}
```

## 🔐 Authentication Flow

1. **User logs in** via Clerk in the React app
2. **Clerk provides** user ID and username
3. **tRPC client** sends these as headers with every request
4. **Server context** extracts headers and creates user object
5. **All procedures** have access to `ctx.user.userId` and `ctx.user.name`

## 🛠️ Environment Variables

### Server (`/apps/api/.env`)
```env
PORT=4000
DATABASE_URL=your_database_url
```

### Client (`/apps/web/.env`)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

## 🧪 Testing the API

### 1. Start the server
```bash
cd apps/api
pnpm run dev
```

### 2. Start the client
```bash
cd apps/web
pnpm run dev
```

### 3. Check the console
You should see the conversations logged in your browser console from `UserActions.tsx`.

## 🐛 Troubleshooting

### Issue: "user is undefined"
- Make sure you're logged in via Clerk
- Check that headers are being sent (use browser DevTools → Network tab)

### Issue: "Cannot read property 'userId' of undefined"
- Ensure the context is properly extracting headers
- Check that the header names match: `user-id` and `username`

### Issue: "CORS error"
- Verify CORS is enabled in `/apps/api/src/index.ts`
- Check that the client URL matches the CORS origin

## 📚 Resources

- [tRPC Documentation](https://trpc.io)
- [React Query Documentation](https://tanstack.com/query)
- [Fastify Documentation](https://fastify.dev)
- [Clerk Documentation](https://clerk.com/docs)
