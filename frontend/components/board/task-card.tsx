"use client"

import { useStore, Card as CardTask } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { useState } from "react"
import { Draggable } from "@hello-pangea/dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, AlertCircle } from "lucide-react"
import { format, isBefore, addDays } from "date-fns"
import { fr } from "date-fns/locale"
import { TaskDetailDialog } from "./task-detail-dialog"

interface TaskCardProps {
  card: CardTask
  index: number
}

export function TaskCard({ card, index }: TaskCardProps) {
  const user = useAuth()
  const [showDetail, setShowDetail] = useState(false)

  const getDueDateStatus = (dueDate?: string) => {
    if (!dueDate) return null

    const due = new Date(dueDate)
    const now = new Date()
    const tomorrow = addDays(now, 1)

    if (isBefore(due, now)) {
      return { status: "overdue", color: "text-red-600", bgColor: "bg-red-50 dark:bg-red-950" }
    } else if (isBefore(due, tomorrow)) {
      return { status: "due-soon", color: "text-orange-600", bgColor: "bg-orange-50 dark:bg-orange-950" }
    } else {
      return { status: "upcoming", color: "text-muted-foreground", bgColor: "" }
    }
  }

  const dueDateStatus = getDueDateStatus(card.dueDate)

  return (
    <>
      <Draggable draggableId={card.cardId} index={index}>
        {(provided, snapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`cursor-grab active:cursor-grabbing transition-all ${
              snapshot.isDragging ? "rotate-2 shadow-lg" : "hover:shadow-md"
            }`}
            onClick={() => setShowDetail(true)}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-sm leading-tight text-balance flex-1">
                  {card.title}
                </h4>
              </div>

              {card.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {card.description}
                </p>
              )}

              {card.labels && card.labels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {card.labels.map((label) => (
                    <Badge key={label.labelId} variant="secondary" className="text-xs px-2 py-0">
                      {label.name}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {card.dueDate && (
                    <div
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${dueDateStatus?.bgColor || ""}`}
                    >
                      {dueDateStatus?.status === "overdue" && <AlertCircle className="h-3 w-3" />}
                      <Calendar className="h-3 w-3" />
                      <span className={dueDateStatus?.color || "text-muted-foreground"}>
                        {format(new Date(card.dueDate), "d MMM", { locale: fr })}
                      </span>
                    </div>
                  )}
                </div>

                {card.members && card.members.length > 0 && (
                  <div className="flex -space-x-1">
                    {card.members.slice(0, 2).map((member) => (
                      <Avatar key={member.user_id} className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="text-xs">
                          {member.user_id.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {card.members.length > 2 && (
                      <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          +{card.members.length - 2}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </Draggable>

      <TaskDetailDialog open={showDetail} onOpenChange={setShowDetail} card={card} />
    </>
  )
}
