import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CardService', () => {
    let service: CardService;
    let prisma: PrismaService;

    const mockPrismaService = {
        card: {
            findFirst: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findUniqueOrThrow: jest.fn(),
        },
        cardLabel: {
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CardService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<CardService>(CardService);
        prisma = module.get<PrismaService>(PrismaService);
        jest.clearAllMocks();
    });

    describe('create', () => {
        const input = { title: 'Task', list_id: 'list-1' };

        it('should set position to 1 if list is empty', async () => {
            mockPrismaService.card.findFirst.mockResolvedValue(null);

            await service.create(input);

            expect(prisma.card.create).toHaveBeenCalledWith({
                data: { ...input, position: 1 },
            });
        });

        it('should increment position if list has cards', async () => {
            mockPrismaService.card.findFirst.mockResolvedValue({ position: 4 });

            await service.create(input);

            expect(prisma.card.create).toHaveBeenCalledWith({
                data: { ...input, position: 5 },
            });
        });
    });

    describe('addLabel', () => {
        it('should link label to card', async () => {
            await service.addLabel('card-1', 'label-A');

            expect(prisma.card.update).toHaveBeenCalledWith({
                where: { card_id: 'card-1' },
                data: { card_labels: { create: { label_id: 'label-A' } } },
            });
        });
    });
});
