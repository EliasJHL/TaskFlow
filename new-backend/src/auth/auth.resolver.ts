/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** auth.resolver
 */

import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation()
    async register(
        @Args('input')
        input: { username: string; email: string; password: string },
        @Context() context: { reply: FastifyReply },
    ) {
        const { user, token } = await this.authService.registerUser(
            input.username,
            input.email,
            input.password,
        );

        context.reply.setCookie('session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });

        return { user, token };
    }
}
