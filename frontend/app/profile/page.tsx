"use client"

import { useAuth } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2, Clock, FolderKanban, Mail, Settings, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const user = useAuth((state) => state.user)
  const { boards, tasks } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  if (!user) return null

  // Calculate user statistics
//   const userBoards = boards.filter((board) => board.members.includes(user.id))
//   const userTasks = tasks.filter((task) => task.assignedTo?.includes(user.id))
//   const completedTasks = userTasks.filter((task) => task.status === "done")
//   const inProgressTasks = userTasks.filter((task) => task.status === "in-progress")
//   const overdueTasks = userTasks.filter(
    // (task) => task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done",
//   )

  // Recent activity (last 5 tasks)
//   const recentTasks = [...userTasks]
//     .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
//     .slice(0, 5)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "review":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medium":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight">Mon Profil</h1>
            <p className="mt-2 text-muted-foreground">Gérez vos informations et consultez votre activité</p>
          </div>
          <Link href="/settings">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Profile Info */}
          <div className="space-y-6 lg:col-span-1">
            {/* Profile Card */}
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.picture || "/placeholder.svg"} alt={user.username} />
                  <AvatarFallback className="text-2xl">{getInitials(user.username)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-2xl font-bold">{user.username}</h2>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
                <Badge variant="secondary" className="mt-3">
                    "admin"
                  {/* {user.role === "admin" ? "Administrateur" : "Membre"} */}
                </Badge>
              </div>
            </Card>

            {/* Statistics Card */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Statistiques</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <FolderKanban className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Projets</p>
                      {/* <p className="text-2xl font-bold">{userBoards.length}</p> */}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tâches terminées</p>
                      {/* <p className="text-2xl font-bold">{completedTasks.length}</p> */}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                      <Clock className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">En cours</p>
                      {/* <p className="text-2xl font-bold">{inProgressTasks.length}</p> */}
                    </div>
                  </div>
                </div>

                {/* {overdueTasks.length > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">En retard</p>
                        <p className="text-2xl font-bold">{overdueTasks.length}</p>
                      </div>
                    </div>
                  </div>
                )} */}

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    {/* <span className="text-muted-foreground">
                      {completedTasks.length > 0
                        ? `${Math.round((completedTasks.length / userTasks.length) * 100)}% de tâches complétées`
                        : "Aucune tâche complétée"}
                    </span> */}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Activity */}
          <div className="space-y-6 lg:col-span-2">
            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Activité récente</h3>
              {/* {recentTasks.length > 0 ? (
                <div className="space-y-3">
                  {recentTasks.map((task) => {
                    const board = boards.find((b) => b.id === task.boardId)
                    return (
                      <div
                        key={task.id}
                        className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium leading-tight">{task.title}</h4>
                            <Badge variant="outline" className={getStatusColor(task.status)}>
                              {task.status === "done"
                                ? "Terminé"
                                : task.status === "in-progress"
                                  ? "En cours"
                                  : task.status === "review"
                                    ? "En révision"
                                    : "À faire"}
                            </Badge>
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                          )}
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            {board && (
                              <span className="flex items-center gap-1">
                                <FolderKanban className="h-3 w-3" />
                                {board.title}
                              </span>
                            )}
                            {task.dueDate && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(task.dueDate).toLocaleDateString("fr-FR")}
                              </span>
                            )}
                            <Badge variant="outline" className={getPriorityColor(task.priority)}>
                              {task.priority === "high" ? "Haute" : task.priority === "medium" ? "Moyenne" : "Basse"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Clock className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-sm text-muted-foreground">Aucune activité récente</p>
                </div>
              )} */}
            </Card>

            {/* Projects */}
            {/* <Card className="p-6">
              <h3 className="mb-4 font-semibold">Mes Projets</h3>
              {userBoards.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {userBoards.map((board) => {
                    // const boardTasks = tasks.filter((t) => t.boardId === board.id)
                    // const boardCompletedTasks = boardTasks.filter((t) => t.status === "done")
                    // const progress =
                    //   boardTasks.length > 0 ? Math.round((boardCompletedTasks.length / boardTasks.length) * 100) : 0

                    return (
                      <Link key={board.id} href={`/board/${board.id}`}>
                        <div className="group rounded-lg border p-4 transition-all hover:border-primary hover:shadow-md">
                          <div className="mb-3 flex items-start justify-between">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: board.color }} />
                            <Badge variant="secondary" className="text-xs">
                              {boardTasks.length} tâches
                            </Badge>
                          </div>
                          <h4 className="mb-2 font-medium group-hover:text-primary">{board.title}</h4>
                          {board.description && (
                            <p className="mb-3 text-xs text-muted-foreground line-clamp-2">{board.description}</p>
                          )}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Progression</span>
                              <span className="font-medium">{progress}%</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                              <div
                                className="h-full rounded-full bg-primary transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-sm text-muted-foreground">Aucun projet</p>
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                      Créer un projet
                    </Button>
                  </Link>
                </div>
              )}
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  )
}
