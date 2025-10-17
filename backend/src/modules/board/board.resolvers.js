/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** GraphQL resolvers
*/

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const boardResolvers = {
    Query: {
        boards: async (_, args, context) => {
            if (!context.user) throw new Error("Not authenticated");

            const boards = await prisma.board.findMany({
                where: { workspace_id: args.workspace_id },
                include: {
                    lists: {
                        orderBy: { position: 'asc' },
                        include: {
                            cards: {
                                orderBy: { position: 'asc' }
                            }
                        }
                    },
                    labels: true
                }
            });

            const transformedBoards = boards.map(board => ({
                ...board,
                lists: board.lists || [],
                labels: board.labels || []
            }));

            return transformedBoards;
        }
    },

    Mutation: {
        createBoard: async (_, { input }, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            const { title, description, color, workspace_id } = input;
            const board = await prisma.board.create({
                data: { title, description, color, workspace_id }
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
                data: { title, description, color }
            });
            return { board };
        },

        deleteBoard: async (_, args, context) => {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        return await prisma.board.delete({
            where: { board_id: args.board_id }
        });
        }
    }
};

export default boardResolvers;
