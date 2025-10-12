"use client"

import type { Workspace } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { TeamManagementDialog } from "./team-management-dialog"
import { Navigation } from "@/components/navigation"

interface WorkspaceHeaderProps {
  workspace: Workspace
}

export function BoardHeader({ workspace }: WorkspaceHeaderProps) {
  const user = useAuth((state) => state.user)
  const router = useRouter()
  const [showTeamManagement, setShowTeamManagement] = useState(false)

  return (
    <>
      <Navigation
        variant="board"
        boardTitle={workspace.name}
        boardColor={workspace.color}
        onBack={() => router.push("/dashboard")}
      />

      <div className="border-b bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {workspace.description && <p>{workspace.description}</p>}
            </div>

            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-muted rounded-lg p-2 transition-colors"
                onClick={() => setShowTeamManagement(true)}
              >
                <Users className="h-4 w-4 text-muted-foreground" />
                {/* <div className="flex -space-x-2">
                  {boardMembers.slice(0, 4).map((member) => (
                    <Avatar key={member.id} className="h-7 w-7 border-2 border-background">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {boardMembers.length > 4 && (
                    <div className="h-7 w-7 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">+{boardMembers.length - 4}</span>
                    </div>
                  )}
                </div> */}
              </div>

              <Button variant="outline" size="sm" onClick={() => setShowTeamManagement(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Équipe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* <TeamManagementDialog open={showTeamManagement} onOpenChange={setShowTeamManagement} board={board} /> */}
    </>
  )
}
