/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** apollo
 */

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3000/graphql',
    connectionParams: () => ({
      Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
    }),
    keepAlive: 12000,
    on: {
      connected: () => console.log('[WS client] connected'),
      closed: () => console.log('[WS client] closed'),
      error: () => console.log('[WS client] error'),
    },
  }),
);

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },
});
