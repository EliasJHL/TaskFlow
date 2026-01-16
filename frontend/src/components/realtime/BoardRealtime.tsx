/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** BoardRealtime
 */

import { useApolloClient, useSubscription } from '@apollo/client';
import { GetBoardFullDocument } from '@/graphql/generated';
import { BoardEventDocument } from '@/graphql/generated';

export function BoardRealtime({ boardId }: { boardId: string }) {
  const apollo = useApolloClient();

  useSubscription(BoardEventDocument, {
    variables: { board_id: boardId },
    onError: (err) => console.log('[SUB] error', err),
    onData: ({ data }) => {
      const ev = data.data?.boardEvent;
      if (!ev) return;

      apollo.cache.updateQuery(
        { query: GetBoardFullDocument, variables: { board_id: boardId } },
        (prev: any) => {
          if (!prev?.board) return prev;

          const board = prev.board;

          // ===== LABELS =====
          if (ev.__typename === 'LabelCreatedEvent') {
            const exists = (board.labels ?? []).some(
              (l: any) => l.label_id === ev.label.label_id,
            );
            if (exists) return prev;

            return {
              ...prev,
              board: { ...board, labels: [...(board.labels ?? []), ev.label] },
            };
          }

          if (ev.__typename === 'LabelDeletedEvent') {
            return {
              ...prev,
              board: {
                ...board,
                labels: (board.labels ?? []).filter(
                  (l: any) => l.label_id !== ev.label_id,
                ),
              },
            };
          }

          // ===== LISTS =====
          if (ev.__typename === 'ListCreatedEvent') {
            const exists = (board.lists ?? []).some(
              (l: any) => l.list_id === ev.list.list_id,
            );
            if (exists) return prev;

            const newList = {
              ...ev.list,
              cards: [],
            };

            const lists = [...(board.lists ?? []), newList].sort(
              (a: any, b: any) => a.position - b.position,
            );
            return { ...prev, board: { ...board, lists } };
          }

          if (ev.__typename === 'ListDeletedEvent') {
            return {
              ...prev,
              board: {
                ...board,
                lists: (board.lists ?? []).filter(
                  (l: any) => l.list_id !== ev.list_id,
                ),
              },
            };
          }

          if (ev.__typename === 'ListMovedEvent') {
            const lists = (board.lists ?? [])
              .map((l: any) =>
                l.list_id === ev.list_id ? { ...l, position: ev.position } : l,
              )
              .sort((a: any, b: any) => a.position - b.position);

            return { ...prev, board: { ...board, lists } };
          }

          // ===== CARDS =====
          if (ev.__typename === 'CardCreatedEvent') {
            const lists = (board.lists ?? []).map((list: any) => {
              if (list.list_id !== ev.card.list_id) return list;

              const exists = (list.cards ?? []).some(
                (c: any) => c.card_id === ev.card.card_id,
              );
              if (exists) return list;

              const cards = [...(list.cards ?? []), ev.card].sort(
                (a: any, b: any) => a.position - b.position,
              );
              return { ...list, cards };
            });

            return { ...prev, board: { ...board, lists } };
          }

          if (ev.__typename === 'CardDeletedEvent') {
            const lists = (board.lists ?? []).map((list: any) => {
              if (list.list_id !== ev.list_id) return list;
              return {
                ...list,
                cards: (list.cards ?? []).filter(
                  (c: any) => c.card_id !== ev.card_id,
                ),
              };
            });

            return { ...prev, board: { ...board, lists } };
          }

          if (ev.__typename === 'CardMovedEvent') {
            const fromId = ev.from_list_id;
            const toId = ev.to_list_id;

            let movedCard: any = null;

            let lists = (board.lists ?? []).map((list: any) => {
              if (list.list_id !== fromId) return list;

              const cards = (list.cards ?? []).filter((c: any) => {
                if (c.card_id === ev.card_id) {
                  movedCard = c;
                  return false;
                }
                return true;
              });

              return { ...list, cards };
            });

            if (!movedCard) return prev;

            movedCard = { ...movedCard, list_id: toId, position: ev.position };

            lists = lists.map((list: any) => {
              if (list.list_id !== toId) return list;

              const cards = [...(list.cards ?? []), movedCard].sort(
                (a: any, b: any) => a.position - b.position,
              );
              return { ...list, cards };
            });

            return { ...prev, board: { ...board, lists } };
          }

          if (ev.__typename === 'LabelAddedToCardEvent') {
            const label = (board.labels ?? []).find(
              (l: any) => l.label_id === ev.label_id,
            );
            if (!label) return prev;

            const lists = (board.lists ?? []).map((list: any) => {
              const cards = (list.cards ?? []).map((card: any) => {
                if (card.card_id !== ev.card_id) return card;

                const exists = (card.labels ?? []).some(
                  (l: any) => l.label_id === ev.label_id,
                );
                if (exists) return card;

                return {
                  ...card,
                  labels: [...(card.labels ?? []), label],
                };
              });

              return { ...list, cards };
            });

            return { ...prev, board: { ...board, lists } };
          }

          if (ev.__typename === 'LabelRemovedFromCardEvent') {
            const lists = (board.lists ?? []).map((list: any) => {
              const cards = (list.cards ?? []).map((card: any) => {
                if (card.card_id !== ev.card_id) return card;

                const labels = (card.labels ?? []).filter(
                  (l: any) => l.label_id !== ev.label_id,
                );

                return { ...card, labels };
              });

              return { ...list, cards };
            });

            return { ...prev, board: { ...board, lists } };
          }

          if (ev.__typename === 'AssigneeAddedToCardEvent') {
            const lists = (board.lists ?? []).map((list: any) => {
              const cards = (list.cards ?? []).map((card: any) => {
                if (card.card_id !== ev.card_id) return card;

                const exists = (card.assignees ?? []).some(
                  (u: any) => u.user_id === ev.user_id,
                );
                if (exists) return card;

                return {
                  ...card,
                  assignees: [...(card.assignees ?? []), { user_id: ev.user_id }],
                };
              });

              return { ...list, cards };
            });

            return { ...prev, board: { ...board, lists } };
          }

          if (ev.__typename === 'AssigneeRemovedFromCardEvent') {
            const lists = (board.lists ?? []).map((list: any) => {
              const cards = (list.cards ?? []).map((card: any) => {
                if (card.card_id !== ev.card_id) return card;

                const assignees = (card.assignees ?? []).filter(
                  (u: any) => u.user_id !== ev.user_id,
                );

                return { ...card, assignees };
              });

              return { ...list, cards };
            });

            return { ...prev, board: { ...board, lists } };
          }

          if (ev.__typename === 'WhiteboardUpdatedEvent') {
            if (board.whiteboard_data === ev.whiteboard_data) return prev;
            return {
              ...prev,
              board: { ...board, whiteboard_data: ev.whiteboard_data },
            };
          }

          return prev;
        },
      );
    },
  });

  return null;
}
