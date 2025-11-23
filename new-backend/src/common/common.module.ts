/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** common.module
*/

import { Global, Module } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WorkspaceGuard } from './guards/workspace.guard';
import { AuthGuard } from './guards/auth.guard';

@Global()
@Module({
    imports: [PrismaModule],
    providers: [WorkspaceGuard, AuthGuard],
    exports: [WorkspaceGuard, AuthGuard],
})
export class CommonModule {}
