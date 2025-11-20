/*
 ** TaskFlow
 ** File description:
 ** resolvers
 */

import userResolvers from "../modules/user/user.resolvers.js";
import authResolvers from "../modules/auth/auth.resolvers.js";
import workspaceResolvers from "../modules/workspace/workspace.resolvers.js";
import boardResolvers from "../modules/board/board.resolvers.js";
import listResolvers from "../modules/list/list.resolvers.js";
import cardResolvers from "../modules/card/card.resolvers.js";
import { DateTimeResolver } from "graphql-scalars";

export default {
  DateTime: DateTimeResolver,
  Query: {
    ...userResolvers.Query,
    ...authResolvers.Query,
    ...workspaceResolvers.Query,
    ...boardResolvers.Query,
    ...listResolvers.Query,
    ...cardResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...authResolvers.Mutation,
    ...workspaceResolvers.Mutation,
    ...boardResolvers.Mutation,
    ...listResolvers.Mutation,
    ...cardResolvers.Mutation,
  },
};
