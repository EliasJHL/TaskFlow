/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** auth.resolvers
*/

import { getUserByEmail } from "./auth.service";

const authResolvers = {
  Mutation: {
    login: async (_, args, context) => {
      try {
        const { email, password } = args.input;
        const user = await getUserByEmail(prisma, email);

        return await LoginLogic(context, user, password);
      } catch (error) {
        throw new Error("Login failed: " + error.message);
      }
    },

    register: async (_, args, context) => {
      const { username, email, password } = args.input;
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: { username, email, hashed_password: hashedPassword },
      });

      const tokenPayload = { user_id: newUser.user_id, email: newUser.email };
      const jwtToken = context.jwtSign(tokenPayload, { expiresIn: "7d" });

      if (context.reply) {
        context.reply.setCookie("session", jwtToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 7 * 24 * 3600,
        });
      }

      return { token: jwtToken, user: newUser };
    },
    logout: async (_, __, context) => {
      if (context.reply) {
        context.reply.clearCookie("session", {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/",
        });
      }

      return { success: true, message: "Logout successful" };
    },
  },
};

export default authResolvers;
