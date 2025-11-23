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

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async registerUser(username: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.prisma.user.create({
            data: { username, email, hashed_password: hashedPassword },
        });

        const token = this.jwtService.sign({
            sub: newUser.user_id,
            email: newUser.email,
        });
        return { user: newUser, token };
    }
}
