/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** workspace-auth.decorator
 */

import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '@prisma/client';
import { WorkspaceGuard } from '../guards/workspace.guard';
import { AuthGuard } from '../guards/auth.guard';

export const ROLES_KEY = 'roles';

export function WorkspaceAuth(role: Role = Role.Member) {
    return applyDecorators(
        SetMetadata(ROLES_KEY, role),
        UseGuards(AuthGuard, WorkspaceGuard),
    );
}
