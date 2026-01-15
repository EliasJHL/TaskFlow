/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** list.resolver
 */

import {
    Resolver,
    Mutation,
    Args,
    ResolveField,
    Parent,
    Context,
} from '@nestjs/graphql';
import { ListService } from './list.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListInput, UpdateListInput, List } from '../graphql/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Resolver('List')
export class ListResolver {
    constructor(
        private listService: ListService,
        private prisma: PrismaService,
    ) {}

    // --- MUTATIONS ---
    @Mutation('createList')
    @UseGuards(AuthGuard)
    async createList(
        @Args('input') input: CreateListInput,
        @Context() ctx: any,
        @Context('pubsub') pubsub: any,
    ) {
        const list = await this.listService.create(input);

        const boardId = input.board_id;
        const actorUserId = ctx.req?.user?.user_id ?? ctx.userId ?? 'unknown';

        if (!list || '__typename' in list || !list.board_id) {
            throw new Error('LIST_INVALID');
        }

        try {
            await pubsub.publish({
                topic: 'BOARD_EVENT',
                payload: {
                    boardEvent: {
                        __typename: 'ListCreatedEvent',
                        board_id: boardId,
                        actor_user_id: actorUserId,
                        list,
                    },
                },
            });
        } catch (e) {
            console.error('[PUBSUB] publish failed', e);
        }
        return list;
    }

    @Mutation('updateList')
    @UseGuards(AuthGuard)
    async updateList(
        @Args('list_id') list_id: string,
        @Args('input') input: UpdateListInput,
        @Context() ctx: any,
        @Context('pubsub') pubsub: any,
    ) {
        const list = await this.listService.update(list_id, input);

        const boardId = await this.listService
            .findOne(list_id)
            .then((l) => l?.board_id);
        const actorUserId = ctx.req?.user?.user_id ?? ctx.userId;

        if (!list || '__typename' in list || !boardId) {
            throw new Error('LIST_INVALID');
        }

        try {
            await pubsub.publish({
                topic: 'BOARD_EVENT',
                payload: {
                    boardEvent: {
                        __typename: 'ListUpdatedEvent',
                        board_id: boardId,
                        actor_user_id: actorUserId,
                        list,
                    },
                },
            });
        } catch (e) {
            console.error('[PUBSUB] publish failed', e);
        }
        return list;
    }

    @Mutation('deleteList')
    @UseGuards(AuthGuard)
    async deleteList(
        @Args('list_id') list_id: string,
        @Context() ctx: any,
        @Context('pubsub') pubsub: any,
    ) {
        const res = await this.listService.delete(list_id);

        const board_id = await this.listService
            .findOne(list_id)
            .then((l) => l?.board_id);
        const actorUserId = ctx.req?.user?.user_id ?? ctx.userId;

        if (res.__typename === 'Error') return res;
        
        try {
            await pubsub.publish({
                topic: 'BOARD_EVENT',
                payload: {
                    boardEvent: {
                        __typename: 'ListDeletedEvent',
                        board_id: board_id,
                        actor_user_id: actorUserId,
                        list_id,
                    },
                },
            });
        } catch (e) {
            console.error('[PUBSUB] publish failed', e);
        }
        return res;
    }

    @Mutation('moveList')
    @UseGuards(AuthGuard)
    async moveList(
        @Args('list_id') list_id: string,
        @Args('new_position') new_position: number,
    ) {
        return this.listService.move(list_id, new_position);
    }

    // --- FIELD RESOLVERS ---
    @ResolveField('cards')
    async getCards(@Parent() list: List) {
        return this.prisma.card.findMany({
            where: { list_id: list.list_id },
            orderBy: { position: 'asc' },
        });
    }
}
