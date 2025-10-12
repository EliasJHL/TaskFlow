"use client"

import { type Workspace, useStore } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Users, Calendar, Archive, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface WorkspaceCardProps {
  workspace: Workspace
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const { boards, updateBoard } = useStore()
  const router = useRouter()

  const workspaceBoards = boards.filter((board) => board.workspaceId === workspace.workspaceId)

  const handleOpenWorkspace = () => {
    router.push(`/workspace/${workspace.workspaceId}`)
  }

  const handleArchiveWorkspace = () => {
    console.log(`Archiving workspace ${workspace.workspaceId}`)
  }

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4"
      style={{ borderLeftColor: workspace.color }}
      onClick={handleOpenWorkspace}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-lg leading-tight text-balance">{workspace.name}</h3>
            {workspace.description && <p className="text-sm text-muted-foreground line-clamp-2">{workspace.description}</p>}
          </div>

            <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  handleArchiveWorkspace()
                }}
                >
                <Archive className="mr-2 h-4 w-4" />
                Archive
                </DropdownMenuItem>
                <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  handleArchiveWorkspace()
                }}
                >
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="mr-2 h-4 w-4">
                  <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146zm.122 2.112v-.002.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a4.507 4.507 0 0 0-.288-.076 4.922 4.922 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a4.924 4.924 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034.114 0 .23-.011.343-.04L9.927 2.028c-.029.113-.04.23-.04.343a1.779 1.779 0 0 0 .062.46z"/>
                </svg>
                Pin
                </DropdownMenuItem>
                <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  handleArchiveWorkspace()
                }}
                >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
            <Badge variant="secondary" className="text-xs">
              50%
            </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {workspace.members.slice(0, 3).map((member) => (
                <Avatar key={member.user_id} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={member.picture || "/placeholder.svg"} alt={member.username} />
                  <AvatarFallback className="text-xs">
                    {member.username
                      .split(" ") 
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {workspace.members.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">+{workspace.members.length - 3}</span>
                </div>
              )}
            </div>
          </div>

          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: workspace.color }} />
        </div>
      </CardContent>
    </Card>
  )
}
