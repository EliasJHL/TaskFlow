/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** board.service
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export function IsLoggedIn(context) {
    if (!context.user) {
        throw new Error('Not authenticated');
    }
}

export async function getBoardAllWorkspaceBoards(workspace_id) {
    return await prisma.board.findMany({
        where: { workspace_id: workspace_id },
        include: {
            lists: {
                orderBy: { position: 'asc' },
                include: {
                    cards: {
                        orderBy: { position: 'asc' }
                    }
                }
            }
        }
    });
}

export async function CreateBoard(title, description, color, workspace_id) {
    return await prisma.board.create({
        data: { title, description, color, workspace_id }
    });
}

export async function UpdateBoard(board_id, title, description, color) {
    return await prisma.board.update({
        where: { board_id },
        data: { title, description, color }
    });
}

export async function DeleteBoard(board_id) {
    return await prisma.board.delete({
        where: { board_id }
    });
}