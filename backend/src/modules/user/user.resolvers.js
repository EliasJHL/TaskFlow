/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** GraphQL resolvers
*/

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const userResolvers = {
    Query: {
        users: async () => {
        return await prisma.user.findMany();
        },
        user: async (_, args) => {
        return await prisma.user.findUnique({
            where: { user_id: args.user_id }
        });
        }
    },

    Mutation: {
        createUser: async (_, args) => {
        const { username, email, hashed_password } = args.input;
        return await prisma.user.create({
            data: { username, email, hashed_password }
        });
        },

        updateUser: async (_, args) => {
        const { user_id, username, email, hashed_password } = args.input;
        return await prisma.user.update({
            where: { user_id },
            data: { username, email, hashed_password }
        });
        },

        deleteUser: async (_, args) => {
        return await prisma.user.delete({
            where: { user_id: args.user_id }
        });
        }
    }
};

export default userResolvers;
