/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** Queries & Mutations for Cards
 */

import { gql } from "@apollo/client";

export const CREATE_CARD_MUTATION = gql`
  mutation CreateCard($input: CreateCardInput!) {
    createCard(input: $input) {
      card_id
      title
      description
      position
      list_id
      due_date
    }
  }
`;

export const UPDATE_CARD_MUTATION = gql`
  mutation UpdateCard(
    $card_id: ID!
    $board_id: ID!
    $title: String
    $description: String
    $list_id: ID
    $due_date: DateTime
  ) {
    updateCard(
      card_id: $card_id
      board_id: $board_id
      title: $title
      description: $description
      list_id: $list_id
      due_date: $due_date
    ) {
      card_id
      title
      description
      position
      list_id
      due_date
    }
  }
`;

export const DELETE_CARD_MUTATION = gql`
  mutation DeleteCard($card_id: ID!, $board_id: ID!) {
    deleteCard(card_id: $card_id, board_id: $board_id) {
      card_id
      title
      description
      position
      list_id
      due_date
    }
  }
`;
