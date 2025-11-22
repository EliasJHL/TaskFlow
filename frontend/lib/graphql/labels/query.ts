/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** query
 */

import { gql } from "@apollo/client";

export const LABELS_QUERY = gql`
  query Labels($workspace_id: ID!) {
    labels(workspace_id: $workspace_id) {
      label_id
      name
      color
      workspace_id
    }
  }
`;
