/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** GraphQL resolvers
*/

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { sign } from 'crypto';

const prisma = new PrismaClient();

const authResolvers = {
  Mutation: {
    login: async (_, args, context) => {
      const { email, password } = args.input;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error('Invalid credentials');

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
          maxAge: 7 * 24 * 3600,
        });
      }

      return { token: jwtToken, user };
    },

    register: async (_, args, context) => {
      const { username, email, password } = args.input;
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: { username, email, hashed_password: hashedPassword },
      });

      const tokenPayload = { user_id: newUser.user_id, email: newUser.email };
      const jwtToken = context.jwtSign(tokenPayload, { expiresIn: '7d' });

      if (context.reply) {
        context.reply.setCookie('session', jwtToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 7 * 24 * 3600,
        });
      }

      return { token: jwtToken, user: newUser };
    },
    logout: async (_, __, context) => {
      if (context.reply) {
        context.reply.clearCookie('session', {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          path: '/',
        });
      }

      return { success: true, message: 'Logout successful' };
    }
  }
};

export default authResolvers;
