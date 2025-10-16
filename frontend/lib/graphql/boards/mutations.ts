/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** mutations
*/

import { gql } from '@apollo/client';

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