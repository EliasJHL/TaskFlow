/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** mutations
*/

import { gql } from "@apollo/client";

export const CREATE_LABEL_MUTATION = gql`
  mutation CreateLabel($input: CreateLabelInput!) {
    createLabel(input: $input) {
      label_id
      name
      color
      workspace_id
    }
  }
`;