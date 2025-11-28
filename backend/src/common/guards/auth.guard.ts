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
    UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        const token = req.cookies?.session;

        if (!token) {
            throw new UnauthorizedException('Authentication required');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            const existingUser = await this.prisma.user.findUnique({
                where: { user_id: payload.sub },
            });

            if (!existingUser) {
                throw new ForbiddenException('User does not exist');
            }

            req.user = existingUser;
            ctx.getContext().user = existingUser;

            return true;
        } catch (error) {
            throw new ForbiddenException('Invalid token');
        }
    }
}
