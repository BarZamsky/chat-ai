import { CreateFastifyContextOptions, fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRouter } from '@repo/trpc'
import { createContext } from '@repo/trpc'
import dotenv from "dotenv";
dotenv.config();

import { createDb } from "@repo/db";
const db = createDb(process.env.DATABASE_URL!);

const app = Fastify({
    routerOptions: {
        maxParamLength: 5000,
    },
    logger: true,
})

app.register(cors, {
    origin: '*',
    credentials: true,
})

app.register(fastifyTRPCPlugin, {
    prefix: '/api',
    trpcOptions: { router: appRouter, createContext: (args: CreateFastifyContextOptions) => createContext({ ...args, db }) },
})

app.get('/', async () => {
    return { hello: 'wait-on 💨' }
})

app.listen({ port: Number(process.env.PORT ?? 4000) })
    .then(() => {
        console.log('Server listening on http://localhost:4000')
    })
    .catch((err) => {
        app.log.error(err)
        process.exit(1)
    })
