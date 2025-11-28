/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** label.service.spec
 */

import { Test, TestingModule } from '@nestjs/testing';
import { LabelService } from './label.service';
import { PrismaService } from '../prisma/prisma.service';

describe('LabelService', () => {
    let service: LabelService;
    let prisma: PrismaService;

    const mockPrismaService = {
        label: { create: jest.fn(), delete: jest.fn() },
        board: { findUnique: jest.fn() },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LabelService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<LabelService>(LabelService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    describe('create', () => {
        it('should fetch workspace_id from board and create label', async () => {
            const input = { name: 'Urgent', color: 'red', board_id: 'board-1' };

            mockPrismaService.board.findUnique.mockResolvedValue({
                workspace_id: 'ws-99',
            });

            await service.create(input);

            expect(prisma.board.findUnique).toHaveBeenCalledWith({
                where: { board_id: 'board-1' },
                select: { workspace_id: true },
            });

            expect(prisma.label.create).toHaveBeenCalledWith({
                data: {
                    name: input.name,
                    color: input.color,
                    workspace_id: 'ws-99',
                },
            });
        });
    });
});
