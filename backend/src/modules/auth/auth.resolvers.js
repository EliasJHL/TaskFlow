/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** auth.resolvers
 */

import {
    getUserByEmail,
    LoginLogic,
    checkIfUserExists,
    RegisterLogic
} from './auth.service';

const authResolvers = {
    Mutation: {
        login: async (_, args, context) => {
            try {
                const { email, password } = args.input;
                const user = await getUserByEmail(prisma, email);

                return await LoginLogic(context, user, password);
            } catch (error) {
                throw new Error('Login failed: ' + error.message);
            }
        },

        register: async (_, args, context) => {
            try {
                const { username, email, password } = args.input;
                await checkIfUserExists(prisma, email);

                return await RegisterLogic(context, username, email, password);
            } catch (error) {
                throw new Error('Register failed: ' + error.message);
            }
        },

        logout: async (_, __, context) => {
            if (context.reply) {
                context.reply.clearCookie('session', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/'
                });
            }
            return { success: true, message: 'Logout successful' };
        }
    }
};

export default authResolvers;
