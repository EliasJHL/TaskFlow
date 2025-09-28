/*
** TaskFlow
** File description:
** resolvers
*/

import userResolvers from '../modules/user/user.resolvers.js';
import { DateTimeResolver } from 'graphql-scalars';

export default {
    DateTime: DateTimeResolver,
    Query: {
        ...userResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
    }
}