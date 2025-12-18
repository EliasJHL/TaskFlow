import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { createPortal } from "react-dom";
import { 
  DndContext, 
  DragOverlay, 
  defaultDropAnimationSideEffects, 
  type DragStartEvent, 
  type DragOverEvent, 
  type DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  closestCorners
} from "@dnd-kit/core";
import { 
  SortableContext, 
  horizontalListSortingStrategy, 
  arrayMove 
} from "@dnd-kit/sortable";

import { ChevronLeft, Star, Users, MoreHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

import { BoardList } from "../components/BoardList";
import { KanbanCard } from "../components/KanbanCard";
import { CreateListForm } from "../components/CreateListForm";
import { CreateLabelDialog } from "../components/CreateLabelDialog";
import { CardDialog } from "../components/CardDialog";

import { 
  GetBoardFullDocument, 
  MoveCardDocument, 
  MoveListDocument 
} from "@/graphql/generated";

export const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  
  const { data, loading, error } = useQuery(GetBoardFullDocument, {
    variables: { board_id: boardId! },
    fetchPolicy: "network-only"
  });

  const [moveCard] = useMutation(MoveCardDocument);
  const [moveList] = useMutation(MoveListDocument);

  const [lists, setLists] = useState<any[]>([]);
  const [activeColumn, setActiveColumn] = useState<any | null>(null);
  const [activeCard, setActiveCard] = useState<any | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    if (data?.board?.lists) {
      setLists(JSON.parse(JSON.stringify(data.board.lists)));
    }
  }, [data]);

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
          const activeCards = lists[activeListIndex].cards;
          const overCards = lists[overListIndex].cards;
          const activeCardIndex = activeCards.findIndex((c: any) => c.card_id === activeId);
          const overCardIndex = overCards.findIndex((c: any) => c.card_id === overId);

          let newIndex;
          const isBelowOverItem = active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height;
          const modifier = isBelowOverItem ? 1 : 0;
          newIndex = overCardIndex >= 0 ? overCardIndex + modifier : overCards.length + 1;

          const newLists = [...lists];
          const [movedCard] = newLists[activeListIndex].cards.splice(activeCardIndex, 1);
          movedCard.list_id = newLists[overListIndex].list_id;
          newLists[overListIndex].cards.splice(newIndex, 0, movedCard);
          
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
          const newLists = [...lists];
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

  if (loading && !data) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (error || !data?.board) return <div className="p-10 text-red-500">Erreur de chargement</div>;

  const board = data.board;

  return (
    <div className="flex h-screen flex-col bg-background relative overflow-hidden">
      <DotPattern className={cn("[mask-image:radial-gradient(white,transparent)]", "opacity-30")} />

      <header className="z-10 flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-background/60 px-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
            <Link to={`/app/workspace/${board.workspace_id}`}>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>
            <Separator orientation="vertical" className="h-5" />
            <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded bg-primary shadow-sm" style={{ backgroundColor: board.color }}></div>
                <h1 className="text-sm font-bold text-foreground">{board.title}</h1>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-yellow-400">
                    <Star className="h-3 w-3" />
                </Button>
            </div>
        </div>

        <div className="flex items-center gap-3">
             <div className="flex -space-x-2 mr-2">
                {board.members?.slice(0,4).map((m: any, i: number) => (
                     <Avatar key={i} className="h-7 w-7 border-2 border-background cursor-pointer hover:z-10 hover:scale-105 transition-transform">
                        <AvatarFallback className="text-[10px] bg-zinc-800 text-zinc-300">
                            {m.user.username.slice(0,2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                ))}
             </div>
             <Separator orientation="vertical" className="h-5" />
             
             <CreateLabelDialog boardId={board.board_id} />
             
             <Button variant="secondary" size="sm" className="h-7 text-xs gap-2 bg-zinc-800 text-white hover:bg-zinc-700">
                <Users className="h-3 w-3" /> Partager
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </div>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <main className="relative z-0 flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex h-full items-start gap-4 p-6">
            
            <SortableContext items={listIds} strategy={horizontalListSortingStrategy}>
              {lists.map((list) => (
                <BoardList 
                    key={list.list_id} 
                    list={list} 
                    boardId={board.board_id} 
                    onCardClick={(cardId) => setSelectedCardId(cardId)} 
                    onCardCreated={(cardId) => setSelectedCardId(cardId)}
                />
              ))}
            </SortableContext>

            <CreateListForm boardId={board.board_id} />

          </div>
        </main>

        {/* GHOST OVERLAY */}
        {createPortal(
          <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }) }}>
            {activeColumn && (
                 <BoardList 
                    list={activeColumn} 
                    boardId={board.board_id} 
                 />
            )}
            {activeCard && (
                 <KanbanCard 
                    title={activeCard.title} 
                    labels={activeCard.labels} 
                    dueDate={activeCard.due_date}
                    assignees={activeCard.assignees}
                 />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      {/* --- 4. LA MODALE DE CARTE --- */}
      <CardDialog 
          isOpen={!!selectedCardId} 
          onClose={() => setSelectedCardId(null)} 
          cardId={selectedCardId}
          boardLabels={board.labels} 
          boardMembers={board.members}
       />

    </div>
  );
};