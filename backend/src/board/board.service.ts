/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** board.service
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardInput, UpdateBoardInput } from '../graphql/graphql';

@Injectable()
export class BoardService {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, input: CreateBoardInput) {
        return this.prisma.board.create({
            data: {
                title: input.title,
                description: input.description,
                color: input.color,
                workspace_id: input.workspace_id,
                creator_id: userId,
            },
        });
    }

    async findOne(boardId: string) {
        return this.prisma.board.findUniqueOrThrow({
            where: { board_id: boardId },
        });
    }

    async findAllByWorkspace(workspaceId: string) {
        return this.prisma.board.findMany({
            where: { workspace_id: workspaceId },
            orderBy: { title: 'asc' },
        });
    }

    async update(boardId: string, input: UpdateBoardInput) {
        try {
            await this.prisma.board.update({
                where: { board_id: boardId },
                data: {
                    title: input.title ?? undefined,
                    description: input.description ?? undefined,
                    color: input.color ?? undefined,
                },
            });
            return {
                __typename: 'Success',
                successMessage: 'Board updated successfully',
            };
        } catch (error) {
            return {
                __typename: 'Error',
                errorMessage: 'Board update failed',
                code: 'BOARD_UPDATE_FAILED',
            };
        }
    }

    async delete(boardId: string) {
        try {
            await this.prisma.board.delete({
                where: { board_id: boardId },
            });
            return {
                __typename: 'Success',
                successMessage: 'Board deleted successfully',
            };
        } catch (error) {
            return {
                __typename: 'Error',
                errorMessage: 'Board deletion failed',
                code: 'BOARD_DELETION_FAILED',
            };
        }
    }
}
