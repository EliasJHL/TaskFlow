/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** list.service.spec
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './list.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ListService', () => {
    let service: ListService;
    let prisma: PrismaService;

    const mockPrismaService = {
        list: {
            findFirst: jest.fn(),
            create: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<ListService>(ListService);
        prisma = module.get<PrismaService>(PrismaService);
        jest.clearAllMocks();
    });

    describe('create', () => {
        const input = { title: 'To Do', board_id: 'board-1' };

        it('should set position to 1 if it is the first list', async () => {
            mockPrismaService.list.findFirst.mockResolvedValue(null);

            mockPrismaService.list.create.mockImplementation(
                (args) => args.data,
            );

            const result = await service.create(input);

            expect(result.position).toBe(1);
        });

        it('should increment position if lists already exist', async () => {
            mockPrismaService.list.findFirst.mockResolvedValue({ position: 5 });

            mockPrismaService.list.create.mockImplementation(
                (args) => args.data,
            );

            const result = await service.create(input);

            expect(result.position).toBe(6);
        });
    });
});
