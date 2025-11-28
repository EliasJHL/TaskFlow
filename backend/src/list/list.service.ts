/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** list.service
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListInput, UpdateListInput } from '../graphql/graphql';

@Injectable()
export class ListService {
    constructor(private prisma: PrismaService) {}

    async create(input: CreateListInput) {
        const lastList = await this.prisma.list.findFirst({
            where: { board_id: input.board_id },
            orderBy: { position: 'desc' },
        });
        const newPosition = lastList ? lastList.position + 1 : 1;

        return this.prisma.list.create({
            data: {
                ...input,
                position: newPosition,
                color: input.color || '#FFFFFF',
            },
        });
    }

    async update(listId: string, input: UpdateListInput) {
        try {
            await this.prisma.list.update({
                where: { list_id: listId },
                data: {
                    title: input.title ?? undefined,
                    color: input.color ?? undefined,
                },
            });
            return {
                __typename: 'Success',
                successMessage: 'List updated successfully',
            };
        } catch (error) {
            return {
                __typename: 'Error',
                errorMessage: 'List update failed',
                code: 'LIST_UPDATE_FAILED',
            };
        }
    }

    async delete(listId: string) {
        try {
            await this.prisma.list.delete({ where: { list_id: listId } });
            return {
                __typename: 'Success',
                successMessage: 'List deleted successfully',
            };
        } catch (error) {
            return {
                __typename: 'Error',
                errorMessage: 'List deletion failed',
                code: 'LIST_DELETION_FAILED',
            };
        }
    }

    async move(listId: string, newPosition: number) {
        try {
            await this.prisma.list.update({
                where: { list_id: listId },
                data: { position: newPosition },
            });
            return {
                __typename: 'Success',
                successMessage: 'List moved successfully',
            };
        } catch (error) {
            return {
                __typename: 'Error',
                errorMessage: 'List move failed',
                code: 'LIST_MOVE_FAILED',
            };
        }
    }
}
