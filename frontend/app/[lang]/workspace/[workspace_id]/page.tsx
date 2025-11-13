"use client"

import { useAuth } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { use, useEffect } from "react"
import { WorkspaceHeader } from "@/components/workspace/workspace-header"
import { BoardsGrid } from "@/components/workspace/boards-grid"

export default function WorkspacePage({ 
  params 
}: { 
  params: Promise<{ workspace_id: string }>
}) {
  const { workspace_id } = use(params)
  
  const { user } = useAuth()
  const router = useRouter()
  const boards = useStore((state) => state.boards)
  const getBoards = useStore((state) => state.getBoards)
  const getWorkspace = useStore((state) => state.getWorkspace)
  const workspace = useStore((state) => state.currentWorkspace)
  const isLoading = useStore((state) => state.isLoading)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    
    if (workspace_id) {
      const loadData = async () => {
        await getWorkspace(workspace_id)
        await getBoards(workspace_id)
      }
      loadData()
    }
  }, [user, workspace_id, router, getBoards, getWorkspace])

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
          <p className="text-muted-foreground mt-4">Loading workspace...</p>
        </div>
      </div>
    )
  }

  if (!workspace) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Workspace not found</p>
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
      <WorkspaceHeader workspace={workspace} />
      <BoardsGrid boards={boards} />
    </div>
  )
}
