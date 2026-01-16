/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** BoardPage
 */

import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { createPortal } from 'react-dom';
import {
  DndContext,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Loader2, ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { getAvatarUrl } from '@/components/shared/getAvatarUrl';

import { BoardList } from '../components//BoardList';
import { KanbanCard } from '../components//KanbanCard';
import { CreateListForm } from '../components//CreateListForm';
import { CreateLabelDialog } from '../components/CreateLabelDialog';
import { CardDialog } from '../components/CardDialog';
import { BoardType, GetBoardFullDocument } from '@/graphql/generated';
import { useBoardDragAndDrop } from '../hooks/useBoardDragAndDrop';
import { useState } from 'react';

import { BoardRealtime } from '@/components/realtime/BoardRealtime';
import { BoardWhiteboard } from '../components/BoardWhiteboard';

export const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const { data, loading, error } = useQuery(GetBoardFullDocument, {
    variables: { board_id: boardId! },
    skip: !boardId,
    fetchPolicy: 'cache-first',
  });

  const board = data?.board;

  const dnd = useBoardDragAndDrop(board?.lists || [], boardId!);
  const isWhiteboard = board?.type === BoardType.Whiteboard;

  if (loading && !board)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (error || !board)
    return <div className="p-10 text-red-500">Erreur de chargement</div>;

  return (
    <div className="flex h-screen flex-col bg-background relative overflow-hidden">
      {boardId && <BoardRealtime boardId={board.board_id} />}
      {!isWhiteboard && (
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(white,transparent)]',
            'opacity-30',
          )}
        />
      )}

      {/* HEADER */}
      <header className="z-10 flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-background/60 px-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link to={`/app/workspace/${board.workspace_id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-5" />
          <div className="flex items-center gap-3">
            <div
              className="h-6 w-6 rounded shadow-sm"
              style={{ backgroundColor: board.color }}
            ></div>
            <h1 className="text-sm font-bold text-foreground">{board.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-2">
            {board.members?.slice(0, 4).map((m: any, i: number) => (
              <Avatar
                key={i}
                className="h-7 w-7 border-2 border-background cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={m.user.picture || getAvatarUrl(m.user.username)}
                  alt={m.user.username}
                  className="h-full w-full object-cover"
                />
              </Avatar>
            ))}
          </div>
          <CreateLabelDialog boardId={board.board_id} />
        </div>
      </header>

      {isWhiteboard ? (
        <main className="relative z-0 flex-1 overflow-hidden">
          <BoardWhiteboard
            boardId={board.board_id}
            initialData={board.whiteboard_data}
          />
        </main>
      ) : (
        <>
          <DndContext
            sensors={dnd.sensors}
            collisionDetection={dnd.collisionDetection}
            onDragStart={dnd.onDragStart}
            onDragOver={dnd.onDragOver}
            onDragEnd={dnd.onDragEnd}
          >
            <main className="relative z-0 flex-1 overflow-x-auto overflow-y-hidden">
              <div className="flex h-full items-start gap-4 p-6">
                <SortableContext
                  items={dnd.listIds}
                  strategy={horizontalListSortingStrategy}
                >
                  {dnd.lists.map((list) => (
                    <BoardList
                      key={list.list_id}
                      list={list}
                      boardId={board.board_id}
                      onCardClick={setSelectedCardId}
                    />
                  ))}
                </SortableContext>
                <CreateListForm boardId={board.board_id} />
              </div>
            </main>

            {createPortal(
              <DragOverlay
                dropAnimation={{
                  sideEffects: defaultDropAnimationSideEffects({
                    styles: { active: { opacity: '0.5' } },
                  }),
                }}
              >
                {dnd.activeColumn && (
                  <BoardList list={dnd.activeColumn} boardId={board.board_id} />
                )}
                {dnd.activeCard && <KanbanCard {...dnd.activeCard} />}
              </DragOverlay>,
              document.body,
            )}
          </DndContext>

          <CardDialog
            isOpen={!!selectedCardId}
            onClose={() => setSelectedCardId(null)}
            cardId={selectedCardId}
            boardLabels={board.labels}
            boardMembers={board.members}
            workspaceId={board.workspace_id}
          />
        </>
      )}
    </div>
  );
};
