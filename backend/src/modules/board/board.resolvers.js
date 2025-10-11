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
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            return await prisma.board.findMany({
                where: { workspace_id: args.workspace_id }
            });
        }
    },

    Mutation: {
        createBoard: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            const { name, description, workspace_id } = args.input;
            return await prisma.board.create({
                data: { name, description, workspace_id }
            });
        },
        
        updateBoard: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            const { board_id, name, description } = args.input;
            return await prisma.board.update({
                where: { board_id },
                data: { name, description }
            });
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
