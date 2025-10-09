"use client"

import type { Task } from "@/lib/store"
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
  task: Task
  index: number
}

export function TaskCard({ task, index }: TaskCardProps) {
  const { users } = useAuth()
  const [showDetail, setShowDetail] = useState(false)

  const assignedUsers = users.filter((user) => task.assignedTo?.includes(user.id))

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityLabel = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "Haute"
      case "medium":
        return "Moyenne"
      case "low":
        return "Basse"
      default:
        return "Non définie"
    }
  }

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

  const dueDateStatus = getDueDateStatus(task.dueDate)

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
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
                <h4 className="font-medium text-sm leading-tight text-balance flex-1">{task.title}</h4>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getPriorityColor(task.priority)}`} />
              </div>

              {task.description && <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>}

              {task.labels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {task.labels.map((label) => (
                    <Badge key={label} variant="secondary" className="text-xs px-2 py-0">
                      {label}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {task.dueDate && (
                    <div
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${dueDateStatus?.bgColor || ""}`}
                    >
                      {dueDateStatus?.status === "overdue" && <AlertCircle className="h-3 w-3" />}
                      <Calendar className="h-3 w-3" />
                      <span className={dueDateStatus?.color || "text-muted-foreground"}>
                        {format(new Date(task.dueDate), "d MMM", { locale: fr })}
                      </span>
                    </div>
                  )}

                  <Badge variant="outline" className="text-xs">
                    {getPriorityLabel(task.priority)}
                  </Badge>
                </div>

                {assignedUsers.length > 0 && (
                  <div className="flex -space-x-1">
                    {assignedUsers.slice(0, 2).map((user) => (
                      <Avatar key={user.id} className="h-6 w-6 border-2 border-background">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {assignedUsers.length > 2 && (
                      <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">+{assignedUsers.length - 2}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </Draggable>

      <TaskDetailDialog open={showDetail} onOpenChange={setShowDetail} task={task} />
    </>
  )
}
