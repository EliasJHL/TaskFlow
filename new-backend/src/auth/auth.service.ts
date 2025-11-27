/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** auth.service
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterInput, LoginInput } from '../graphql/graphql';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async loginUser(input: LoginInput) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: { email: input.email },
            });

            const isPasswordValid = await bcrypt.compare(
                input.password,
                user.hashed_password,
            );
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }

            const token = this.jwtService.sign({
                sub: user.user_id,
                email: user.email,
            });
            return {
                __typename: 'AuthSuccess',
                user,
                token
            };
        } catch (error) {
            return {
                __typename: 'AuthError',
                message: 'Invalid credentials',
                code: 'INVALID_CREDENTIALS',
            };
        }
    }

    async registerUser(input: RegisterInput) {
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: input.email },
        });
        if (existingEmail) {
            return {
                __typename: 'AuthError',
                message: 'Email already in use',
                code: 'EMAIL_TAKEN',
                field: 'email',
            };
        }

        const existingUsername = await this.prisma.user.findUnique({
            where: { username: input.username },
        });
        if (existingUsername) {
            return {
                __typename: 'AuthError',
                message: 'Username already taken',
                code: 'USERNAME_TAKEN',
                field: 'username',
            };
        }

        try {
            const hashedPassword = await bcrypt.hash(input.password, 10);

            const newUser = await this.prisma.user.create({
                data: {
                    username: input.username,
                    email: input.email,
                    hashed_password: hashedPassword,
                },
            });

            const token = this.jwtService.sign({
                sub: newUser.user_id,
                email: newUser.email,
            });

            return {
                __typename: 'RegisterSuccess',
                user: newUser,
                token: token,
            };
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                const target = error.meta?.target as string[];

                if (target.includes('email')) {
                    return {
                        __typename: 'AuthError',
                        message: 'Email already in use.',
                        code: 'EMAIL_TAKEN',
                        field: 'email',
                    };
                }

                if (target.includes('username')) {
                    return {
                        __typename: 'AuthError',
                        message: 'Username already taken',
                        code: 'USERNAME_TAKEN',
                        field: 'username',
                    };
                }
            }
            return {
                __typename: 'AuthError',
                message: 'Registration failed',
                code: 'REGISTRATION_FAILED',
            };
        }
    }
}
