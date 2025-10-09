/*
** TaskFlow
** File description:
** index
*/

import { readFileSync } from 'fs';
import { join } from 'path';
import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import mercurius from 'mercurius';
import dotenv from 'dotenv';
import resolvers from './graphql/resolvers.js';
import cors from '@fastify/cors';
dotenv.config();

const schema = readFileSync(join(process.cwd(), 'src/graphql/schema.graphql'), 'utf8');
const app = Fastify({ logger: true });

await app.register(cors, {
  origin: 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie']
})

await app.register(cookie, { secret: process.env.COOKIE_SECRET});
await app.register(jwt, { secret: process.env.JWT_SECRET, cookie: { cookieName: 'session', signed: false } });

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
  context: async (request, reply) => {
    let user = null;
    try {
      const token = request.cookies?.session;
      if (token) {
        const payload = await app.jwt.verify(token);
        user = { user_id: payload.user_id, email: payload.email };
      }
    } catch (err) {
      request.log.debug('JWT verify failed:', err.message);
    }

    return {
      jwtSign: app.jwt.sign.bind(app.jwt),
      jwtVerify: app.jwt.verify.bind(app.jwt),
      reply,
      user,
    };
  },
});

await app.listen({ port: process.env.PORT || 3000 });