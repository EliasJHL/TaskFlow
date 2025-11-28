/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** workspace.guard
 */

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/workspace-auth.decorator';

@Injectable()
export class WorkspaceGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private prisma: PrismaService,
    ) {}
    Ò;
    private roleHierarchy = {
        [Role.Viewer]: 1,
        [Role.Member]: 2,
        [Role.Admin]: 3,
    };

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRole) return true;

        const ctx = GqlExecutionContext.create(context);
        const { user } = ctx.getContext();
        const args = ctx.getArgs();

        const workspaceId = args.workspace_id || args.input?.workspace_id;
        if (!workspaceId) {
            throw new ForbiddenException(
                'Cannot verify permissions: No workspace_id provided',
            );
        }

        const membership = await this.prisma.workspaceMembers.findUnique({
            where: {
                workspace_id_user_id: {
                    workspace_id: workspaceId,
                    user_id: user.user_id,
                },
            },
        });

        if (!membership)
            throw new ForbiddenException(
                'You are not a member of this workspace',
            );

        const userLevel = this.roleHierarchy[membership.role];
        const requiredLevel = this.roleHierarchy[requiredRole];

        if (userLevel < requiredLevel) {
            throw new ForbiddenException(
                `Insufficient permissions. Required: ${requiredRole}`,
            );
        }

        return true;
    }
}
