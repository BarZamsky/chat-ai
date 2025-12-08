import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { DB } from '@repo/db'

export interface User {
    userId: string
    name: string
}

export function createContext({ req, res, db }: CreateFastifyContextOptions & { db: DB }) {
    const userId = req.headers['user-id'] ?? req.headers['userid']
    const username = req.headers['username']

    const user: User = {
        userId: (Array.isArray(userId) ? userId[0] : userId) ?? 'anonymous',
        name: (Array.isArray(username) ? username[0] : username) ?? 'anonymous'
    }
    return { req, res, user, db }
}

export type Context = Awaited<ReturnType<typeof createContext>>
