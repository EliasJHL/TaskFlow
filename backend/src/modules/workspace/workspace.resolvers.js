/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** workspace.resolvers
 */

import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

const prisma = new PrismaClient();

const workspaceResolvers = {
    Query: {
        workspaces: async(_, __, { user }) => {
            if (!user) throw new Error('Unauthorized');

            const UserWorkspaces = await prisma.workspace.findMany({
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
                                select: { 
                                    user_id: true, 
                                    email: true, 
                                    username: true,
                                    picture: true
                                }
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

            return UserWorkspaces.map(ws => ({
                ...ws,
                is_pinned: pinnedIds.has(ws.workspace_id)
            }));
        },

        workspace: async(_, { workspace_id }, { user }) => {
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
                        include: { 
                            user: { 
                                select: { 
                                    user_id: true, 
                                    email: true, 
                                    username: true,
                                    picture: true
                                } 
                            } 
                        }
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

        workspaceMembers: async (_, { workspace_id }, { user }) => {
            if (!user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' }
                });
            }

            const workspace = await prisma.workspace.findUnique({
                where: { workspace_id },
                include: {
                    members: {
                        where: { user_id: user.user_id }
                    }
                }
            });

            if (!workspace) {
                throw new GraphQLError('Workspace not found', {
                    extensions: { code: 'NOT_FOUND' }
                });
            }

            const isOwner = workspace.owner_id === user.user_id;
            const isMember = workspace.members.length > 0;

            if (!isOwner && !isMember) {
                throw new GraphQLError('Not authorized', {
                    extensions: { code: 'FORBIDDEN' }
                });
            }

            const members = await prisma.workspaceMembers.findMany({
                where: { workspace_id },
                include: {
                    user: {
                        select: {
                            user_id: true,
                            username: true,
                            email: true,
                            picture: true
                        }
                    }
                },
                orderBy: { user_id: 'asc' }
            });

            return members;
        },
    },

    Mutation: {
        createWorkspace: async(_, { input }, { user }) => {
            if (!user) throw new Error('Unauthorized');

            const { name, description, color } = input;

            const workspace = await prisma.workspace.create({
                data: {
                    name,
                    description,
                    owner_id: user.user_id,
                    color: color || "#1F1F1FFF"
                },
                include: {
                    owner: true,
                    members: { 
                        include: { 
                            user: { 
                                select: { 
                                    user_id: true, 
                                    email: true, 
                                    username: true,
                                    picture: true
                                } 
                            } 
                        } 
                    }
                }
            });

            return { workspace: {...workspace, is_pinned: false } };
        },

        updateWorkspace: async(_, { workspace_id, input }, { user }) => {
            if (!user) throw new Error('Unauthorized');

            const ws = await prisma.workspace.findUnique({ where: { workspace_id } });
            const wms = await prisma.workspaceMembers.findFirst({ 
                where: { workspace_id, user_id: user.user_id } 
            });
            
            if (!ws || !wms) throw new Error('Workspace not found');
            if (wms.role !== 'Admin' && ws.owner_id !== user.user_id) {
                throw new Error("Forbidden: You don't have permission to update this workspace");
            }

            const updated = await prisma.workspace.update({
                where: { workspace_id },
                data: input,
                include: {
                    owner: true,
                    members: { 
                        include: { 
                            user: { 
                                select: { 
                                    user_id: true, 
                                    email: true, 
                                    username: true,
                                    picture: true
                                } 
                            } 
                        } 
                    }
                }
            });

            const pinned = await prisma.pinnedWorkspace.findFirst({
                where: { user_id: user.user_id, workspace_id }
            });

            return {...updated, is_pinned: !!pinned };
        },

        deleteWorkspace: async(_, { workspace_id }, { user }) => {
            if (!user) throw new Error('Unauthorized');

            const ws = await prisma.workspace.findUnique({ where: { workspace_id } });
            const wms = await prisma.workspaceMembers.findFirst({ 
                where: { workspace_id, user_id: user.user_id } 
            });
            
            if (!ws || !wms) throw new Error('Workspace not found');
            if (wms.role !== 'Admin' && ws.owner_id !== user.user_id) {
                throw new Error("Forbidden: You don't have permission to delete this workspace");
            }

            await prisma.$transaction([
                prisma.workspaceMembers.deleteMany({ where: { workspace_id } }),
                prisma.pinnedWorkspace.deleteMany({ where: { workspace_id } }),
                prisma.workspace.delete({ where: { workspace_id } })
            ]);
            
            return { success: true, message: 'Workspace deleted successfully' };
        },

        addWorkspaceMember: async (_, { input }, { user }) => {
            const { workspace_id, user_email, role } = input;

            if (!user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' }
                });
            }

            const workspace = await prisma.workspace.findUnique({
                where: { workspace_id },
                include: {
                    members: {
                        where: { user_id: user.user_id }
                    }
                }
            });

            if (!workspace) {
                throw new GraphQLError('Workspace not found', {
                    extensions: { code: 'NOT_FOUND' }
                });
            }

            const isOwner = workspace.owner_id === user.user_id;
            const isAdmin = workspace.members.some(
                m => m.user_id === user.user_id && m.role === 'Admin'
            );

            if (!isOwner && !isAdmin) {
                throw new GraphQLError('Insufficient permissions', {
                    extensions: { code: 'FORBIDDEN' }
                });
            }

            const userToAdd = await prisma.user.findUnique({
                where: { email: user_email }
            });

            if (!userToAdd) {
                throw new GraphQLError('User not found', {
                    extensions: { code: 'NOT_FOUND' }
                });
            }

            const existingMember = await prisma.workspaceMembers.findUnique({
                where: {
                    workspace_id_user_id: {
                        workspace_id,
                        user_id: userToAdd.user_id
                    }
                }
            });

            if (existingMember) {
                throw new GraphQLError('User is already a member', {
                    extensions: { code: 'CONFLICT' }
                });
            }

            const member = await prisma.workspaceMembers.create({
                data: {
                    workspace_id,
                    user_id: userToAdd.user_id,
                    role: role || 'Member'
                },
                include: {
                    user: true
                }
            });

            return member;
        },

        removeWorkspaceMember: async (_, { workspace_id, user_id }, { user }) => {
            if (!user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' }
                });
            }

            const workspace = await prisma.workspace.findUnique({
                where: { workspace_id },
                include: {
                    members: {
                        where: { user_id: user.user_id }
                    }
                }
            });

            if (!workspace) {
                throw new GraphQLError('Workspace not found', {
                    extensions: { code: 'NOT_FOUND' }
                });
            }

            const isOwner = workspace.owner_id === user.user_id;
            const isAdmin = workspace.members.some(
                m => m.user_id === user.user_id && m.role === 'Admin'
            );

            if (!isOwner && !isAdmin && user.user_id !== user_id) {
                throw new GraphQLError('Insufficient permissions', {
                    extensions: { code: 'FORBIDDEN' }
                });
            }

            if (user_id === workspace.owner_id) {
                throw new GraphQLError('Cannot remove workspace owner', {
                    extensions: { code: 'FORBIDDEN' }
                });
            }

            await prisma.workspaceMembers.delete({
                where: {
                    workspace_id_user_id: {
                        workspace_id,
                        user_id
                    }
                }
            });

            return {
                success: true,
                message: 'Member removed successfully'
            };
        },

        updateMemberRole: async (_, { input }, { user }) => {
            const { workspace_id, user_id, role } = input;

            if (!user) {
                throw new GraphQLError('Not authenticated', {
                    extensions: { code: 'UNAUTHENTICATED' }
                });
            }

            const workspace = await prisma.workspace.findUnique({
                where: { workspace_id },
                include: {
                    members: {
                        where: { user_id: user.user_id }
                    }
                }
            });

            if (!workspace) {
                throw new GraphQLError('Workspace not found', {
                    extensions: { code: 'NOT_FOUND' }
                });
            }

            const isOwner = workspace.owner_id === user.user_id;
            const isAdmin = workspace.members.some(
                m => m.user_id === user.user_id && m.role === 'Admin'
            );

            if (!isOwner && !isAdmin) {
                throw new GraphQLError('Insufficient permissions', {
                    extensions: { code: 'FORBIDDEN' }
                });
            }

            if (user_id === workspace.owner_id) {
                throw new GraphQLError('Cannot change owner role', {
                    extensions: { code: 'FORBIDDEN' }
                });
            }

            const updatedMember = await prisma.workspaceMembers.update({
                where: {
                    workspace_id_user_id: {
                        workspace_id,
                        user_id
                    }
                },
                data: { role },
                include: {
                    user: true
                }
            });

            return updatedMember;
        }
    }
};

export default workspaceResolvers;
