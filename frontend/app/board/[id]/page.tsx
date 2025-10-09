"use client"

import { useAuth } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { redirect, useParams } from "next/navigation"
import { useEffect } from "react"
import { BoardHeader } from "@/components/board/board-header"
import { BoardView } from "@/components/board/board-view"

export default function BoardPage() {
  const { user } = useAuth()
  const { boards, setCurrentBoard } = useStore()
  const params = useParams()
  const boardId = params.id as string

  const board = boards.find((b) => b.id === boardId)

  useEffect(() => {
    if (!user) {
      redirect("/")
    }
    if (boardId) {
      setCurrentBoard(boardId)
    }
  }, [user, boardId, setCurrentBoard])

  if (!user) {
    return null // Will redirect
  }

  if (!board) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Projet introuvable</h1>
          <p className="text-muted-foreground">Ce projet n'existe pas ou vous n'y avez pas accès.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <BoardHeader board={board} />
      <BoardView board={board} />
    </div>
  )
}
