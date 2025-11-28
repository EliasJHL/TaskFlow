/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** board.resolver.spec
*/

import { Test, TestingModule } from '@nestjs/testing';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('BoardResolver', () => {
    let resolver: BoardResolver;
    let prisma: PrismaService;

    const mockBoardService = {
        findOne: jest.fn(),
        create: jest.fn(),
    };

    const mockPrismaService = {
        list: { findMany: jest.fn() },
        user: { findUnique: jest.fn() },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BoardResolver,
                { provide: BoardService, useValue: mockBoardService },
                { provide: PrismaService, useValue: mockPrismaService },
                { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
            ],
        }).compile();

        resolver = module.get<BoardResolver>(BoardResolver);
        prisma = module.get<PrismaService>(PrismaService);
    });

    describe('getLists (Field Resolver)', () => {
        it('should fetch lists belonging to the board ordered by position', async () => {
            const parentBoard = { board_id: 'b-123' };
            const expectedLists = [{ id: 'l-1', title: 'To Do' }];

            mockPrismaService.list.findMany.mockResolvedValue(expectedLists);

            const result = await resolver.getLists(parentBoard as any);

            expect(result).toEqual(expectedLists);
            expect(prisma.list.findMany).toHaveBeenCalledWith({
                where: { board_id: 'b-123' },
                orderBy: { position: 'asc' },
            });
        });
    });

    describe('getCreator (Field Resolver)', () => {
        it('should fetch the user who created the board', async () => {
            const parentBoard = { creator_id: 'u-999' };

            await resolver.getCreator(parentBoard as any);

            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { user_id: 'u-999' },
            });
        });
    });
});
