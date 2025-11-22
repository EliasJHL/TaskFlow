/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** GraphQL resolvers
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { checkBoardMembership } from "../workspace/workspace.service.js";

const cardResolvers = {
  Query: {
    cards: async (_, args, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      await checkBoardMembership(args.board_id, context.user.user_id);
      return await prisma.card.findMany({
        where: { board_id: args.board_id },
      });
    },
    card: async (_, args, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      await checkBoardMembership(args.board_id, context.user.user_id);
      return await prisma.card.findUnique({
        where: { id: args.card_id },
      });
    },
  },

  Mutation: {
    createCard: async (_, { input }, { user }) => {
      if (!user) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const { title, description, list_id, due_date } = input;

      const list = await prisma.list.findUnique({
        where: { list_id },
        include: { board: { include: { workspace: true } } },
      });

      if (!list) throw new Error("List not found");

      console.log("Checking membership for board:", list.board_id, "and user:", user.user_id);

      await checkBoardMembership(list.board_id, user.id);

      const maxPosition = await prisma.card.aggregate({
        where: { list_id },
        _max: { position: true },
      });

      const newPosition = (maxPosition._max.position ?? -1) + 1;

      const card = await prisma.card.create({
        data: {
          title,
          description: description || null,
          list_id,
          due_date: due_date ? new Date(due_date) : null,
          position: newPosition,
        },
      });
      return card;
    },

    updateCard: async (_, args, { user }) => {
      if (!user) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      await checkBoardMembership(args.board_id, user.id);
      return await prisma.card.update({
        where: { id: args.card_id },
        data: {
          title: args.title,
          description: args.description,
          list_id: args.list_id,
          due_date: args.due_date,
        },
      });
    },

    deleteCard: async (_, args, { user }) => {
      if (!user) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      await checkBoardMembership(args.board_id, user.id);
      return await prisma.card.delete({
        where: { id: args.card_id },
      });
    },
  },
};

export default cardResolvers;
