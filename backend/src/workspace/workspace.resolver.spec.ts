/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** workspace.resolver.spec
*/

import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceService } from './workspace.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGuard } from '../common/guards/auth.guard';

describe('WorkspaceResolver', () => {
    let resolver: WorkspaceResolver;

    const mockWorkspaceService = {};
    const mockPrismaService = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WorkspaceResolver,
                { provide: WorkspaceService, useValue: mockWorkspaceService },
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        })
            .overrideGuard(AuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        resolver = module.get<WorkspaceResolver>(WorkspaceResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
