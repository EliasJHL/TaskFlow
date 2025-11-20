/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** GraphQL resolvers
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const boardResolvers = {
  Query: {
    boards: async (_, args, context) => {
      if (!context.user) throw new Error("Not authenticated");

      const boards = await prisma.board.findMany({
        where: { workspace_id: args.workspace_id },
        include: {
          lists: {
            orderBy: { position: "asc" },
            include: {
              cards: {
                orderBy: { position: "asc" },
              },
            },
          },
          labels: true,
        },
      });

      const transformedBoards = boards.map((board) => ({
        ...board,
        lists: board.lists || [],
        labels: board.labels || [],
      }));

      return transformedBoards;
    },
  },

  Mutation: {
    createBoard: async (_, { input }, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      const { title, description, color, workspace_id } = input;
      const board = await prisma.board.create({
        data: { title, description, color, workspace_id },
      });
      if (!board) throw new Error("Board creation failed");
      return board;
    },

    updateBoard: async (_, args, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      const { board_id, title, description, color } = args.input;
      const board = await prisma.board.update({
        where: { board_id },
        data: { title, description, color },
      });
      return { board };
    },

    deleteBoard: async (_, { board_id }, { user }) => {
      if (!user) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const board = await prisma.board.findUnique({
        where: { board_id },
        include: {
          workspace: {
            include: {
              members: {
                where: { user_id: user.user_id },
              },
            },
          },
          lists: {
            include: {
              cards: true,
            },
          },
        },
      });

      if (!board) {
        throw new GraphQLError("Board not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      const workspace = board.workspace;
      const isOwner = workspace.owner_id === user.user_id;
      const member = workspace.members.find((m) => m.user_id === user.user_id);
      const isAdmin = member?.role === "Admin";

      if (!isOwner && !isAdmin) {
        throw new GraphQLError("Insufficient permissions", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      await prisma.$transaction(async (tx) => {
        for (const list of board.lists) {
          for (const card of list.cards) {
            await tx.cardLabel.deleteMany({
              where: { card_id: card.card_id },
            });
            await tx.cardMember.deleteMany({
              where: { card_id: card.card_id },
            });
            await tx.comment.deleteMany({
              where: { card_id: card.card_id },
            });
            await tx.attachment.deleteMany({
              where: { card_id: card.card_id },
            });
          }

          await tx.card.deleteMany({
            where: { list_id: list.list_id },
          });
        }

        await tx.list.deleteMany({
          where: { board_id: board_id },
        });

        await tx.board.delete({
          where: { board_id: board_id },
        });
      });

      return {
        success: true,
        message: "Board and all its content deleted successfully",
      };
    },
  },
};

export default boardResolvers;
