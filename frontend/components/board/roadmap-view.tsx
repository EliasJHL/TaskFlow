"use client"

import { useState } from "react"
import { useStore, type Task } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Calendar, Users, Target } from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  addMonths,
  subMonths,
  isWithinInterval,
  differenceInDays,
  isBefore,
} from "date-fns"
import { fr } from "date-fns/locale"
import { TaskDetailDialog } from "./task-detail-dialog"

interface RoadmapViewProps {
  boardId: string
}

type ViewMode = "month" | "quarter" | "year"

export function RoadmapView({ boardId }: RoadmapViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const { tasks, columns } = useStore()
  const { users } = useAuth()

  const boardTasks = tasks.filter((task) => task.boardId === boardId && task.dueDate)

  const getDateRange = () => {
    switch (viewMode) {
      case "month":
        return {
          start: startOfMonth(currentDate),
          end: endOfMonth(currentDate),
          periods: eachWeekOfInterval(
            { start: startOfMonth(currentDate), end: endOfMonth(currentDate) },
            { weekStartsOn: 1 },
          ),
        }
      case "quarter":
        const quarterStart = startOfMonth(addMonths(currentDate, -1))
        const quarterEnd = endOfMonth(addMonths(currentDate, 2))
        return {
          start: quarterStart,
          end: quarterEnd,
          periods: eachWeekOfInterval({ start: quarterStart, end: quarterEnd }, { weekStartsOn: 1 }),
        }
      case "year":
        const yearStart = startOfMonth(addMonths(currentDate, -5))
        const yearEnd = endOfMonth(addMonths(currentDate, 6))
        return {
          start: yearStart,
          end: yearEnd,
          periods: Array.from({ length: 12 }, (_, i) => addMonths(yearStart, i)),
        }
      default:
        return {
          start: startOfMonth(currentDate),
          end: endOfMonth(currentDate),
          periods: [],
        }
    }
  }

  const { start: rangeStart, end: rangeEnd, periods } = getDateRange()

  const getTasksInRange = () => {
    return boardTasks.filter((task) => {
      const taskDate = new Date(task.dueDate!)
      return isWithinInterval(taskDate, { start: rangeStart, end: rangeEnd })
    })
  }

  const getTaskPosition = (task: Task) => {
    if (!task.dueDate) return { left: 0, width: 0 }

    const taskDate = new Date(task.dueDate)
    const totalDays = differenceInDays(rangeEnd, rangeStart)
    const taskDays = differenceInDays(taskDate, rangeStart)

    const left = Math.max(0, (taskDays / totalDays) * 100)
    const width = Math.min(100 - left, 2) // Minimum width for visibility

    return { left: `${left}%`, width: `${width}%` }
  }

  const getTasksByColumn = () => {
    const tasksInRange = getTasksInRange()
    const columnMap = new Map()

    columns
      .filter((col) => col.boardId === boardId)
      .sort((a, b) => a.order - b.order)
      .forEach((column) => {
        const columnTasks = tasksInRange.filter((task) => task.columnId === column.id)
        if (columnTasks.length > 0) {
          columnMap.set(column.id, { column, tasks: columnTasks })
        }
      })

    return Array.from(columnMap.values())
  }

  const navigateTime = (direction: "prev" | "next") => {
    const monthsToAdd = viewMode === "month" ? 1 : viewMode === "quarter" ? 3 : 12
    setCurrentDate((prev) => (direction === "prev" ? subMonths(prev, monthsToAdd) : addMonths(prev, monthsToAdd)))
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

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "done":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "review":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatPeriodLabel = (period: Date) => {
    switch (viewMode) {
      case "month":
        return format(period, "d MMM", { locale: fr })
      case "quarter":
        return format(period, "d MMM", { locale: fr })
      case "year":
        return format(period, "MMM yyyy", { locale: fr })
      default:
        return ""
    }
  }

  const getViewTitle = () => {
    switch (viewMode) {
      case "month":
        return format(currentDate, "MMMM yyyy", { locale: fr })
      case "quarter":
        return `T${Math.ceil((currentDate.getMonth() + 1) / 3)} ${currentDate.getFullYear()}`
      case "year":
        return currentDate.getFullYear().toString()
      default:
        return ""
    }
  }

  const columnGroups = getTasksByColumn()

  return (
    <div className="space-y-6">
      {/* Roadmap Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">{getViewTitle()}</h2>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={() => navigateTime("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => navigateTime("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Select value={viewMode} onValueChange={(value: ViewMode) => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mois</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Année</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
            <Calendar className="h-4 w-4 mr-2" />
            Aujourd'hui
          </Button>
        </div>
      </div>

      {/* Roadmap Chart */}
      <Card>
        <CardContent className="p-0">
          {/* Timeline Header */}
          <div className="border-b bg-muted/30 p-4">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-3 font-medium text-sm">Colonnes & Tâches</div>
              <div className="col-span-9">
                <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${periods.length}, 1fr)` }}>
                  {periods.map((period, index) => (
                    <div key={index} className="text-center text-xs font-medium text-muted-foreground">
                      {formatPeriodLabel(period)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Roadmap Content */}
          <div className="divide-y">
            {columnGroups.length === 0 ? (
              <div className="p-12 text-center">
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune tâche planifiée</h3>
                <p className="text-muted-foreground">
                  Ajoutez des dates limites à vos tâches pour les voir apparaître dans la roadmap.
                </p>
              </div>
            ) : (
              columnGroups.map(({ column, tasks }) => (
                <div key={column.id} className="p-4">
                  <div className="grid grid-cols-12 gap-2 items-start">
                    {/* Column Info */}
                    <div className="col-span-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: column.color }} />
                        <h4 className="font-medium">{column.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {tasks.length}
                        </Badge>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="col-span-9 relative">
                      <div className="h-16 relative bg-muted/20 rounded-lg overflow-hidden">
                        {/* Timeline Grid */}
                        <div
                          className="absolute inset-0 grid border-r"
                          style={{ gridTemplateColumns: `repeat(${periods.length}, 1fr)` }}
                        >
                          {periods.map((_, index) => (
                            <div key={index} className="border-r border-muted/40 last:border-r-0" />
                          ))}
                        </div>

                        {/* Tasks */}
                        {tasks.map((task, taskIndex) => {
                          const position = getTaskPosition(task)
                          const assignedUsers = users.filter((user) => task.assignedTo?.includes(user.id))

                          return (
                            <div
                              key={task.id}
                              className="absolute top-1 h-14 rounded-md cursor-pointer hover:shadow-md transition-all z-10 flex items-center px-2 text-white text-xs font-medium"
                              style={{
                                left: position.left,
                                width: position.width,
                                minWidth: "120px",
                                backgroundColor: column.color,
                                transform: `translateY(${taskIndex * 4}px)`,
                              }}
                              onClick={() => setSelectedTask(task)}
                            >
                              <div className="flex items-center gap-2 w-full min-w-0">
                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                                <span className="truncate flex-1">{task.title}</span>
                                {assignedUsers.length > 0 && (
                                  <div className="flex -space-x-1">
                                    {assignedUsers.slice(0, 2).map((user) => (
                                      <Avatar key={user.id} className="h-4 w-4 border border-white">
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
                                      <div className="h-4 w-4 rounded-full bg-white/20 border border-white flex items-center justify-center">
                                        <span className="text-[8px]">+{assignedUsers.length - 2}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Task List Below Timeline */}
                      <div className="mt-2 space-y-1">
                        {tasks.map((task) => {
                          const assignedUsers = users.filter((user) => task.assignedTo?.includes(user.id))
                          const isOverdue = task.dueDate && isBefore(new Date(task.dueDate), new Date())

                          return (
                            <div
                              key={task.id}
                              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer text-sm"
                              onClick={() => setSelectedTask(task)}
                            >
                              <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                              <span className="flex-1 truncate">{task.title}</span>
                              <div className="flex items-center gap-2">
                                {isOverdue && (
                                  <Badge variant="destructive" className="text-xs">
                                    En retard
                                  </Badge>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {format(new Date(task.dueDate!), "d MMM", { locale: fr })}
                                </span>
                                {assignedUsers.length > 0 && (
                                  <div className="flex -space-x-1">
                                    {assignedUsers.slice(0, 2).map((user) => (
                                      <Avatar key={user.id} className="h-5 w-5 border border-background">
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
                                      <div className="h-5 w-5 rounded-full bg-muted border border-background flex items-center justify-center">
                                        <span className="text-[8px] text-muted-foreground">
                                          +{assignedUsers.length - 2}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Tâches planifiées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTasksInRange().length}</div>
            <p className="text-xs text-muted-foreground">Dans la période sélectionnée</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Personnes impliquées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(getTasksInRange().flatMap((task) => task.assignedTo || [])).size}
            </div>
            <p className="text-xs text-muted-foreground">Membres assignés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Tâches en retard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {getTasksInRange().filter((task) => isBefore(new Date(task.dueDate!), new Date())).length}
            </div>
            <p className="text-xs text-muted-foreground">Nécessitent une attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Task Detail Dialog */}
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
