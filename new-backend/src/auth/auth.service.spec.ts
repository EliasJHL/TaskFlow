/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** auth.service.spec
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
    let service: AuthService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            create: jest.fn().mockResolvedValue({
                                user_id: 1,
                                username: 'hey',
                                email: 'test@test.com',
                                hashed_password: 'hashedpassword',
                            }),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should register a new user', async () => {
        const result = await service.registerUser(
            'hey1',
            'test1@gmail.com',
            'password123',
        );
        expect(result.user).toBeDefined();
        expect(prisma.user.create).toHaveBeenCalled();
    });
});
