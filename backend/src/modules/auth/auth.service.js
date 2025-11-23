/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** auth.service
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function getUserByEmail(email) {
    return prisma.user.findUniqueOrThrow({ where: { email } });
}

export async function LoginLogic(user, password) {
    const valid = await bcrypt.compare(password, user.hashed_password);
    if (!valid) throw new Error('Invalid credentials');

    const tokenPayload = { user_id: user.user_id, email: user.email };
    const jwtToken = context.jwtSign(tokenPayload, { expiresIn: '7d' });

    if (context.reply) {
        context.reply.setCookie('session', jwtToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 3600
        });
    }
    return { token: jwtToken, user };
}

export async function checkIfUserExists(email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) throw new Error('User already exists');
}

export async function RegisterLogic(context, username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { username, email, hashed_password: hashedPassword }
    });

    const jwtToken = context.jwtSign(
        { user_id: newUser.user_id, email: newUser.email },
        { expiresIn: '7d' }
    );

    if (context.reply) {
        context.reply.setCookie('session', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 3600
        });
    }

    return { token: jwtToken, user: newUser };
}
