/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** auth.resolver
 */

import {
    Resolver,
    Mutation,
    Args,
    Context,
    ResolveField,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { RegisterInput, LoginInput } from '../graphql/graphql';

@Resolver('AuthResult')
export class AuthResultResolver {
    @ResolveField()
    __resolveType(value) {
        return value.__typename;
    }
}

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    /**
     * User authentication.
     * * Returns an `AuthResult` containing the token on success.
     * * @param input Email and Password
     * ```graphql
     * mutation Login($input: LoginInput!) {
     * login(input: $input) {
     *     __typename
     *    # Success case
     *     ... on AuthSuccess {
     *         token
     *         user {
     *          username
     *          email
     *         }
     *    # Error case
     *     ... on AuthError {
     *         message
     *         code
     *     }
     * }
     * ```
     * ```json
     * {
     *   "input": {
     *     "email": "john@example.com",
     *     "password": "secretPassword"
     *   }
     * }
     * ```
     */
    @Mutation()
    async login(
        @Args('input')
        input: LoginInput,
        @Context() context: { reply: FastifyReply },
    ) {
        const result = await this.authService.loginUser(input);

        if (result.__typename === 'AuthSuccess' && result.token) {
            context.reply.setCookie('session', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            });
        }
        return result;
    }

    /**
     * Mutation for user registration.
     * * This mutation returns an Union (`AuthResult`): either a success with the token, or a detailed error.
     *
     * @param input The registration data (username, email, password)
     * @returns An `AuthResult` which can be either `AuthSuccess` or `AuthError`
     *
     * ```graphql
     * mutation Register($input: RegisterInput!) {
     *   register(input: $input) {
     *       __typename
     *       # Success case
     *       ... on AuthSuccess {
     *         token
     *         user {
     *           user_id
     *           username
     *           email
     *         }
     *       }
     *       # Error case
     *       ... on AuthError {
     *           message
     *           code
     *           field
     *       }
     *    }
     * }
     * ```
     * ```json
     * {
     *   "input": {
     *     "username": "John",
     *     "email": "john@test.com",
     *     "password": "secretPassword"
     *   }
     * }
     * ```
     */
    @Mutation('register')
    async register(
        @Args('input')
        input: RegisterInput,
        @Context() context: { reply: FastifyReply },
    ) {
        const result = await this.authService.registerUser(input);

        if (result.__typename === 'AuthSuccess' && result.token) {
            context.reply.setCookie('session', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            });
        }
        return result;
    }

    /**
     * Logout mutation.
     * This mutation clears the session cookie.
     */
    @Mutation()
    async logout(@Context() context: { reply: FastifyReply }) {
        try {
            context.reply.clearCookie('session', { path: '/' });
            return {
                __typename: 'Success',
                successMessage: 'Logout successful',
            };
        } catch (error) {
            return {
                __typename: 'Error',
                errorMessage: 'Logout failed',
                code: 'LOGOUT_FAILED',
            };
        }
    }
}
