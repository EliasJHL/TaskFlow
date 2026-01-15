/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** workspace.service
*/

import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkspaceInput, UpdateWorkspaceInput } from '../graphql/graphql';
import { Role } from '@prisma/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

@Injectable()
export class WorkspaceService {
    constructor(private prisma: PrismaService) {}

    /**
     * Creates a new workspace with the specified user as owner and admin member.
     *
     * @param user_id - The ID of the user who will own the workspace
     * @param input - The workspace creation input containing name, description, and optional color
     * @returns A promise that resolves to the created workspace object
     * @throws {PrismaClientKnownRequestError} When workspace creation fails due to database constraints
     * @throws {PrismaClientValidationError} When input validation fails
     *
     * @example
     * ```typescript
     * const workspace = await createWorkspace('user-123', {
     *   name: 'My Workspace',
     *   description: 'A workspace for my project',
     *   color: '#ff5733'
     * });
     */
    async createWorkspace(user_id: string, input: CreateWorkspaceInput) {
        return this.prisma.workspace.create({
            data: {
                name: input.name,
                description: input.description,
                color: input.color || '#007cefff',
                owner_id: user_id,
                members: {
                    create: {
                        user_id: user_id,
                        role: Role.Admin,
                    },
                },
            },
            include: {
                members: {
                    include: {
                        user: true,
                    },
                },
                owner: true,
            },
        });
    }

    async findAllUserWorkspaces(user_id: string) {
        const workspaces = await this.prisma.workspace.findMany({
            where: {
                members: {
                    some: {
                        user_id: user_id,
                    },
                },
            },
            include: {
                owner: true,
                pinned_by: {
                    where: { user_id: user_id },
                },
                members: {
                    where: { user_id: user_id },
                    select: { role: true },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });
        return workspaces.map((workspace) => ({
            ...workspace,
            is_pinned: workspace.pinned_by.length > 0,
            role: workspace.members[0]?.role
        }));
    }

    async findWorkspace(workspace_id: string) {
        return this.prisma.workspace.findUniqueOrThrow({
            where: { workspace_id },
            include: {
                owner: true,
            },
        });
    }

    async updateWorkspace(workspace_id: string, input: UpdateWorkspaceInput) {
        return this.prisma.workspace.update({
            where: { workspace_id },
            data: {
                name: input.name ?? undefined,
                description: input.description ?? undefined,
                color: input.color ?? undefined,
            },
        });
    }

    async addMemberToWorkspace(
        workspace_id: string,
        user_email: string,
        role: Role,
    ) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { email: user_email },
        });

        const res = await this.prisma.workspaceMembers.create({
            data: {
                workspace_id,
                user_id: user.user_id,
                role,
            },
            include: {
                user: true
            }
        });

        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [user_email],
            subject: 'TaskFlow Workspace Invitation',
            html: `<p>Welcome ${user_email} to TaskFlow!</p>`,
        });
        return res;
    }

    async delete(workspaceId: string, userId: string) {
        const workspace = await this.findWorkspace(workspaceId);

        if (workspace.owner_id !== userId) {
            throw new ForbiddenException(
                'Only the workspace owner can delete it',
            );
        }

        await this.prisma.workspace.delete({
            where: { workspace_id: workspaceId },
        });

        return { success: true, message: 'Workspace deleted' };
    }
}
