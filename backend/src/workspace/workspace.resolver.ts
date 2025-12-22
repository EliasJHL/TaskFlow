/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** workspace.resolver
 */

import { Args, Mutation, Resolver, Context, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { WorkspaceAuth } from '../common/decorators/workspace-auth.decorator';
import { CreateWorkspaceInput, UpdateWorkspaceInput, Workspace, AddWorkspaceMemberInput } from '../graphql/graphql';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Resolver('Workspace')
export class WorkspaceResolver {
    constructor(private workspaceService: WorkspaceService, private prisma: PrismaService) {}

    @Mutation()
    @UseGuards(AuthGuard)
    async createWorkspace(
        @Args('input') input: CreateWorkspaceInput,
        @Context() context: any,
    ) {
        return this.workspaceService.createWorkspace(context.user.user_id, input);
    }

    @Query("workspaces")
    @UseGuards(AuthGuard)
    async getUserWorkspaces(@Context() context: any) {
        return this.workspaceService.findAllUserWorkspaces(context.user.user_id);
    }

    @Query("workspace")
    @WorkspaceAuth(Role.Viewer)
    async getWorkspace(@Args('workspace_id') workspace_id: string) {
        return this.workspaceService.findWorkspace(workspace_id);
    }

    @Mutation("updateWorkspace") 
    @WorkspaceAuth(Role.Admin)
    async updateWorkspace(
        @Args('workspace_id') workspace_id: string,
        @Args('input') input: UpdateWorkspaceInput,
    ) {
        return this.workspaceService.updateWorkspace(workspace_id, input);
    }

    @Mutation('inviteMemberToWorkspace')
    @WorkspaceAuth(Role.Admin)
    async inviteMemberToWorkspace(
        @Args('workspace_id') workspace_id: string,
        @Args('email') email: string,
        @Args('role') role: Role,
    ) {
        return this.workspaceService.addMemberToWorkspace(
            workspace_id,
            email,
            role ?? Role.Viewer,
        );
    }

    @Mutation()
    @WorkspaceAuth(Role.Admin)
    async deleteWorkspace(
        @Args('workspace_id') workspace_id: string,
        @Context() context: any,
    ) {
        try {
            await this.workspaceService.delete(
                workspace_id,
                context.user.user_id,
            );
            return {
                __typename: 'Success',
                successMessage: 'Workspace deleted successfully',
            };
        } catch (error) {
            return {
                __typename: 'Error',
                errorMessage: 'Workspace deletion failed',
                code: 'WORKSPACE_DELETION_FAILED',
            };
        }
    }

    /*====== Resolve Fields ======*/
    @ResolveField('boards')
    async getBoards(@Parent() workspace: Workspace) {
        return this.prisma.board.findMany({
            where: { workspace_id: workspace.workspace_id },
            orderBy: { title: 'asc' }
        });
    }

    @ResolveField('members')
    async getMembers(@Parent() workspace: Workspace) {
        return this.prisma.workspaceMembers.findMany({
            where: { workspace_id: workspace.workspace_id },
            include: { user: true }
        });
    }
}
