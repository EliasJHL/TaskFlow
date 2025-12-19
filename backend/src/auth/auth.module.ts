/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** auth.module
*/

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { AuthResultResolver } from './auth.resolver';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { WsAuthService } from 'src/ws-auth/ws-auth.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, 
        }),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '7d' },
            }),
        }),
    ],
    providers: [AuthService, PrismaService, AuthResolver, AuthResultResolver, WsAuthService],
    exports: [AuthService, WsAuthService],
})
export class AuthModule {}
