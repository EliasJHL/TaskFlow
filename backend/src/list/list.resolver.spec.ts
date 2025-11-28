/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** list.resolver.spec
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ListResolver } from './list.resolver';
import { ListService } from './list.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGuard } from '../common/guards/auth.guard';

describe('ListResolver', () => {
    let resolver: ListResolver;
    let prisma: PrismaService;

    const mockListService = { create: jest.fn() };
    const mockPrismaService = {
        card: { findMany: jest.fn() },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListResolver,
                { provide: ListService, useValue: mockListService },
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        })
            .overrideGuard(AuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        resolver = module.get<ListResolver>(ListResolver);
        prisma = module.get<PrismaService>(PrismaService);
    });

    describe('getCards (Field Resolver)', () => {
        it('should fetch cards for the list ordered by position', async () => {
            const parentList = { list_id: 'list-1' };
            const cards = [{ id: 'c1' }, { id: 'c2' }];

            mockPrismaService.card.findMany.mockResolvedValue(cards);

            const result = await resolver.getCards(parentList as any);

            expect(result).toEqual(cards);
            expect(prisma.card.findMany).toHaveBeenCalledWith({
                where: { list_id: 'list-1' },
                orderBy: { position: 'asc' },
            });
        });
    });
});
