/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** workspace.service
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function checkWorkspaceMembership(user_id, workspace_id) {
  const workspace = await prisma.workspace.findFirst({
    where: {
      workspace_id,
      OR: [{ owner_id: user_id }, { members: { some: { user_id } } }],
    },
  });
  if (!workspace) {
    throw new Error("Access denied: Not a member of the workspace");
  }
  return workspace;
}

export async function checkBoardMembership(board_id, user_id) {
  const board = await prisma.board.findFirst({
    where: {
      board_id,
      workspace: {
        OR: [{ owner_id: user_id }, { members: { some: { user_id } } }],
      },
    },
  });
  if (!board) {
    throw new Error("Access denied: Not a member of the board's workspace");
  }
  return board;
}
