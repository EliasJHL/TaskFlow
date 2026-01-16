import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { PrismaService } from '../prisma/prisma.service';
import { BoardType } from '../graphql/graphql';

describe('BoardService', () => {
    let service: BoardService;
    let prisma: PrismaService;

    const mockPrismaService = {
        board: {
            create: jest.fn(),
            findUniqueOrThrow: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BoardService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<BoardService>(BoardService);
        prisma = module.get<PrismaService>(PrismaService);
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a board linked to the user and workspace', async () => {
            const userId = 'user-123';
            const input = {
                title: 'Mon Tableau',
                description: 'Desc',
                color: '#fff',
                workspace_id: 'ws-123',
                type: BoardType.KANBAN,
            };

            mockPrismaService.board.create.mockResolvedValue({
                board_id: 'board-1',
                ...input,
                creator_id: userId,
            });

            const result = await service.create(userId, input);

            expect(result.board_id).toBe('board-1');
            expect(prisma.board.create).toHaveBeenCalledWith({
                data: {
                    ...input,
                    whiteboard_data: undefined,
                    creator_id: userId,
                },
            });
        });
    });

    describe('findAllByWorkspace', () => {
        it('should return boards ordered by title', async () => {
            mockPrismaService.board.findMany.mockResolvedValue([]);

            await service.findAllByWorkspace('ws-123');

            expect(prisma.board.findMany).toHaveBeenCalledWith({
                where: { workspace_id: 'ws-123' },
                orderBy: { title: 'asc' },
            });
        });
    });
});
