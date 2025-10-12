/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** query
*/

import { gql } from '@apollo/client';

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
            labels {
                label_id
                name
                color
            }
        }
    }
`;

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