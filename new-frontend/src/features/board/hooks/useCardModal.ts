/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** useCardModal
*/

import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'sonner';
import {
  GetCardDetailsDocument,
  UpdateCardContentDocument,
  AddLabelToCardDocument,
  RemoveLabelFromCardDocument,
  AddAssigneeToCardDocument,
  RemoveAssigneeFromCardDocument,
} from '@/graphql/generated';

export const useCardModal = (cardId: string | null, workspaceId: string) => {
  const { data, loading } = useQuery(GetCardDetailsDocument, {
    variables: { card_id: cardId!, workspace_id: workspaceId },
    skip: !cardId || !workspaceId,
    fetchPolicy: 'network-only',
  });

  const [updateCard] = useMutation(UpdateCardContentDocument);
  const [addLabel] = useMutation(AddLabelToCardDocument);
  const [removeLabel] = useMutation(RemoveLabelFromCardDocument);
  const [addAssignee] = useMutation(AddAssigneeToCardDocument);
  const [removeAssignee] = useMutation(RemoveAssigneeFromCardDocument);

  const actions = {
    updateTitle: async (title: string) => {
      if (!cardId) return;
      await updateCard({ variables: { card_id: cardId, input: { title } } });
      toast.success('Titre mis à jour');
    },
    updateDescription: async (description: string) => {
      if (!cardId) return;
      await updateCard({ variables: { card_id: cardId, input: { description } } });
      toast.success('Description enregistrée');
    },
    toggleLabel: (labelId: string, currentLabels: any[]) => {
      if (!cardId) return;
      const isActive = currentLabels.some((l) => l.label_id === labelId);
      const mutation = isActive ? removeLabel : addLabel;
      mutation({ variables: { card_id: cardId, label_id: labelId } });
    },
    toggleMember: (userId: string, currentcard_members: any[]) => {
      if (!cardId) return;
      console.log(currentcard_members);
      console.log(userId);
      const isAssigned = currentcard_members.some((u) => u.user_id === userId);
      const mutation = isAssigned ? removeAssignee : addAssignee;
      mutation({ variables: { card_id: cardId, user_id: userId } });
    }
  };

  console.log(data);

  return {
    card: data?.card,
    loading,
    actions
  };
};