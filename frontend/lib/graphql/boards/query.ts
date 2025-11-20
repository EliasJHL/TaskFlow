/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** query
 */

import { gql } from "@apollo/client";

export const BOARDS_QUERY = gql`
  query Boards($workspaceId: ID!) {
    boards(workspace_id: $workspaceId) {
      board_id
      title
      description
      color
      workspace_id
      lists {
        list_id
        title
        position
        color
      }
    }
  }
`;

export const BOARD_QUERY = gql`
  query GetBoard($board_id: ID!) {
    board(board_id: $board_id) {
      board_id
      title
      description
      color
      workspace_id
      lists {
        list_id
        title
        position
        color
        cards {
          card_id
          title
          description
          position
        }
      }
      labels {
        label_id
        name
        color
      }
    }
  }
`;
