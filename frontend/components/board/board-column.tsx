"use client"

import type { List } from "@/lib/store"
import { useStore } from "@/lib/store"
import type { Card as CardTask } from "@/lib/store"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { TaskCard } from "./task-card"
import { CardDetailDialog } from "./create-task-dialog"
import { useState } from "react"

interface BoardColumnProps {
  column: List
  index: number
}

export function BoardColumn({ column, index }: BoardColumnProps) {
  const [showCreateTask, setShowCreateTask] = useState(false)
  const columnCards = column.cards || []
  const addCard = useStore((state) => state.createCard)
  const [newCard, setNewCard] = useState<CardTask | null>(null)

  const handleCreateTask = () => {
    const card: CardTask = {
      cardId: crypto.randomUUID(),
      title: "",
      description: "",
      listId: column.listId,
      position: columnCards.length,
      labels: [],
      members: [],
      comments: [],
      attachments: [],
      dueDate: undefined
    }
    setNewCard(card)
    setShowCreateTask(true)
  }

  return (
    <Draggable draggableId={column.listId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex-shrink-0 w-80 ${snapshot.isDragging ? "rotate-2" : ""}`}
        >
          <Card className="h-fit max-h-[calc(100vh-200px)] flex flex-col">
            <CardHeader 
              {...provided.dragHandleProps} 
              className="pb-3 cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: column.color || "#F0521D" }} 
                  />
                  <h3 className="font-semibold">{column.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {columnCards.length}
                  </Badge>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto">
              <Droppable droppableId={column.listId} type="task">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-3 min-h-2 ${snapshot.isDraggingOver ? "bg-muted/50 rounded-lg p-2" : ""}`}
                  >
                    {columnCards.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">Aucune tâche</p>
                      </div>
                    ) : (
                      columnCards.map((card, cardIndex) => (
                        <Draggable 
                          key={card.cardId} 
                          draggableId={card.cardId} 
                          index={cardIndex}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard card={card} index={cardIndex} />
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Button
                variant="ghost"
                className="w-full mt-3 justify-start text-muted-foreground hover:text-foreground"
                onClick={handleCreateTask}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une tâche
              </Button>
            </CardContent>
          </Card>
          {newCard && (
            <CardDetailDialog
              open={showCreateTask}
              onOpenChange={(open) => {
                setShowCreateTask(open)
                if (!open) setNewCard(null)
                }}
              card={newCard}
            />
          )}
        </div>
      )}
    </Draggable>
  )
}