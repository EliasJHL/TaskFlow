/*
** TaskFlow
** File description:
** resolvers
*/

import userResolvers from '../modules/user/user.resolvers.js';
import authResolvers from '../modules/auth/auth.resolvers.js';
import workspaceResolvers from '../modules/workspace/workspace.resolvers.js';
import { DateTimeResolver } from 'graphql-scalars';

export default {
    DateTime: DateTimeResolver,
    Query: {
        ...userResolvers.Query,
        ...authResolvers.Query,
        ...workspaceResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...authResolvers.Mutation,
        ...workspaceResolvers.Mutation,
    }
}