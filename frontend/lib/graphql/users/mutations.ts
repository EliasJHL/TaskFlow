/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** mutations
*/

import { gql } from '@apollo/client';

export const ADD_WORKSPACE_MEMBER_MUTATION = gql`
  mutation AddWorkspaceMember($input: AddWorkspaceMemberInput!) {
    addWorkspaceMember(input: $input) {
      workspace_member_id
      user {
        user_id
        username
        email
        picture
      }
      role
      joined_at
    }
  }
`;

export const REMOVE_WORKSPACE_MEMBER_MUTATION = gql`
  mutation RemoveWorkspaceMember($workspace_id: ID!, $user_id: ID!) {
    removeWorkspaceMember(workspace_id: $workspace_id, user_id: $user_id) {
      success
      message
    }
  }
`;

export const UPDATE_MEMBER_ROLE_MUTATION = gql`
  mutation UpdateMemberRole($input: UpdateMemberRoleInput!) {
    updateMemberRole(input: $input) {
      workspace_member_id
      user {
        user_id
        username
        email
      }
      role
    }
  }
`;

export const WORKSPACE_MEMBERS_QUERY = gql`
  query WorkspaceMembers($workspace_id: ID!) {
    workspaceMembers(workspace_id: $workspace_id) {
      workspace_member_id
      user {
        user_id
        username
        email
        picture
      }
      role
      joined_at
    }
  }
`;

