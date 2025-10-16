/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** query
*/

import { gql } from '@apollo/client';

export const WORKSPACES_QUERY = gql`
  query Workspaces {
    workspaces {
      workspace_id
      name
      description
      owner_id
      color
      is_pinned
      members {
        workspace_id
        role
        user {
          user_id
          username
          email
          picture
        }
      }
    }
  }
`;

export const WORKSPACE_QUERY = gql`
  query GetWorkspace($workspace_id: ID!) {
    workspace(workspace_id: $workspace_id) {
      workspace_id
      name
      description
      owner_id
      color
      is_pinned
      members {
        workspace_id
        role
        user {
          user_id
          username
          email
          picture
        }
      }
    }
  }
`
