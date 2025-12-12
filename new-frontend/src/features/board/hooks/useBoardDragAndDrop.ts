/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** useBoardDragAndDrop
*/

import { useState, useEffect, useMemo } from "react";
import { 
  useSensor, useSensors, PointerSensor, 
  type DragStartEvent, type DragOverEvent, type DragEndEvent, 
  closestCorners 
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMutation } from "@apollo/client";
import { MoveCardDocument, MoveListDocument } from "@/graphql/generated";

export const useBoardDragAndDrop = (initialLists: any[], boardId: string) => {
  const [lists, setLists] = useState<any[]>([]);
  const [activeColumn, setActiveColumn] = useState<any | null>(null);
  const [activeCard, setActiveCard] = useState<any | null>(null);

  const [moveCard] = useMutation(MoveCardDocument);
  const [moveList] = useMutation(MoveListDocument);

  useEffect(() => {
    if (initialLists) {
      setLists(JSON.parse(JSON.stringify(initialLists)));
    }
  }, [initialLists]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const listIds = useMemo(() => lists.map((l) => l.list_id), [lists]);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "List") {
      setActiveColumn(event.active.data.current.list);
      return;
    }
    if (event.active.data.current?.type === "Card") {
      setActiveCard(event.active.data.current.card);
      return;
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveACard = active.data.current?.type === "Card";
    const isOverACard = over.data.current?.type === "Card";
    const isOverAList = over.data.current?.type === "List";

    if (!isActiveACard) return;

    if (isActiveACard && isOverACard) {
      setLists((lists) => {
        const activeListIndex = lists.findIndex((l) => l.cards.some((c: any) => c.card_id === activeId));
        const overListIndex = lists.findIndex((l) => l.cards.some((c: any) => c.card_id === overId));

        if (lists[activeListIndex].list_id !== lists[overListIndex].list_id) {
          const newLists = JSON.parse(JSON.stringify(lists));
          const activeCards = newLists[activeListIndex].cards;
          const overCards = newLists[overListIndex].cards;
          
          const activeCardIndex = activeCards.findIndex((c: any) => c.card_id === activeId);
          const overCardIndex = overCards.findIndex((c: any) => c.card_id === overId);

          let newIndex;
          const isBelowOverItem = active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height;
          const modifier = isBelowOverItem ? 1 : 0;
          newIndex = overCardIndex >= 0 ? overCardIndex + modifier : overCards.length + 1;

          const [movedCard] = activeCards.splice(activeCardIndex, 1);
          movedCard.list_id = newLists[overListIndex].list_id;
          overCards.splice(newIndex, 0, movedCard);
          
          return newLists;
        }
        return lists;
      });
    }

    if (isActiveACard && isOverAList) {
      setLists((lists) => {
        const activeListIndex = lists.findIndex((l) => l.cards.some((c: any) => c.card_id === activeId));
        const overListIndex = lists.findIndex((l) => l.list_id === overId);

        if (activeListIndex !== overListIndex) {
          const newLists = JSON.parse(JSON.stringify(lists));
          const activeCardIndex = newLists[activeListIndex].cards.findIndex((c: any) => c.card_id === activeId);
          const [movedCard] = newLists[activeListIndex].cards.splice(activeCardIndex, 1);
          
          movedCard.list_id = newLists[overListIndex].list_id;
          newLists[overListIndex].cards.push(movedCard);
          
          return newLists;
        }
        return lists;
      });
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveCard(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (active.data.current?.type === "List") {
      if (activeId !== overId) {
        const oldIndex = lists.findIndex((l) => l.list_id === activeId);
        const newIndex = lists.findIndex((l) => l.list_id === overId);
        
        const newLists = arrayMove(lists, oldIndex, newIndex);
        setLists(newLists);

        moveList({
          variables: { list_id: String(activeId), new_position: newIndex + 1 }
        });
      }
      return;
    }

    if (active.data.current?.type === "Card") {
       const activeListIndex = lists.findIndex((l) => l.cards.some((c: any) => c.card_id === activeId));
       if (activeListIndex !== -1) {
         const cards = lists[activeListIndex].cards;
         const cardIndex = cards.findIndex((c: any) => c.card_id === activeId);
         
         moveCard({
            variables: { 
                card_id: String(activeId), 
                list_id: lists[activeListIndex].list_id, 
                new_position: cardIndex + 1 
            }
         });
       }
    }
  };

  return {
    lists,
    activeColumn,
    activeCard,
    listIds,
    sensors,
    onDragStart,
    onDragOver,
    onDragEnd,
    collisionDetection: closestCorners
  };
};