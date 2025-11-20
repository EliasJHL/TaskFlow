import { gql } from "@apollo/client";

export const WORKSPACES_QUERY = gql`
  query Workspaces {
    workspaces {
      workspace_id
      name
      description
      owner_id
      owner {
        user_id
        username
        email
        picture
      }
      color
      is_pinned
    }
  }
`;

export const WORKSPACE_QUERY = gql`
  query Workspace($workspace_id: ID!) {
    workspace(workspace_id: $workspace_id) {
      workspace_id
      name
      description
      owner_id
      owner {
        user_id
        username
        email
        picture
      }
      color
      is_pinned
    }
  }
`;
