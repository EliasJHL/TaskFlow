"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
} from "date-fns"
import { fr } from "date-fns/locale"
import { TaskDetailDialog } from "./task-detail-dialog"

interface CalendarViewProps {
  boardId: string
}

export function CalendarView({ boardId }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const { tasks } = useStore()
  const { users } = useAuth()

  const boardTasks = tasks.filter((task) => task.boardId === boardId && task.dueDate)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const getTasksForDay = (day: Date) => {
    return boardTasks.filter((task) => task.dueDate && isSameDay(new Date(task.dueDate), day))
  }

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

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => (direction === "prev" ? subMonths(prev, 1) : addMonths(prev, 1)))
  }

  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">{format(currentDate, "MMMM yyyy", { locale: fr })}</h2>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
          <CalendarIcon className="h-4 w-4 mr-2" />
          Aujourd'hui
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b">
            {weekDays.map((day) => (
              <div
                key={day}
                className="p-4 text-center font-medium text-sm text-muted-foreground border-r last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const dayTasks = getTasksForDay(day)
              const isCurrentMonth = isSameMonth(day, currentDate)
              const isDayToday = isToday(day)

              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-[120px] p-2 border-r border-b last:border-r-0 ${
                    !isCurrentMonth ? "bg-muted/30" : ""
                  } ${isDayToday ? "bg-primary/5" : ""}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-medium ${
                        !isCurrentMonth ? "text-muted-foreground" : isDayToday ? "text-primary font-bold" : ""
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                    {dayTasks.length > 0 && (
                      <Badge variant="secondary" className="text-xs h-5">
                        {dayTasks.length}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1">
                    {dayTasks.slice(0, 3).map((task) => {
                      const assignedUsers = users.filter((user) => task.assignedTo?.includes(user.id))

                      return (
                        <div
                          key={task.id}
                          className="p-1 rounded text-xs cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => setSelectedTask(task)}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getPriorityColor(task.priority)}`} />
                            <span className="font-medium line-clamp-1 flex-1">{task.title}</span>
                          </div>

                          {assignedUsers.length > 0 && (
                            <div className="flex -space-x-1">
                              {assignedUsers.slice(0, 2).map((user) => (
                                <Avatar key={user.id} className="h-4 w-4 border border-background">
                                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                  <AvatarFallback className="text-[8px]">
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {assignedUsers.length > 2 && (
                                <div className="h-4 w-4 rounded-full bg-muted border border-background flex items-center justify-center">
                                  <span className="text-[8px] text-muted-foreground">+{assignedUsers.length - 2}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}

                    {dayTasks.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center py-1">
                        +{dayTasks.length - 3} autres
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {selectedTask && (
        <TaskDetailDialog
          open={!!selectedTask}
          onOpenChange={(open) => !open && setSelectedTask(null)}
          task={selectedTask}
        />
      )}
    </div>
  )
}
