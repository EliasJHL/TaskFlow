/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** auth.service.spec
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

jest.mock('bcrypt');

describe('AuthService', () => {
    let service: AuthService;
    let prisma: PrismaService;
    let jwtService: JwtService;

    const mockPrismaService = {
        user: {
            findUnique: jest.fn(),
            findUniqueOrThrow: jest.fn(),
            create: jest.fn(),
        },
    };

    const mockJwtService = {
        sign: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: PrismaService, useValue: mockPrismaService },
                { provide: JwtService, useValue: mockJwtService },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        prisma = module.get<PrismaService>(PrismaService);
        jwtService = module.get<JwtService>(JwtService);

        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        const registerInput = {
            username: 'testuser',
            email: 'test@test.com',
            password: 'password123',
        };

        it('should return AuthError if email is taken', async () => {
            mockPrismaService.user.findUnique.mockResolvedValueOnce({
                user_id: '1',
            });

            const result = await service.registerUser(registerInput);

            expect(result).toEqual({
                __typename: 'AuthError',
                message: 'Email already in use',
                code: 'EMAIL_TAKEN',
                field: 'email',
            });
        });

        it('should return AuthError if username is taken', async () => {
            mockPrismaService.user.findUnique.mockResolvedValueOnce(null);
            mockPrismaService.user.findUnique.mockResolvedValueOnce({
                user_id: '1',
            });

            const result = await service.registerUser(registerInput);

            expect(result).toEqual({
                __typename: 'AuthError',
                message: 'Username already taken',
                code: 'USERNAME_TAKEN',
                field: 'username',
            });
        });

        it('should register successfully', async () => {
            mockPrismaService.user.findUnique.mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_pwd');
            const newUser = { user_id: '123', email: 'test@test.com' };
            mockPrismaService.user.create.mockResolvedValue(newUser);
            mockJwtService.sign.mockReturnValue('fake_token');

            const result = await service.registerUser(registerInput);

            expect(prisma.user.create).toHaveBeenCalled();
            expect(result).toEqual({
                __typename: 'AuthSuccess',
                user: newUser,
                token: 'fake_token',
            });
        });

        it('should return AuthError on unexpected crash', async () => {
            mockPrismaService.user.findUnique.mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hash');

            mockPrismaService.user.create.mockRejectedValue(
                new Error('DB Dead'),
            );

            const result = await service.registerUser(registerInput);

            expect(result).toEqual({
                __typename: 'AuthError',
                message: 'Registration failed',
                code: 'REGISTRATION_FAILED',
            });
        });
    });

    describe('loginUser', () => {
        const loginInput = { email: 'test@test.com', password: 'password123' };

        it('should return AuthSuccess on valid credentials', async () => {
            const mockUser = {
                user_id: '1',
                email: 'test@test.com',
                hashed_password: 'hash',
            };

            mockPrismaService.user.findUniqueOrThrow.mockResolvedValue(
                mockUser,
            );
            (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Password OK
            mockJwtService.sign.mockReturnValue('token_xyz');

            const result = await service.loginUser(loginInput);

            expect(result).toEqual({
                __typename: 'AuthSuccess',
                user: mockUser,
                token: 'token_xyz',
            });
        });

        it('should return AuthError on invalid password', async () => {
            mockPrismaService.user.findUniqueOrThrow.mockResolvedValue({
                hashed_password: 'hash',
            });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Password KO

            const result = await service.loginUser(loginInput);

            expect(result.__typename).toBe('AuthError');
            expect((result as any).code).toBe('INVALID_CREDENTIALS');
        });

        it('should return AuthError if user not found (Prisma throws)', async () => {
            mockPrismaService.user.findUniqueOrThrow.mockRejectedValue(
                new Error('Not found'),
            );

            const result = await service.loginUser(loginInput);

            expect(result.__typename).toBe('AuthError');
            expect((result as any).code).toBe('INVALID_CREDENTIALS');
        });
    });
});
