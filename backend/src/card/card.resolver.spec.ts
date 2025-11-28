/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** card.resolver.spec
 */

import { Test, TestingModule } from '@nestjs/testing';
import { CardResolver } from './card.resolver';
import { CardService } from './card.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGuard } from '../common/guards/auth.guard';

describe('CardResolver', () => {
    let resolver: CardResolver;

    const mockCardService = {};
    const mockPrismaService = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CardResolver,
                { provide: CardService, useValue: mockCardService },
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        })
            .overrideGuard(AuthGuard)
            .useValue({ canActivate: () => true })
            .compile();

        resolver = module.get<CardResolver>(CardResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
