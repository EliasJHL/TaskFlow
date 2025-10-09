"use client"

import { type Board, useStore } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Users, Calendar, Archive } from "lucide-react"
import { useRouter } from "next/navigation"

interface BoardCardProps {
  board: Board
}

export function BoardCard({ board }: BoardCardProps) {
  // const { users } = useAuth()
  // const { tasks, updateBoard } = useStore()
  // const router = useRouter()

  // const boardMembers = users.filter((user) => board.members.includes(user.id))
  // const boardTasks = tasks.filter((task) => task.boardId === board.id)
  // const completedTasks = boardTasks.filter((task) => task.status === "done")

  // const handleOpenBoard = () => {
  //   router.push(`/board/${board.id}`)
  // }

  // const handleArchiveBoard = () => {
  //   updateBoard(board.id, { isArchived: true })
  // }

  return (
    <div>Board Card</div>
    // <Card
    //   className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4"
    //   style={{ borderLeftColor: board.color }}
    //   onClick={handleOpenBoard}
    // >
    //   <CardHeader className="pb-3">
    //     <div className="flex items-start justify-between">
    //       <div className="space-y-1 flex-1">
    //         <h3 className="font-semibold text-lg leading-tight text-balance">{board.title}</h3>
    //         {board.description && <p className="text-sm text-muted-foreground line-clamp-2">{board.description}</p>}
    //       </div>

    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
    //           <Button
    //             variant="ghost"
    //             size="icon"
    //             className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
    //           >
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuItem
    //             onClick={(e) => {
    //               e.stopPropagation()
    //               handleArchiveBoard()
    //             }}
    //           >
    //             <Archive className="mr-2 h-4 w-4" />
    //             Archiver
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     </div>
    //   </CardHeader>

    //   <CardContent className="space-y-4">
    //     <div className="flex items-center justify-between text-sm">
    //       <div className="flex items-center space-x-2 text-muted-foreground">
    //         <Calendar className="h-4 w-4" />
    //         <span>
    //           {completedTasks.length}/{boardTasks.length} tâches
    //         </span>
    //       </div>

    //       {completedTasks.length > 0 && (
    //         <Badge variant="secondary" className="text-xs">
    //           {Math.round((completedTasks.length / boardTasks.length) * 100)}%
    //         </Badge>
    //       )}
    //     </div>

    //     <div className="flex items-center justify-between">
    //       <div className="flex items-center space-x-2">
    //         <Users className="h-4 w-4 text-muted-foreground" />
    //         <div className="flex -space-x-2">
    //           {boardMembers.slice(0, 3).map((member) => (
    //             <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
    //               <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
    //               <AvatarFallback className="text-xs">
    //                 {member.name
    //                   .split(" ")
    //                   .map((n) => n[0])
    //                   .join("")
    //                   .toUpperCase()}
    //               </AvatarFallback>
    //             </Avatar>
    //           ))}
    //           {boardMembers.length > 3 && (
    //             <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
    //               <span className="text-xs text-muted-foreground">+{boardMembers.length - 3}</span>
    //             </div>
    //           )}
    //         </div>
    //       </div>

    //       <div className="h-3 w-3 rounded-full" style={{ backgroundColor: board.color }} />
    //     </div>
    //   </CardContent>
    // </Card>
  )
}
