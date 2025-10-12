/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** mutations
*/

import { gql } from '@apollo/client';

export const CREATE_WORKSPACE_MUTATION = gql`
    mutation CreateWorkspace($input: CreateWorkspaceInput!) {
        createWorkspace(input: $input) {
            workspace {
                workspace_id
                name
                description
                color
            }
        }
    }
`;
