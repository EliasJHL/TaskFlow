import { gql } from "@apollo/client";

export const ADD_WORKSPACE_MEMBER_MUTATION = gql`
  mutation AddWorkspaceMember($input: AddWorkspaceMemberInput!) {
    addWorkspaceMember(input: $input) {
      workspace_id
      user {
        user_id
        username
        email
        picture
      }
      role
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
      workspace_id
      user_id
      role
      user {
        user_id
        username
        email
        picture
      }
    }
  }
`;

export const WORKSPACE_MEMBERS_QUERY = gql`
  query WorkspaceMembers($workspace_id: ID!) {
    workspaceMembers(workspace_id: $workspace_id) {
      workspace_id
      user_id
      role
      user {
        user_id
        username
        email
        picture
      }
    }
  }
`;
