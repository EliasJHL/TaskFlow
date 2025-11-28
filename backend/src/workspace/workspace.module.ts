/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** workspace.module
*/

import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceResolver } from './workspace.resolver';

@Module({
    providers: [WorkspaceService, WorkspaceResolver]
})
export class WorkspaceModule {}
