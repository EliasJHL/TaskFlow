"use client";

import { useState } from "react";
import { useStore, type Task } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, AlertTriangle, Filter } from "lucide-react";
import {
  format,
  isAfter,
  isBefore,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import { fr } from "date-fns/locale";
import { TaskDetailDialog } from "./task-detail-dialog";

interface TimelineViewProps {
  boardId: string;
}

type TimeFilter = "all" | "overdue" | "this-week" | "this-month" | "upcoming";
type StatusFilter = "all" | "todo" | "in-progress" | "review" | "done";

export function TimelineView({ boardId }: TimelineViewProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const { tasks, columns } = useStore();
  const { users } = useAuth();

  const boardTasks = tasks.filter(
    (task) => task.boardId === boardId && task.dueDate
  );

  const getTaskStatus = (task: Task) => {
    if (!task.dueDate) return null;

    const due = new Date(task.dueDate);
    const now = new Date();
    const tomorrow = addDays(now, 1);

    if (isBefore(due, now)) {
      return {
        status: "overdue",
        color: "text-red-600",
        bgColor: "bg-red-50 dark:bg-red-950",
        icon: AlertTriangle,
      };
    } else if (isBefore(due, tomorrow)) {
      return {
        status: "due-soon",
        color: "text-orange-600",
        bgColor: "bg-orange-50 dark:bg-orange-950",
        icon: Clock,
      };
    } else {
      return {
        status: "upcoming",
        color: "text-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-950",
        icon: Calendar,
      };
    }
  };

  const filterTasksByTime = (tasks: Task[]) => {
    const now = new Date();

    switch (timeFilter) {
      case "overdue":
        return tasks.filter(
          (task) => task.dueDate && isBefore(new Date(task.dueDate), now)
        );
      case "this-week":
        const weekStart = startOfWeek(now, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
        return tasks.filter(
          (task) =>
            task.dueDate &&
            isWithinInterval(new Date(task.dueDate), {
              start: weekStart,
              end: weekEnd,
            })
        );
      case "this-month":
        const monthStart = startOfMonth(now);
        const monthEnd = endOfMonth(now);
        return tasks.filter(
          (task) =>
            task.dueDate &&
            isWithinInterval(new Date(task.dueDate), {
              start: monthStart,
              end: monthEnd,
            })
        );
      case "upcoming":
        return tasks.filter(
          (task) => task.dueDate && isAfter(new Date(task.dueDate), now)
        );
      default:
        return tasks;
    }
  };

  const filterTasksByStatus = (tasks: Task[]) => {
    if (statusFilter === "all") return tasks;
    return tasks.filter((task) => task.status === statusFilter);
  };

  const filteredTasks = filterTasksByStatus(filterTasksByTime(boardTasks)).sort(
    (a, b) => {
      if (!a.dueDate || !b.dueDate) return 0;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
  );

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadgeVariant = (status: Task["status"]) => {
    switch (status) {
      case "done":
        return "default";
      case "in-progress":
        return "secondary";
      case "review":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return "To Do";
      case "in-progress":
        return "In Progress";
      case "review":
        return "In Review";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filtres :</span>
        </div>

        <Select
          value={timeFilter}
          onValueChange={(value: TimeFilter) => setTimeFilter(value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les dates</SelectItem>
            <SelectItem value="overdue">En retard</SelectItem>
            <SelectItem value="this-week">Cette semaine</SelectItem>
            <SelectItem value="this-month">Ce mois</SelectItem>
            <SelectItem value="upcoming">À venir</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(value: StatusFilter) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="todo">À faire</SelectItem>
            <SelectItem value="in-progress">En cours</SelectItem>
            <SelectItem value="review">En révision</SelectItem>
            <SelectItem value="done">Terminé</SelectItem>
          </SelectContent>
        </Select>

        <Badge variant="outline" className="ml-auto">
          {filteredTasks.length} tâche{filteredTasks.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Aucune tâche trouvée
              </h3>
              <p className="text-muted-foreground">
                Aucune tâche ne correspond aux filtres sélectionnés.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => {
            const taskStatus = getTaskStatus(task);
            const assignedUsers = users.filter((user) =>
              task.assignedTo?.includes(user.id)
            );
            const column = columns.find((col) => col.id === task.columnId);
            const StatusIcon = taskStatus?.icon || Calendar;

            return (
              <Card
                key={task.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  taskStatus?.bgColor || ""
                }`}
                onClick={() => setSelectedTask(task)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center min-w-[80px]">
                      <div
                        className={`p-2 rounded-full ${
                          taskStatus?.bgColor || "bg-muted"
                        }`}
                      >
                        <StatusIcon
                          className={`h-4 w-4 ${
                            taskStatus?.color || "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="text-center mt-2">
                        <p className="text-xs font-medium">
                          {format(new Date(task.dueDate!), "d MMM", {
                            locale: fr,
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(task.dueDate!), "yyyy", {
                            locale: fr,
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-balance">
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {task.description}
                            </p>
                          )}
                        </div>
                        <div
                          className={`w-3 h-3 rounded-full flex-shrink-0 ${getPriorityColor(
                            task.priority
                          )}`}
                        />
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={getStatusBadgeVariant(task.status)}>
                          {getStatusLabel(task.status)}
                        </Badge>

                        {column && (
                          <Badge
                            variant="outline"
                            style={{ borderColor: column.color }}
                          >
                            {column.title}
                          </Badge>
                        )}

                        {task.labels.map((label) => (
                          <Badge
                            key={label}
                            variant="secondary"
                            className="text-xs"
                          >
                            {label}
                          </Badge>
                        ))}
                      </div>

                      {assignedUsers.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Assigné à :
                          </span>
                          <div className="flex -space-x-1">
                            {assignedUsers.slice(0, 3).map((user) => (
                              <Avatar
                                key={user.id}
                                className="h-6 w-6 border-2 border-background"
                              >
                                <AvatarImage
                                  src={user.avatar || "/placeholder.svg"}
                                  alt={user.name}
                                />
                                <AvatarFallback className="text-xs">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {assignedUsers.length > 3 && (
                              <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">
                                  +{assignedUsers.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {selectedTask && (
        <TaskDetailDialog
          open={!!selectedTask}
          onOpenChange={(open) => !open && setSelectedTask(null)}
          task={selectedTask}
        />
      )}
    </div>
  );
}
