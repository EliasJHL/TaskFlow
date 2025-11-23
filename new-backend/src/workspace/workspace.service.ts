import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkspaceInput, UpdateWorkspaceInput } from '../graphql/graphql';
import { Role } from '@prisma/client';

@Injectable()
export class WorkspaceService {
    constructor(private prisma: PrismaService) {}

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
        });
    }

    async findAllUserWorkspaces(user_id: string) {
        return this.prisma.workspace.findMany({
            where: {
                members: {
                    some: {
                        user_id: user_id,
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });
    }

    async findWorkspace(workspace_id: string) {
        return this.prisma.workspace.findUniqueOrThrow({
            where: { workspace_id },
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
