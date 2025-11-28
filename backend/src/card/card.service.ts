/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** card.service
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardInput, UpdateCardInput } from '../graphql/graphql';

@Injectable()
export class CardService {
    constructor(private prisma: PrismaService) {}

    async create(input: CreateCardInput) {
        const lastCard = await this.prisma.card.findFirst({
            where: { list_id: input.list_id },
            orderBy: { position: 'desc' },
        });
        const position = lastCard ? lastCard.position + 1 : 1;

        return this.prisma.card.create({
            data: { ...input, position },
        });
    }

    async updateContent(cardId: string, input: UpdateCardInput) {
        return this.prisma.card.update({
            where: { card_id: cardId },
            data: {
                title: input.title ?? undefined,
                description: input.description ?? undefined,
                due_date: input.due_date ?? undefined,
            },
        });
    }

    async delete(cardId: string) {
        await this.prisma.card.delete({ where: { card_id: cardId } });
        return { success: true, message: 'Card deleted' };
    }

    async move(cardId: string, listId: string, position: number) {
        return this.prisma.card.update({
            where: { card_id: cardId },
            data: { list_id: listId, position },
        });
    }

    async addLabel(cardId: string, labelId: string) {
        return this.prisma.card.update({
            where: { card_id: cardId },
            data: {
                card_labels: { create: { label_id: labelId } },
            },
        });
    }

    async removeLabel(cardId: string, labelId: string) {
        await this.prisma.cardLabel.delete({
            where: {
                card_id_label_id: { card_id: cardId, label_id: labelId },
            },
        });
        return this.prisma.card.findUniqueOrThrow({
            where: { card_id: cardId },
        });
    }
}
