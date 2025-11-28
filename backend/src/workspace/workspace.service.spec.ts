/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** workspace.service.spec
*/

import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceService } from './workspace.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

describe('WorkspaceService', () => {
    let service: WorkspaceService;
    let prisma: PrismaService;

    const mockPrismaService = {
        workspace: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUniqueOrThrow: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WorkspaceService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<WorkspaceService>(WorkspaceService);
        prisma = module.get<PrismaService>(PrismaService);
        jest.clearAllMocks();
    });

    describe('createWorkspace', () => {
        it('should create workspace and include owner/members', async () => {
            const input = { name: 'Test WS', description: 'Desc' };
            const userId = 'u-1';

            mockPrismaService.workspace.create.mockResolvedValue({
                id: 'w-1',
                ...input,
            });

            await service.createWorkspace(userId, input);

            expect(prisma.workspace.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    data: expect.objectContaining({
                        owner_id: userId,
                        members: { create: { user_id: userId, role: 'Admin' } },
                    }),
                    include: {
                        members: { include: { user: true } },
                        owner: true,
                    },
                }),
            );
        });
    });

    describe('findAllUserWorkspaces', () => {
        it('should return workspaces with is_pinned calculated', async () => {
            const userId = 'u-1';
            const rawWorkspaces = [
                { workspace_id: 'w-1', pinned_by: [{ id: 'pin-1' }] },
                { workspace_id: 'w-2', pinned_by: [] },
            ];

            mockPrismaService.workspace.findMany.mockResolvedValue(
                rawWorkspaces,
            );

            const result = await service.findAllUserWorkspaces(userId);

            expect(result[0].is_pinned).toBe(true);
            expect(result[1].is_pinned).toBe(false);
        });
    });

    describe('delete', () => {
        it('should delete if user is owner', async () => {
            const workspaceId = 'w-1';
            const userId = 'u-1';

            mockPrismaService.workspace.findUniqueOrThrow.mockResolvedValue({
                workspace_id: workspaceId,
                owner_id: userId,
            });

            await service.delete(workspaceId, userId);

            expect(prisma.workspace.delete).toHaveBeenCalledWith({
                where: { workspace_id: workspaceId },
            });
        });

        it('should throw ForbiddenException if user is NOT owner', async () => {
            const workspaceId = 'w-1';
            const userId = 'u-1';
            const ownerId = 'u-2';

            mockPrismaService.workspace.findUniqueOrThrow.mockResolvedValue({
                workspace_id: workspaceId,
                owner_id: ownerId,
            });

            await expect(service.delete(workspaceId, userId)).rejects.toThrow(
                ForbiddenException,
            );

            expect(prisma.workspace.delete).not.toHaveBeenCalled();
        });
    });
});
