/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** card.resolver
 */

import {
    Resolver,
    Mutation,
    Query,
    Args,
    ResolveField,
    Parent,
    Context,
} from '@nestjs/graphql';
import { CardService } from './card.service';
import { ListService } from '../list/list.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardInput, UpdateCardInput, Card } from '../graphql/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { Role } from '@prisma/client';
import { WorkspaceAuth } from '../common/decorators/workspace-auth.decorator';

@Resolver('Card')
export class CardResolver {
    constructor(
        private cardService: CardService,
        private prisma: PrismaService,
        private listService: ListService,
    ) {}

    @Query('card')
    @UseGuards(AuthGuard)
    @WorkspaceAuth(Role.Viewer)
    async getCard(
        @Args('card_id') id: string,
        @Args('workspace_id') workspaceId: string,
    ) {
        return await this.cardService.findById(id, workspaceId);
    }

    @Mutation('createCard')
    @UseGuards(AuthGuard)
    async createCard(
        @Args('input') input: CreateCardInput,
        @Context() ctx: any,
        @Context('pubsub') pubsub: any,
    ) {
        const card = await this.cardService.create(input);

        const boardId = this.listService
            .findOne(card.list_id)
            .then((list) => list?.board_id);
        const actorUserId = ctx.req?.user?.user_id ?? ctx.userId;

        if (!card || '__typename' in card) {
            throw new Error('CARD_INVALID');
        }

        try {
            await pubsub.publish({
                topic: 'BOARD_EVENT',
                payload: {
                    boardEvent: {
                        __typename: 'CardCreatedEvent',
                        board_id: await boardId,
                        actor_user_id: actorUserId,
                        card,
                    },
                },
            });
        } catch (e) {
            console.error('[PUBSUB] publish failed', e);
        }
        return card;
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
        @Context() ctx: any,
        @Context('pubsub') pubsub: any,
    ) {
        const card = await this.cardService.addLabel(cId, lId);

        const boardId = this.listService
            .findOne(card.list_id)
            .then((list) => list?.board_id);
        const actorUserId = ctx.req?.user?.user_id ?? ctx.userId;

        try {
            await pubsub.publish({
                topic: 'BOARD_EVENT',
                payload: {
                    boardEvent: {
                        __typename: 'LabelAddedToCardEvent',
                        board_id: await boardId,
                        actor_user_id: actorUserId,
                        card_id: cId,
                        label_id: lId,
                    },
                },
            });
        } catch (e) {
            console.error('[PUBSUB] publish failed', e);
        }
        return card;
    }

    @Mutation('removeLabelFromCard')
    @UseGuards(AuthGuard)
    async removeLabel(
        @Args('card_id') cId: string,
        @Args('label_id') lId: string,
        @Context() ctx: any,
        @Context('pubsub') pubsub: any,
    ) {
        const card = await this.cardService.removeLabel(cId, lId);

        const boardId = this.listService
            .findOne(card.list_id)
            .then((list) => list?.board_id);
        const actorUserId = ctx.req?.user?.user_id ?? ctx.userId;

        try {
            await pubsub.publish({
                topic: 'BOARD_EVENT',
                payload: {
                    boardEvent: {
                        __typename: 'LabelRemovedFromCardEvent',
                        board_id: await boardId,
                        actor_user_id: actorUserId,
                        card_id: cId,
                        label_id: lId,
                    },
                },
            });
        } catch (e) {
            console.error('[PUBSUB] publish failed', e);
        }
        return card;
    }

    @Mutation('addAssigneeToCard')
    @UseGuards(AuthGuard)
    async addAssignee(
        @Args('card_id') cId: string,
        @Args('user_id') uId: string,
        @Context() ctx: any,
        @Context('pubsub') pubsub: any,
    ) {
        const card = await this.cardService.addAssignee(cId, uId);

        const boardId = this.listService
            .findOne(card.card_id)
            .then((list) => list?.board_id);
        console.log(boardId);
        const actorUserId = ctx.req?.user?.user_id ?? ctx.userId;
        console.log(actorUserId);

        try {
            await pubsub.publish({
                topic: 'BOARD_EVENT',
                payload: {
                    boardEvent: {
                        __typename: 'AssigneeAddedToCardEvent',
                        board_id: await boardId,
                        actor_user_id: actorUserId,
                        card_id: cId,
                        user_id: uId,
                    },
                },
            });
        } catch (e) {
            console.error('[PUBSUB] publish failed', e);
        }
        return card;
    }

    @Mutation('removeAssigneeFromCard')
    @UseGuards(AuthGuard)
    async removeAssignee(
        @Args('card_id') cId: string,
        @Args('user_id') uId: string,
        @Context() ctx: any,
        @Context('pubsub') pubsub: any,
    ) {
        const card = await this.cardService.removeAssignee(cId, uId);

        const boardId = this.listService
            .findOne(card.list_id)
            .then((list) => list?.board_id);
        const actorUserId = ctx.req?.user?.user_id ?? ctx.userId;

        try {
            await pubsub.publish({
                topic: 'BOARD_EVENT',
                payload: {
                    boardEvent: {
                        __typename: 'AssigneeRemovedFromCardEvent',
                        board_id: await boardId,
                        actor_user_id: actorUserId,
                        card_id: cId,
                        user_id: uId,
                    },
                },
            });
        } catch (e) {
            console.error('[PUBSUB] publish failed', e);
        }
        return card;
    }

    @ResolveField('labels')
    async getLabels(@Parent() card: Card) {
        const cardLabels = await this.prisma.cardLabel.findMany({
            where: { card_id: card.card_id },
            include: { label: true },
        });
        return cardLabels.map((cl) => cl.label);
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
            where: { card_id: card.card_id },
        });
    }

    @ResolveField('card_members')
    async getCardMembers(@Parent() card: Card) {
        const cardMembers = await this.prisma.cardMember.findMany({
            where: { card_id: card.card_id },
            include: { user: true },
        });
        return cardMembers.map((cm) => cm.user);
    }
}
