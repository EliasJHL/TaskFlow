/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** workspace.resolver
 */

import { Args, Mutation, Resolver, Context, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { WorkspaceAuth } from '../common/decorators/workspace-auth.decorator';
import { CreateWorkspaceInput, UpdateWorkspaceInput } from '../graphql/graphql';
import { Role } from '@prisma/client';

@Resolver('Workspace')
export class WorkspaceResolver {
    constructor(private workspaceService: WorkspaceService) {}

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

    @Mutation()
    @WorkspaceAuth(Role.Admin)
    async deleteWorkspace(
        @Args('workspace_id') workspace_id: string,
        @Context() context: any,
    ) {
        return this.workspaceService.delete(
            workspace_id,
            context.user.user_id,
        );
    }
}
