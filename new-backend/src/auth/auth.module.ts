/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** auth.module
*/

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
// import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '7d' },
        }),
    ],
    providers: [AuthService, PrismaService],
})
export class AuthModule {}
