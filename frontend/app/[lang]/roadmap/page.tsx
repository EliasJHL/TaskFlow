"use client";

import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RoadmapView } from "@/components/board/roadmap-view";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Target, Calendar, Users } from "lucide-react";

export default function GlobalRoadmapPage() {
  const { user } = useAuth();
  const { boards, tasks } = useStore();
  const [selectedBoardId, setSelectedBoardId] = useState<string>("all");

  useEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, [user]);

  if (!user) {
    return null; // Will redirect
  }

  const userBoards = boards.filter(
    (board) => board.members.includes(user.id) && !board.isArchived
  );
  const allTasks = tasks.filter((task) => task.dueDate);

  const getTaskStats = () => {
    const now = new Date();
    const totalTasks = allTasks.length;
    const overdueTasks = allTasks.filter(
      (task) => new Date(task.dueDate!) < now
    ).length;
    const completedTasks = allTasks.filter(
      (task) => task.status === "done"
    ).length;
    const assignedToUser = allTasks.filter((task) =>
      task.assignedTo?.includes(user.id)
    ).length;

    return { totalTasks, overdueTasks, completedTasks, assignedToUser };
  };

  const stats = getTaskStats();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance flex items-center gap-3">
                <Map className="h-8 w-8" />
                Roadmap globale
              </h1>
              <p className="text-muted-foreground mt-2">
                Vue d'ensemble de tous vos projets et échéances
              </p>
            </div>

            <Select value={selectedBoardId} onValueChange={setSelectedBoardId}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les projets</SelectItem>
                {userBoards.map((board) => (
                  <SelectItem key={board.id} value={board.id}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: board.color }}
                      />
                      {board.title}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Total des tâches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTasks}</div>
                <p className="text-xs text-muted-foreground">
                  Avec dates limites
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  En retard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {stats.overdueTasks}
                </div>
                <p className="text-xs text-muted-foreground">
                  Nécessitent attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Terminées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.completedTasks}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalTasks > 0
                    ? Math.round(
                        (stats.completedTasks / stats.totalTasks) * 100
                      )
                    : 0}
                  % du total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Mes tâches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.assignedToUser}</div>
                <p className="text-xs text-muted-foreground">Assignées à moi</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userBoards.map((board) => {
              const boardTasks = tasks.filter(
                (task) => task.boardId === board.id && task.dueDate
              );
              const completedBoardTasks = boardTasks.filter(
                (task) => task.status === "done"
              );
              const overdueBoardTasks = boardTasks.filter(
                (task) => new Date(task.dueDate!) < new Date()
              );

              return (
                <Card
                  key={board.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: board.color }}
                      />
                      <CardTitle className="text-lg">{board.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Tâches planifiées
                      </span>
                      <Badge variant="secondary">{boardTasks.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Terminées</span>
                      <Badge variant="default">
                        {completedBoardTasks.length}
                      </Badge>
                    </div>
                    {overdueBoardTasks.length > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">En retard</span>
                        <Badge variant="destructive">
                          {overdueBoardTasks.length}
                        </Badge>
                      </div>
                    )}
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${
                            boardTasks.length > 0
                              ? (completedBoardTasks.length /
                                  boardTasks.length) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selectedBoardId !== "all" ? (
            <RoadmapView boardId={selectedBoardId} />
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Map className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Sélectionnez un projet
                </h3>
                <p className="text-muted-foreground">
                  Choisissez un projet spécifique pour voir sa roadmap
                  détaillée.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
