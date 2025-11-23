/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** GraphQL resolvers
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import {
    IsLoggedIn,
    getBoardAllWorkspaceBoards,
    CreateBoard,
    UpdateBoard,
    DeleteBoard
} from './board.service';
import {
    checkWorkspaceMembership,
    hasUserRightsInWorkspace
} from '../workspace/workspace.service.js';

const boardResolvers = {
    Query: {
        boards: async (_, args, context) => {
            try {
                IsLoggedIn(context);
                await checkWorkspaceMembership(
                    context.user.user_id,
                    args.workspace_id
                );

                return await getBoardAllWorkspaceBoards(args.workspace_id);
            } catch (error) {
                throw new Error('Failed to fetch boards: ' + error.message);
            }
        }
    },

    Mutation: {
        createBoard: async (_, { input }, context) => {
            try {
                IsLoggedIn(context);
                await checkWorkspaceMembership(context.user.user_id, input.workspace_id);
                await hasUserRightsInWorkspace(context.user.user_id, input.workspace_id);
                const { title, description, color, workspace_id } = input;

                return await CreateBoard(
                    title,
                    description,
                    color,
                    workspace_id
                );
            } catch (error) {
                throw new Error('Failed to create board: ' + error.message);
            }
        },

        updateBoard: async (_, args, context) => {
            try {
                IsLoggedIn(context);
                await checkWorkspaceMembership(context.user.user_id, args.input.workspace_id);
                await hasUserRightsInWorkspace(context.user.user_id, args.input.workspace_id);
                const { board_id, title, description, color } = args.input;

                return await UpdateBoard(board_id, title, description, color);
            } catch (error) {
                throw new Error('Failed to update board: ' + error.message);
            }
        },

        deleteBoard: async (_, { board_id }, context) => {
            IsLoggedIn(context);
            await checkWorkspaceMembership(context.user.user_id, board_id);
            await hasUserRightsInWorkspace(context.user.user_id, board_id);

            const board = await prisma.board.findUnique({
                where: { board_id },
                include: {
                    workspace: {
                        include: {
                            members: {
                                where: { user_id: user.user_id }
                            }
                        }
                    },
                    lists: {
                        include: {
                            cards: true
                        }
                    }
                }
            });

            if (!board) {
                throw new GraphQLError('Board not found', {
                    extensions: { code: 'NOT_FOUND' }
                });
            }

    

            if (!isOwner && !isAdmin) {
                throw new GraphQLError('Insufficient permissions', {
                    extensions: { code: 'FORBIDDEN' }
                });
            }

            await prisma.$transaction(async (tx) => {
                for (const list of board.lists) {
                    for (const card of list.cards) {
                        await tx.cardMember.deleteMany({
                            where: { card_id: card.card_id }
                        });
                        await tx.comment.deleteMany({
                            where: { card_id: card.card_id }
                        });
                        await tx.attachment.deleteMany({
                            where: { card_id: card.card_id }
                        });
                    }

                    await tx.card.deleteMany({
                        where: { list_id: list.list_id }
                    });
                }

                await tx.list.deleteMany({
                    where: { board_id: board_id }
                });

                await tx.board.delete({
                    where: { board_id: board_id }
                });
            });

            return {
                success: true,
                message: 'Board and all its content deleted successfully'
            };
        }
    }
};

export default boardResolvers;
