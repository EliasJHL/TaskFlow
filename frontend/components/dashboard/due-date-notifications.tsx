"use client"

import { useStore } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Calendar } from "lucide-react"
import { format, isAfter, isBefore, addDays } from "date-fns"
import { fr } from "date-fns/locale"
import { useRouter } from "next/navigation"

export function DueDateNotifications() {
  // const { Cards, boards } = useStore()
  // const { user, users } = useAuth()
  // const router = useRouter()

  // if (!user) return null

  // // Get tasks assigned to current user with due dates
  // const userTasks = tasks.filter((task) => task.assignedTo?.includes(user.id) && task.dueDate && task.status !== "done")

  // const now = new Date()
  // const tomorrow = addDays(now, 1)

  // const overdueTasks = userTasks.filter((task) => task.dueDate && isBefore(new Date(task.dueDate), now))

  // const dueSoonTasks = userTasks.filter(
  //   (task) => task.dueDate && isAfter(new Date(task.dueDate), now) && isBefore(new Date(task.dueDate), tomorrow),
  // )

  // const upcomingTasks = userTasks
  //   .filter((task) => task.dueDate && isAfter(new Date(task.dueDate), tomorrow))
  //   .slice(0, 3)

  // const handleTaskClick = (taskBoardId: string) => {
  //   router.push(`/board/${taskBoardId}`)
  // }

  // if (overdueTasks.length === 0 && dueSoonTasks.length === 0 && upcomingTasks.length === 0) {
  //   return null
  // }

  return (
    <div> NOTIFICATION </div>
    // <div className="space-y-4">
    //   {overdueTasks.length > 0 && (
    //     <Card className="border-red-200 dark:border-red-800">
    //       <CardHeader className="pb-3">
    //         <CardTitle className="flex items-center gap-2 text-red-600">
    //           <AlertTriangle className="h-5 w-5" />
    //           Tâches en retard ({overdueTasks.length})
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent className="space-y-2">
    //         {overdueTasks.slice(0, 3).map((task) => {
    //           const board = boards.find((b) => b.id === task.boardId)
    //           return (
    //             <div
    //               key={task.id}
    //               className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-950 rounded-lg cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
    //               onClick={() => handleTaskClick(task.boardId)}
    //             >
    //               <div className="flex-1">
    //                 <p className="font-medium text-sm">{task.title}</p>
    //                 <p className="text-xs text-muted-foreground">
    //                   {board?.title} • Échéance : {format(new Date(task.dueDate!), "d MMM yyyy", { locale: fr })}
    //                 </p>
    //               </div>
    //               <Badge variant="destructive" className="text-xs">
    //                 En retard
    //               </Badge>
    //             </div>
    //           )
    //         })}
    //         {overdueTasks.length > 3 && (
    //           <p className="text-xs text-muted-foreground text-center pt-2">
    //             +{overdueTasks.length - 3} autres tâches en retard
    //           </p>
    //         )}
    //       </CardContent>
    //     </Card>
    //   )}

    //   {dueSoonTasks.length > 0 && (
    //     <Card className="border-orange-200 dark:border-orange-800">
    //       <CardHeader className="pb-3">
    //         <CardTitle className="flex items-center gap-2 text-orange-600">
    //           <Clock className="h-5 w-5" />À échéance bientôt ({dueSoonTasks.length})
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent className="space-y-2">
    //         {dueSoonTasks.map((task) => {
    //           const board = boards.find((b) => b.id === task.boardId)
    //           return (
    //             <div
    //               key={task.id}
    //               className="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-950 rounded-lg cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900 transition-colors"
    //               onClick={() => handleTaskClick(task.boardId)}
    //             >
    //               <div className="flex-1">
    //                 <p className="font-medium text-sm">{task.title}</p>
    //                 <p className="text-xs text-muted-foreground">
    //                   {board?.title} • Échéance : {format(new Date(task.dueDate!), "d MMM yyyy", { locale: fr })}
    //                 </p>
    //               </div>
    //               <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
    //                 Bientôt
    //               </Badge>
    //             </div>
    //           )
    //         })}
    //       </CardContent>
    //     </Card>
    //   )}

    //   {upcomingTasks.length > 0 && (
    //     <Card>
    //       <CardHeader className="pb-3">
    //         <CardTitle className="flex items-center gap-2 text-blue-600">
    //           <Calendar className="h-5 w-5" />
    //           Prochaines échéances
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent className="space-y-2">
    //         {upcomingTasks.map((task) => {
    //           const board = boards.find((b) => b.id === task.boardId)
    //           return (
    //             <div
    //               key={task.id}
    //               className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-950 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
    //               onClick={() => handleTaskClick(task.boardId)}
    //             >
    //               <div className="flex-1">
    //                 <p className="font-medium text-sm">{task.title}</p>
    //                 <p className="text-xs text-muted-foreground">
    //                   {board?.title} • Échéance : {format(new Date(task.dueDate!), "d MMM yyyy", { locale: fr })}
    //                 </p>
    //               </div>
    //               <Badge variant="outline" className="text-xs">
    //                 {format(new Date(task.dueDate!), "d MMM", { locale: fr })}
    //               </Badge>
    //             </div>
    //           )
    //         })}
    //       </CardContent>
    //     </Card>
    //   )}
    // </div>
  )
}
