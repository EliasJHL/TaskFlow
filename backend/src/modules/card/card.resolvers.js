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
    createCard: async (_, { input }, context) => {
      if (!context.user) throw new Error("Not authenticated");

      const { title, description, list_id, due_date } = input;

      const list = await prisma.list.findUnique({
        where: { list_id },
        include: { board: { include: { workspace: true } } },
      });

      if (!list) throw new Error("List not found");

      const isMember = await prisma.workspaceMembers.findFirst({
        where: {
          workspace_id: list.board.workspace_id,
          user_id: context.user.id,
        },
      });

      if (!isMember) {
        throw new Error("Access denied");
      }

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

    updateCard: async (_, args, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      await checkBoardMembership(args.board_id, context.user.user_id);
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

    deleteCard: async (_, args, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      await checkBoardMembership(args.board_id, context.user.user_id);
      return await prisma.card.delete({
        where: { id: args.card_id },
      });
    },
  },
};

export default cardResolvers;
