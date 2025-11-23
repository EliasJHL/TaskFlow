/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** workspace.service
 */

import { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';
const prisma = new PrismaClient();

export async function checkWorkspaceMembership(user_id, workspace_id) {
    return await prisma.workspace.findFirstOrThrow({
        where: {
            workspace_id,
            OR: [{ owner_id: user_id }, { members: { some: { user_id } } }]
        }
    });
}

export async function hasUserRightsInWorkspace(user_id, workspace_id, role = 'Member') {
    const userAccess = await prisma.workspaceMembers.findFirstOrThrow({
        where: {
            workspace_id,
            user_id
        },
        select: { role }
    });

    if (userAccess.role !== Role.Admin && userAccess.role !== Role.Owner) {
        throw new Error('Insufficient permissions in the workspace');
    }
}
