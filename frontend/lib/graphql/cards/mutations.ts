/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** mutations
*/

import { gql } from "@apollo/client";

export const CARDS_QUERY = gql`
  query Cards($board_id: ID!) {
    cards(board_id: $board_id) {
      card_id
      title
      description
      position
      list_id
      due_date
    }
  }
`;

export const CARD_QUERY = gql`
  query Card($card_id: ID!, $board_id: ID!) {
    card(card_id: $card_id, board_id: $board_id) {
      card_id
      title
      description
      position
      list_id
      due_date
    }
  }
`;