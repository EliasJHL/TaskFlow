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

    async findOne(list_id: string) {
        return this.prisma.list.findUnique({ where: { list_id } });
    }

    async update(list_id: string, input: UpdateListInput) {
        return this.prisma.list.update({
            where: { list_id },
            data: {
                title: input.title ?? undefined,
                color: input.color ?? undefined,
            },
        });
    }

    async delete(list_id: string) {
        try {
            await this.prisma.list.delete({ where: { list_id } });
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

    async move(list_id: string, newPosition: number) {
        return this.prisma.list.update({
            where: { list_id },
            data: { position: newPosition },
        });
    }
}
