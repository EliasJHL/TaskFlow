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
    async createList(@Args('input') input: CreateListInput) {
        return this.listService.create(input);
    }

    @Mutation('updateList')
    @UseGuards(AuthGuard)
    async updateList(
        @Args('list_id') list_id: string,
        @Args('input') input: UpdateListInput,
    ) {
        return this.listService.update(list_id, input);
    }

    @Mutation('deleteList')
    @UseGuards(AuthGuard)
    async deleteList(@Args('list_id') list_id: string) {
        return this.listService.delete(list_id);
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
