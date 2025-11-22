"use client";

import { useStore } from "@/lib/store";
import { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BoardColumn } from "./board-column";
import { CreateColumnButton } from "./create-column-button";
import { TimelineView } from "./timeline-view";
import { CalendarView } from "./calendar-view";
import { RoadmapView } from "./roadmap-view";
import { LayoutGrid, Baseline as Timeline, Calendar, Map } from "lucide-react";

interface BoardViewProps {
  boardId: string;
}

export function BoardView({ boardId }: BoardViewProps) {
  const lists = useStore((state) => state.lists);
  const getLists = useStore((state) => state.getLists);
  const loadingLists = useStore((state) => state.loadingLists);
  const [currentView, setCurrentView] = useState<
    "board" | "timeline" | "calendar" | "roadmap"
  >("board");

  const hasLoadedRef = useRef<string | null>(null);

  useEffect(() => {
    if (hasLoadedRef.current === boardId) {
      return;
    }
    hasLoadedRef.current = boardId;
    getLists(boardId);
  }, [boardId]);

  const boardColumns = lists;

  const handleDragEnd = (result: DropResult) => {
    // TODO: Implement drag & drop
    return;
  };

  if (loadingLists && lists.length === 0) {
    return (
      <main className="flex-1 overflow-hidden p-6">
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-48"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-64"></div>
          </div>
          <p className="text-muted-foreground mt-4">Loading lists...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-hidden">
      <Tabs
        value={currentView}
        onValueChange={(value) => setCurrentView(value as any)}
        className="h-full flex flex-col"
      >
        <div className="border-b px-6 py-4">
          <TabsList className="grid w-fit grid-cols-4">
            <TabsTrigger value="board" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              Board
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <Timeline className="h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="gap-2">
              <Map className="h-4 w-4" />
              Roadmap
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="board" className="h-full m-0 p-6 overflow-x-auto">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable
                droppableId="board"
                type="column"
                direction="horizontal"
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex gap-6 min-h-full pb-6"
                  >
                    {boardColumns.length === 0 ? (
                      <div className="flex flex-col items-center justify-center w-full min-h-[400px] text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                          <LayoutGrid className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          No lists yet
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          Create your first list to start organizing tasks
                        </p>
                        <CreateColumnButton boardId={boardId} />
                      </div>
                    ) : (
                      <>
                        {boardColumns
                          .sort((a, b) => a.position - b.position)
                          .map((column, index) => (
                            <BoardColumn
                              key={column.listId}
                              column={column}
                              index={index}
                            />
                          ))}
                        {provided.placeholder}
                        <CreateColumnButton boardId={boardId} />
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </TabsContent>

          <TabsContent
            value="timeline"
            className="h-full m-0 p-6 overflow-y-auto"
          >
            <TimelineView boardId={boardId} />
          </TabsContent>

          <TabsContent
            value="calendar"
            className="h-full m-0 p-6 overflow-y-auto"
          >
            <CalendarView boardId={boardId} />
          </TabsContent>

          <TabsContent
            value="roadmap"
            className="h-full m-0 p-6 overflow-y-auto"
          >
            <RoadmapView boardId={boardId} />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
