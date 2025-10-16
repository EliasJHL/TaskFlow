"use client"

import type { Workspace, Board } from "@/lib/store"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"

interface BoardHeaderProps {
  workspace: Workspace
  board: Board
}

export function BoardHeader({ workspace, board }: BoardHeaderProps) {
  const router = useRouter()
  

  return (
    <>
      <Navigation
        variant="board"
        boardTitle={`${workspace.name}/${board.title}`}
        boardColor={board.color}
        onBack={() => router.push("/dashboard")}
      />

      <div className="border-b bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {board.description && <p>{board.description}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
