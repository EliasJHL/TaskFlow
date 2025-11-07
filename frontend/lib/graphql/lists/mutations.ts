/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** mutations
*/

import { gql } from '@apollo/client';

export const CREATE_LIST_MUTATION = gql`
    mutation CreateList($input: CreateListInput!) {
        createList(input: $input) {
            list_id
            title
            position
            color
        }
    }
`;

export const UPDATE_LIST_MUTATION = gql`
  mutation UpdateList($input: UpdateListInput!) {
    updateList(input: $input) {
      list_id
      title
      position
      color
    }
  }
`;

export const DELETE_LIST_MUTATION = gql`
  mutation DeleteList($list_id: ID!) {
    deleteList(list_id: $list_id) {
      success
      message
    }
  }
`;