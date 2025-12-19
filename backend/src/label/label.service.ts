/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** label.service
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLabelInput } from '../graphql/graphql';

@Injectable()
export class LabelService {
    constructor(private prisma: PrismaService) {}

    async create(input: CreateLabelInput) {
        try {
            const board = await this.prisma.board.findUnique({
                where: { board_id: input.board_id },
                select: { workspace_id: true },
            });
            if (!board) {
                return {
                    __typename: 'Error',
                    errorMessage: 'Board not found',
                    code: 'BOARD_NOT_FOUND',
                };
            }
            return this.prisma.label.create({
                data: {
                    name: input.name,
                    color: input.color,
                    board_id: input.board_id,
                },
            });
        } catch (error) {
            return {
                __typename: 'Error',
                errorMessage: 'Label creation failed',
                code: 'LABEL_CREATION_FAILED',
            };
        }
    }

    async delete(id: string) {
        try {
            await this.prisma.label.delete({ where: { label_id: id } });
            return {
                __typename: 'Success',
                successMessage: 'Label deleted successfully',
            };
        } catch (error) {
            return {
                __typename: 'Error',
                errorMessage: 'Label deletion failed',
                code: 'LABEL_DELETION_FAILED',
            };
        }
    }
}
