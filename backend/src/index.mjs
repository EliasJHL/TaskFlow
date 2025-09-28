/*
** TaskFlow
** File description:
** index
*/

import Fastify from 'fastify';
import mercurius from 'mercurius';
import { readFileSync } from 'fs';
import { join } from 'path';
import resolvers from './graphql/resolvers.js';

const schema = readFileSync(join(process.cwd(), 'src/graphql/schema.graphql'), 'utf8');

const app = Fastify({ logger: true });

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

app.listen({ port: 3000 });
