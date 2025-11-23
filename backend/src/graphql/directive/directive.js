/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** directive
*/

import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';
import { Role } from '@prisma/client';
import prisma from '../../prisma/client.js';

const ROLE_HIERARCHY = [Role.Viewer, Role.Member, Role.Admin];

export function authDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (authDirective) {
        const requiredRole = authDirective['role']; 
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
            
          if (!context.user) {
            throw new Error('Not authenticated');
          }

          const workspaceId = args.workspace_id; 
          if (!workspaceId) {
             throw new Error("Security: workspace_id missing for auth check");
          }

          const userAccess = await prisma.workspaceMembers.findUnique({
              where: { workspace_id_user_id: { workspace_id: workspaceId, user_id: context.user.user_id } },
              select: { role: true }
          });

          if (!userAccess) throw new Error('User is not a member of this workspace');

          const userRank = ROLE_HIERARCHY.indexOf(userAccess.role);
          const requiredRank = ROLE_HIERARCHY.indexOf(requiredRole);

          if (userRank < requiredRank) {
            throw new Error(`Insufficient permissions. Required: ${requiredRole}`);
          }

          return resolve(source, args, context, info);
        };
        return fieldConfig;
      }
    },
  });
}