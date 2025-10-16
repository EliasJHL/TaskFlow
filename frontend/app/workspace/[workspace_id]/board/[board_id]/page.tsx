"use client"

import { useAuth } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { use, useEffect } from "react"
import { BoardHeader } from "@/components/board/board-header"
import { BoardView } from "@/components/board/board-view"

export default function BoardPage({
  params,
}: {
  params: Promise<{ workspace_id: string; board_id: string }>
}) {
  const { user } = useAuth()
  const router = useRouter()
  const board = useStore((state) => state.currentBoard)
  const getBoard = useStore((state) => state.getBoard)
  const getBoards = useStore((state) => state.getBoards)
  const getWorkspace = useStore((state) => state.getWorkspace)  // ✅ Utilise getWorkspace au lieu de getWorkspaces
  const workspace = useStore((state) => state.currentWorkspace)
  const isLoading = useStore((state) => state.isLoading)
  const { workspace_id: workspaceId, board_id: boardId } = use(params)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    
    const loadData = async () => {
      console.log('📡 Loading data for board:', boardId)
      
      // ✅ 1. Charge le workspace spécifique
      await getWorkspace(workspaceId)
      
      // ✅ 2. Charge les boards du workspace
      await getBoards(workspaceId)
      
      // ✅ 3. Sélectionne le board depuis le cache
      await getBoard(boardId)
      
      console.log('✅ All data loaded')
    }
    
    loadData()
  }, [user, workspaceId, boardId, router, getWorkspace, getBoards, getBoard])

  if (!user) return null

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse space-y-2 p-4 bg-gray-200 dark:bg-gray-800 rounded-md max-w-xl mx-auto">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
          <p className="text-muted-foreground mt-4">Loading board...</p>
        </div>
      </div>
    )
  }

  if (!workspace || !board) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">
            {!workspace ? 'Workspace not found' : 'Board not found'}
          </p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <BoardHeader workspace={workspace} board={board} />
      <BoardView board={board} />
    </div>
  )
}
