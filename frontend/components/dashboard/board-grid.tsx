"use client"

import type { Board } from "@/lib/store"
import { BoardCard } from "./board-card"

interface BoardGridProps {
  boards: Board[]
}

export function BoardGrid({ boards }: BoardGridProps) {
  const activeBoards = boards.filter((board) => !board.isArchived)

  if (activeBoards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md">
          <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded bg-muted-foreground/20" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Aucun projet pour le moment</h3>
          <p className="text-muted-foreground mb-4">Créez votre premier projet pour commencer à organiser vos tâches</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {activeBoards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  )
}
