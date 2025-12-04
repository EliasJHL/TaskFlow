/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** card.resolver
 */

import {
    Resolver,
    Mutation,
    Args,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { CardService } from './card.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardInput, UpdateCardInput, Card } from '../graphql/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Resolver('Card')
export class CardResolver {
    constructor(
        private cardService: CardService,
        private prisma: PrismaService,
    ) {}

    @Mutation('createCard')
    @UseGuards(AuthGuard)
    async createCard(@Args('input') input: CreateCardInput) {
        return this.cardService.create(input);
    }

    @Mutation('updateCardContent')
    @UseGuards(AuthGuard)
    async updateCard(
        @Args('card_id') id: string,
        @Args('input') input: UpdateCardInput,
    ) {
        return this.cardService.updateContent(id, input);
    }

    @Mutation('moveCard')
    @UseGuards(AuthGuard)
    async moveCard(
        @Args('card_id') id: string,
        @Args('list_id') listId: string,
        @Args('new_position') pos: number,
    ) {
        return this.cardService.move(id, listId, pos);
    }

    @Mutation('deleteCard')
    @UseGuards(AuthGuard)
    async deleteCard(@Args('card_id') id: string) {
        return this.cardService.delete(id);
    }

    @Mutation('addLabelToCard')
    @UseGuards(AuthGuard)
    async addLabel(
        @Args('card_id') cId: string,
        @Args('label_id') lId: string,
    ) {
        return this.cardService.addLabel(cId, lId);
    }

    @Mutation('removeLabelFromCard')
    @UseGuards(AuthGuard)
    async removeLabel(
        @Args('card_id') cId: string,
        @Args('label_id') lId: string,
    ) {
        return this.cardService.removeLabel(cId, lId);
    }

    // --- FIELD RESOLVERS ---

    @ResolveField('labels')
    async getLabels(@Parent() card: Card) {
        const cardLabels = await this.prisma.cardLabel.findMany({
            where: { card_id: card.card_id },
            include: { label: true },
        });
        return cardLabels.map((cl) => cl.label);
    }

    @ResolveField('assignees')
    async getAssignees(@Parent() card: Card) {
        const members = await this.prisma.cardMember.findMany({
            where: { card_id: card.card_id },
            include: { user: true },
        });
        return members.map((m) => m.user);
    }

    // @ResolveField('comments')
    // async getComments(@Parent() card: Card) {
    //     return this.prisma.comment.findMany({
    //         where: { card_id: card.card_id },
    //         orderBy: { created_at: 'asc' },
    //     });
    // }

    // @ResolveField('attachments')
    // async getAttachments(@Parent() card: Card) {
    //     return this.prisma.attachment.findMany({
    //         where: { card_id: card.card_id },
    //         orderBy: { created_at: 'asc' },
    //     });
    // }
    
    @ResolveField('checklists')
    async getChecklists(@Parent() card: Card) {
        return this.prisma.checklist.findMany({
            where: { card_id: card.card_id }
        });
    }
}
