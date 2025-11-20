/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** mutations
 */

import { gql } from "@apollo/client";

export const CREATE_BOARD_MUTATION = gql`
  mutation CreateBoard($input: CreateBoardInput!) {
    createBoard(input: $input) {
      board {
        board_id
        title
        description
        color
        workspace_id
      }
    }
  }
`;

export const UPDATE_BOARD_MUTATION = gql`
  mutation UpdateBoard($input: UpdateBoardInput!) {
    updateBoard(input: $input) {
      board {
        board_id
        name
        description
        color
        position
      }
    }
  }
`;

export const DELETE_BOARD_MUTATION = gql`
  mutation DeleteBoard($board_id: ID!) {
    deleteBoard(board_id: $board_id) {
      success
      message
    }
  }
`;

export const REORDER_BOARDS_MUTATION = gql`
  mutation ReorderBoards($workspace_id: ID!, $board_ids: [ID!]!) {
    reorderBoards(workspace_id: $workspace_id, board_ids: $board_ids) {
      success
      message
    }
  }
`;
