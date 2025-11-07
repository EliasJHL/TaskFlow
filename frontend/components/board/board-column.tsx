"use client"

import type { List } from "@/lib/store"
import { useStore } from "@/lib/store"
import type { Card as CardTask } from "@/lib/store"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { TaskCard } from "./task-card"
import { CardDetailDialog } from "./create-task-dialog"
import { useState, useRef, useEffect } from "react"

interface BoardColumnProps {
  column: List
  index: number
}

export function BoardColumn({ column, index }: BoardColumnProps) {
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(column.title)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { deleteList, updateList } = useStore()
  
  const columnCards = column.cards || []
  const [newCard, setNewCard] = useState<CardTask | null>(null)

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditingTitle])

  const handleTitleClick = () => {
    setIsEditingTitle(true)
  }

  const handleTitleBlur = () => {
    if (editedTitle.trim() && editedTitle !== column.title) {
      updateList(column.listId, { title: editedTitle.trim() })
    } else {
      setEditedTitle(column.title)
    }
    setIsEditingTitle(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleBlur()
    } else if (e.key === 'Escape') {
      setEditedTitle(column.title)
      setIsEditingTitle(false)
    }
  }

  const handleDeleteColumn = () => {
    deleteList(column.listId)
    setShowDeleteDialog(false)
  }

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
    <>
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
                  <div className="flex items-center gap-2 flex-1">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: column.color || "#F0521D" }} 
                    />
                    
                    {isEditingTitle ? (
                      <Input
                        ref={inputRef}
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onBlur={handleTitleBlur}
                        onKeyDown={handleTitleKeyDown}
                        className="h-7 px-2 py-1 text-sm font-semibold"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <h3 
                        className="font-semibold cursor-text hover:bg-muted/50 px-2 py-1 rounded transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTitleClick()
                        }}
                      >
                        {column.title}
                      </h3>
                    )}
                    
                    <Badge variant="secondary" className="text-xs">
                      {columnCards.length}
                    </Badge>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowDeleteDialog(true)
                        }}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer la colonne
                      </DropdownMenuItem>
                    </DropdownMenuContent>
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
                  Create a new task
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>

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

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la colonne ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer la colonne "{column.title}" ? 
              {columnCards.length > 0 && (
                <span className="text-destructive font-medium">
                  {" "}Cette action supprimera également {columnCards.length} tâche{columnCards.length > 1 ? 's' : ''}.
                </span>
              )}
              {" "}Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteColumn}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
