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
                where: { workspace_id: args.workspace_id, board_id: args.board_id }
            });
        }
    },

    Mutation: {
        createList: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            const { name, description, workspace_id, board_id } = args.input;
            return await prisma.list.create({
                data: { name, description, workspace_id, board_id }
            });
        },

        updateList: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            const { list_id, name, description } = args.input;
            return await prisma.list.update({
                where: { list_id },
                data: { name, description }
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
