/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** GraphQL resolvers
*/

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const listResolvers = {
    Query: {
        lists: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            return await prisma.list.findMany({
                where: { workspace_id: args.workspace_id, board_id: args.board_id },
                include: { cards: { orderBy: { position: 'asc' } } }
            });
        },
        list: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            return await prisma.list.findUnique({
                where: { list_id: args.list_id },
                include: { cards: { orderBy: { position: 'asc' } } }
            });
        }
    },

    Mutation: {
        createList: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            const { title, board_id, position, color } = args.input;
            return await prisma.list.create({
                data: { title, board_id, position, color }
            });
        },

        updateList: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            const { list_id, title, position, color } = args.input;
            return await prisma.list.update({
                where: { list_id },
                data: { title, position, color }
            });
        },

        deleteList: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            return await prisma.list.delete({
                where: { list_id: args.list_id }
            });
        }

    }
};

export default listResolvers;
