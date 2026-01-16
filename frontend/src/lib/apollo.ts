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

const GRAPHQL_HTTP = import.meta.env.VITE_GRAPHQL_ENDPOINT

if (!/^https?:\/\//.test(GRAPHQL_HTTP)) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT must start with http:// or https://');
}

const GRAPHQL_WS = GRAPHQL_HTTP.replace(/^http/, 'ws');

const httpLink = createHttpLink({
  uri: GRAPHQL_HTTP,
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: GRAPHQL_WS,
    connectionParams: () => ({
      Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
    }),
    keepAlive: 12000,
  }),
);

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
