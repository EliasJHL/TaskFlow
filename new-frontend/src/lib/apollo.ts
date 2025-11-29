/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** apollo
 */

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql'
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers
        }
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: { fetchPolicy: 'cache-and-network' }
    }
});
