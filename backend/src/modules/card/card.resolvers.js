/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** GraphQL resolvers
*/

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { checkBoardMembership } from '../workspace/workspace.service.js';

const cardResolvers = {
    Query: {
        cards: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            await checkBoardMembership(args.board_id, context.user.user_id);
            return await prisma.card.findMany({
                where: { workspace_id: args.workspace_id, board_id: args.board_id }
            });
        },
        card: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            await checkBoardMembership(args.board_id, context.user.user_id);
            return await prisma.card.findUnique({
                where: { id: args.card_id }
            });
        }
    },

    Mutation: {
        createCard: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            await checkBoardMembership(args.board_id, context.user.user_id);
            const maxPosition = await prisma.card.aggregate({
                where: { list_id: args.list_id },
                _max: {
                    position: true
                }
            });
            const newPosition = (maxPosition._max.position ?? 0) + 1;
            return await prisma.card.create({
                data: {
                    title: args.title,
                    description: args.description,
                    list_id: args.list_id,
                    due_date: args.due_date,
                    position: newPosition
                }
            });
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
                    due_date: args.due_date
                }
            });
        },
        
        deleteCard: async (_, args, context) => {
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            await checkBoardMembership(args.board_id, context.user.user_id);
            return await prisma.card.delete({
                where: { id: args.card_id }
            });
        }
    }
};

export default listResolvers;
