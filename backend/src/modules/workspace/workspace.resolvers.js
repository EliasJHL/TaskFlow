/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** workspace.resolvers
*/

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const workspaceResolvers = {
  Query: {
    workspaces: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');

      return prisma.workspace.findMany({
        where: {
          OR: [
            { owner_id: user.user_id },
            { members: { some: { user_id: user.user_id } } }
          ]
        },
        include: {
          owner: true,
          members: {
            include: { user: { select: { user_id: true, email: true, username: true } } }
          }
        }
      });
    },

    workspace: async (_, { workspace_id }, { user }) => {
      if (!user) throw new Error('Unauthorized');

      return prisma.workspace.findFirst({
        where: {
          workspace_id,
          OR: [
            { owner_id: user.user_id },
            { members: { some: { user_id: user.user_id } } }
          ]
        },
        include: {
          owner: true,
          members: {
            include: { user: { select: { user_id: true, email: true, username: true } } } 
          }
        }
      });
    },
  },

  Mutation: {
    createWorkspace: async (_, { input }, { user }) => {
      if (!user) throw new Error('Unauthorized');

      const { name, description } = input;

      const [workspace] = await prisma.$transaction([
        prisma.workspace.create({
          data: {
            name,
            description,
            owner_id: user.user_id
          }
        }),
      ].map(p => p).slice(0, 1));

      const ws = await prisma.workspaceMembers.create({
        data: {
          workspace_id: workspace.workspace_id,
          user_id: user.user_id,
          role: 'Admin'
        }
      });

      const fullWorkspace = await prisma.workspace.findUnique({
        where: { workspace_id: workspace.workspace_id },
        include: {
          owner: true,
          members: { include: { user: { select: { user_id: true, email: true, username: true } } } }
        }
      });

      return {workspace : fullWorkspace };
    },

    updateWorkspace: async (_, { workspace_id, input }, { user }) => {
      if (!user) throw new Error('Unauthorized');

      const ws = await prisma.workspace.findUnique({ where: { workspace_id } });
      const wms = await prisma.workspaceMembers.findFirst({ where: { workspace_id, user_id: user.user_id } });
      if (!ws || !wms) throw new Error('Workspace not found');
      if (wms.role !== 'Admin' && ws.owner_id !== user.user_id) throw new Error("Forbidden: You don't have permission to update this workspace");

      const updated = await prisma.workspace.update({
        where: { workspace_id },
        data: input,
        include: {
          owner: true,
          members: { include: { user: { select: { user_id: true, email: true, username: true } } } }
        }
      });

      return updated;
    },

    deleteWorkspace: async (_, { workspace_id }, { user }) => {
      if (!user) throw new Error('Unauthorized');

      const ws = await prisma.workspace.findUnique({ where: { workspace_id } });
      const wms = await prisma.workspaceMembers.findFirst({ where: { workspace_id, user_id: user.user_id } });
      if (!ws || !wms) throw new Error('Workspace not found');
      if (wms.role !== 'Admin' && ws.owner_id !== user.user_id) throw new Error("Forbidden: You don't have permission to delete this workspace");

      await prisma.$transaction([
        prisma.workspaceMembers.deleteMany({ where: { workspace_id } }),
        prisma.workspace.delete({ where: { workspace_id } })
      ]);
      return { success: true, message: 'Workspace deleted successfully' };
    }
  }
};

export default workspaceResolvers;
