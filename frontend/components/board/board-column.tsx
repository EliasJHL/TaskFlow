"use client"

import type { Column } from "@/lib/store"
import { useStore } from "@/lib/store"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { TaskCard } from "./task-card"
import { CreateTaskDialog } from "./create-task-dialog"
import { useState } from "react"

interface BoardColumnProps {
  column: Column
  index: number
}

export function BoardColumn({ column, index }: BoardColumnProps) {
  const { tasks, deleteColumn } = useStore()
  const [showCreateTask, setShowCreateTask] = useState(false)

  const columnTasks = tasks.filter((task) => task.columnId === column.id).sort((a, b) => a.order - b.order)

  const handleDeleteColumn = () => {
    if (columnTasks.length > 0) {
      if (!confirm("Cette colonne contient des tâches. Êtes-vous sûr de vouloir la supprimer ?")) {
        return
      }
    }
    deleteColumn(column.id)
  }

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex-shrink-0 w-80 ${snapshot.isDragging ? "rotate-2" : ""}`}
        >
          <Card className="h-fit max-h-[calc(100vh-200px)] flex flex-col">
            <CardHeader {...provided.dragHandleProps} className="pb-3 cursor-grab active:cursor-grabbing">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: column.color }} />
                  <h3 className="font-semibold">{column.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {columnTasks.length}
                  </Badge>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowCreateTask(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter une tâche
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteColumn} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer la colonne
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto">
              <Droppable droppableId={column.id} type="task">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-3 min-h-2 ${snapshot.isDraggingOver ? "bg-muted/50 rounded-lg p-2" : ""}`}
                  >
                    {columnTasks.map((task, taskIndex) => (
                      <TaskCard key={task.id} task={task} index={taskIndex} />
                    ))}
                    {provided.placeholder}

                    {columnTasks.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">Aucune tâche</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>

              <Button
                variant="ghost"
                className="w-full mt-3 justify-start text-muted-foreground hover:text-foreground"
                onClick={() => setShowCreateTask(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une tâche
              </Button>
            </CardContent>
          </Card>

          <CreateTaskDialog
            open={showCreateTask}
            onOpenChange={setShowCreateTask}
            columnId={column.id}
            boardId={column.boardId}
          />
        </div>
      )}
    </Draggable>
  )
}
