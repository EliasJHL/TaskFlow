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