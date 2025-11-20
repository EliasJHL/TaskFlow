/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** query
 */

import { gql } from "@apollo/client";

export const LABELS_QUERY = gql`
  query Labels {
    labels {
      id
      name
      color
    }
  }
`;
