/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** useBoardActions
 */

import { useMutation } from '@apollo/client';
import {
  CreateCardDocument,
  CreateListDocument,
  GetBoardFullDocument,
  CreateLabelDocument,
} from '@/graphql/generated';
import { toast } from 'sonner';

export const useCreateCard = (boardId: string) => {
  const [createCard, { loading }] = useMutation(CreateCardDocument, {
    refetchQueries: [
      { query: GetBoardFullDocument, variables: { board_id: boardId } },
    ],
    onCompleted: () => toast.success('Carte ajoutée'),
  });

  return { createCard, isLoading: loading };
};

export const useCreateList = (boardId: string) => {
  const [createList, { loading }] = useMutation(CreateListDocument, {
    refetchQueries: [
      { query: GetBoardFullDocument, variables: { board_id: boardId } },
    ],
    onCompleted: () => toast.success('Liste créée !'),
  });

  return { createList, isLoading: loading };
};

export const useCreateLabel = (boardId: string) => {
  const [createLabel, { loading }] = useMutation(CreateLabelDocument, {
    refetchQueries: [
      { query: GetBoardFullDocument, variables: { board_id: boardId } },
    ],
    onCompleted: () => toast.success('Label créé'),
  });

  return { createLabel, isLoading: loading };
};
