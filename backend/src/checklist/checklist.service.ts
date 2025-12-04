/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** checklist.service
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChecklistInput } from '../graphql/graphql';

@Injectable()
export class ChecklistService {
    constructor(private prisma: PrismaService) {}

    async create(input: CreateChecklistInput) {
        return this.prisma.checklist.create({
            data: {
                card_id: input.card_id,
                content: input.content,
            },
        });
    }

    async delete(checklistId: string) {
        await this.prisma.checklist.delete({
            where: { checklist_id: checklistId },
        });
        return { success: true, message: 'Checklist deleted' };
    }
}
