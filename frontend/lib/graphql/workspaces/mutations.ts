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
                owner_id
            }
        }
    }
`;

export const UPDATE_WORKSPACE_MUTATION = gql`
  mutation UpdateWorkspace($workspace_id: ID!, $input: UpdateWorkspaceInput!) {
    updateWorkspace(workspace_id: $workspace_id, input: $input) {
      workspace_id
      name
      description
      color
      is_pinned
    }
  }
`;

export const DELETE_WORKSPACE_MUTATION = gql`
  mutation DeleteWorkspace($workspace_id: ID!) {
    deleteWorkspace(workspace_id: $workspace_id) {
      success
      message
    }
  }
`;

export const PIN_WORKSPACE_MUTATION = gql`
  mutation PinWorkspace($workspace_id: ID!) {
    pinWorkspace(workspace_id: $workspace_id) {
      workspace {
        workspace_id
        is_pinned
      }
    }
  }
`;

export const UNPIN_WORKSPACE_MUTATION = gql`
  mutation UnpinWorkspace($workspace_id: ID!) {
    unpinWorkspace(workspace_id: $workspace_id) {
      workspace {
        workspace_id
        is_pinned
      }
    }
  }
`;