/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** prisma.module
*/

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
