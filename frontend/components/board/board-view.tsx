"use client"

import type { Board } from "@/lib/store"
import { useStore } from "@/lib/store"
import { useState } from "react"
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BoardColumn } from "./board-column"
import { CreateColumnButton } from "./create-column-button"
import { TimelineView } from "./timeline-view"
import { CalendarView } from "./calendar-view"
import { RoadmapView } from "./roadmap-view"
import { LayoutGrid, Baseline as Timeline, Calendar, Map } from "lucide-react"

interface BoardViewProps {
  board: Board
}

export function BoardView({ board }: BoardViewProps) {
  const { columns, tasks, moveTask, reorderTasks, reorderColumns } = useStore()
  const [currentView, setCurrentView] = useState<"board" | "timeline" | "calendar" | "roadmap">("board")

  const boardColumns = columns.filter((column) => column.boardId === board.id).sort((a, b) => a.order - b.order)

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    if (type === "column") {
      const newColumnOrder = Array.from(boardColumns)
      const [reorderedColumn] = newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, reorderedColumn)

      reorderColumns(
        board.id,
        newColumnOrder.map((col) => col.id),
      )
      return
    }

    if (type === "task") {
      const sourceColumn = source.droppableId
      const destColumn = destination.droppableId

      if (sourceColumn === destColumn) {
        const columnTasks = tasks.filter((task) => task.columnId === sourceColumn).sort((a, b) => a.order - b.order)

        const newTaskOrder = Array.from(columnTasks)
        const [reorderedTask] = newTaskOrder.splice(source.index, 1)
        newTaskOrder.splice(destination.index, 0, reorderedTask)

        reorderTasks(
          sourceColumn,
          newTaskOrder.map((task) => task.id),
        )
      } else {
        // Moving to a different column
        moveTask(draggableId, destColumn, destination.index)
      }
    }
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
              <Droppable droppableId="board" type="column" direction="horizontal">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="flex gap-6 min-h-full pb-6">
                    {boardColumns.map((column, index) => (
                      <BoardColumn key={column.id} column={column} index={index} />
                    ))}
                    {provided.placeholder}
                    <CreateColumnButton boardId={board.id} />
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </TabsContent>

          <TabsContent value="timeline" className="h-full m-0 p-6 overflow-y-auto">
            <TimelineView boardId={board.id} />
          </TabsContent>

          <TabsContent value="calendar" className="h-full m-0 p-6 overflow-y-auto">
            <CalendarView boardId={board.id} />
          </TabsContent>

          <TabsContent value="roadmap" className="h-full m-0 p-6 overflow-y-auto">
            <RoadmapView boardId={board.id} />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  )
}
