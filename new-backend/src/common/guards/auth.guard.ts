/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** auth.guard
 */

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { user } = ctx.getContext();

        if (!user) {
            throw new ForbiddenException('Authentication required');
        }

        const existingUser = await this.prisma.user.findUnique({
            where: { user_id: user.user_id },
        });

        if (!existingUser) {
            throw new ForbiddenException('User does not exist');
        }

        return true;
    }
}
