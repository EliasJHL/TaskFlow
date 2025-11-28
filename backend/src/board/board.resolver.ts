/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** board.resolver
 */

import {
    Args,
    Mutation,
    Query,
    Resolver,
    ResolveField,
    Parent,
    Context,
} from '@nestjs/graphql';
import { BoardService } from './board.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardInput, UpdateBoardInput, Board } from '../graphql/graphql';
import { WorkspaceAuth } from '../common/decorators/workspace-auth.decorator';
import { Role } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Resolver('Board')
export class BoardResolver {
    constructor(
        private boardService: BoardService,
        private prisma: PrismaService,
    ) {}

    // ===== QUERIES & MUTATIONS =====
    @Query('board')
    @UseGuards(AuthGuard)
    async getBoard(@Args('board_id') id: string) {
        return this.boardService.findOne(id);
    }

    @Query('boards')
    @WorkspaceAuth(Role.Viewer)
    async getBoardsByWorkspace(@Args('workspace_id') workspaceId: string) {
        return this.boardService.findAllByWorkspace(workspaceId);
    }

    @Mutation('createBoard')
    @WorkspaceAuth(Role.Member)
    async createBoard(
        @Args('input') input: CreateBoardInput,
        @Context() context: any,
    ) {
        return this.boardService.create(context.user.user_id, input);
    }

    @Mutation('updateBoard')
    @UseGuards(AuthGuard)
    async updateBoard(
        @Args('board_id') id: string,
        @Args('input') input: UpdateBoardInput,
    ) {
        return this.boardService.update(id, input);
    }

    @Mutation('deleteBoard')
    @UseGuards(AuthGuard)
    async deleteBoard(@Args('board_id') id: string) {
        return this.boardService.delete(id);
    }

    // ===== RESOLVE FIELDS =====
    @ResolveField('lists')
    async getLists(@Parent() board: Board) {
        return this.prisma.list.findMany({
            where: { board_id: board.board_id },
            orderBy: { position: 'asc' },
        });
    }

    @ResolveField('created_by')
    async getCreator(@Parent() board: Board) {
        return this.prisma.user.findUnique({
            where: { user_id: (board as any).creator_id },
        });
    }

    @ResolveField('labels')
    async getLabels(@Parent() board: Board) {
        return this.prisma.label.findMany({
            where: { workspace_id: board.workspace_id },
        });
    }
}
