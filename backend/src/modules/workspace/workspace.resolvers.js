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

      const workspaces = await prisma.workspace.findMany({
        where: {
          OR: [
            { owner_id: user.user_id },
            { members: { some: { user_id: user.user_id } } }
          ]
        },
        include: {
          owner: true,
          members: {
            include: { 
              user: { 
                select: { user_id: true, email: true, username: true } 
              } 
            }
          }
        }
      });

      const pinned = await prisma.pinnedWorkspace.findMany({
        where: { user_id: user.user_id },
        select: { workspace_id: true }
      });
      const pinnedIds = new Set(pinned.map(p => p.workspace_id));

      return workspaces.map(ws => ({
        ...ws,
        is_pinned: pinnedIds.has(ws.workspace_id)
      }));
    },

    workspace: async (_, { workspace_id }, { user }) => {
      if (!user) throw new Error('Unauthorized');

      const ws = await prisma.workspace.findFirst({
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

      if (!ws) return null;

      const pinned = await prisma.pinnedWorkspace.findFirst({
        where: { user_id: user.user_id, workspace_id }
      });

      return {
        ...ws,
        is_pinned: !!pinned
      };
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

      await prisma.workspaceMembers.create({
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

      return { workspace: { ...fullWorkspace, is_pinned: false } };
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

      const pinned = await prisma.pinnedWorkspace.findFirst({
        where: { user_id: user.user_id, workspace_id }
      });

      return { ...updated, is_pinned: !!pinned };
    },

    deleteWorkspace: async (_, { workspace_id }, { user }) => {
      if (!user) throw new Error('Unauthorized');

      const ws = await prisma.workspace.findUnique({ where: { workspace_id } });
      const wms = await prisma.workspaceMembers.findFirst({ where: { workspace_id, user_id: user.user_id } });
      if (!ws || !wms) throw new Error('Workspace not found');
      if (wms.role !== 'Admin' && ws.owner_id !== user.user_id) throw new Error("Forbidden: You don't have permission to delete this workspace");

      await prisma.$transaction([
        prisma.workspaceMembers.deleteMany({ where: { workspace_id } }),
        prisma.pinnedWorkspace.deleteMany({ where: { workspace_id } }),
        prisma.workspace.delete({ where: { workspace_id } })
      ]);
      return { success: true, message: 'Workspace deleted successfully' };
    }
  }
};

export default workspaceResolvers;
