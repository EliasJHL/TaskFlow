/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** GraphQL resolvers
 */

import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
const prisma = new PrismaClient();
import { checkBoardMembership } from "../workspace/workspace.service.js";

const labelResolvers = {
  Query: {
    labels: async (_, args, context) => {
      if (!context.user) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      // TO DO CHECK IF USER HAS ACCESS TO THE WORKSPACE

      return await prisma.label.findMany({
        where: { workspace_id: args.workspace_id },
        orderBy: { name: "asc" },
      });
    }
  },

  Mutation: {
    createLabel: async (_, { input }, { user }) => {
      if (!user) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const { name, color, workspace_id } = input;

      if (!name || !color || !workspace_id) {
        throw new GraphQLError("Missing required fields for label creation");
      }

      // TO DO CHECK IF USER HAS ACCESS TO THE WORKSPACE

      const label = await prisma.label.create({
        data: {
          name,
          color,
          workspace_id,
        },
      });
      return label;
    },

    updateLabel: async (_, { input }, { user }) => {
      if (!user) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const { label_id, name, color } = input;
      if (!label_id) {
        throw new GraphQLError("Missing label_id for update");
      }

      const updated = await prisma.label.update({
        where: { label_id },
        data: {
          name,
          color,
        },
      });
      return updated;
    },

    deleteLabel: async (_, { label_id }, { user }) => {
      if (!user) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      if (!label_id) {
        throw new GraphQLError("Missing label_id for deletion");
      }

      const deleted = await prisma.label.delete({
        where: { label_id },
      });
      return deleted;
    },
  },
};

export default labelResolvers;
