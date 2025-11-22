/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** query
 */

import { gql } from "@apollo/client";

export const LISTS_QUERY = gql`
  query GetLists($board_id: ID!) {
    lists(board_id: $board_id) {
      list_id
      title
      position
      color
      board_id
      cards {
        card_id
        title
        description
        position
        due_date
      }
    }
  }
`;

export const LIST_QUERY = gql`
  query GetList($list_id: ID!) {
    list(list_id: $list_id) {
      list_id
      title
      position
      color
      board_id
      cards {
        card_id
        title
        description
        position
        due_date
      }
    }
  }
`;
