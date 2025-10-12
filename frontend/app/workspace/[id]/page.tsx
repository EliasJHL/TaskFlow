"use client"

import { useAuth } from "@/lib/auth"
import { useStore, Workspace } from "@/lib/store"
import { redirect, useParams } from "next/navigation"
import { use, useEffect, useState } from "react"
import { BoardHeader } from "@/components/board/board-header"
import { BoardView } from "@/components/board/board-view"

export default function BoardPage() {
  const [displayedWorkspace, setDisplayedWorkspace] = useState<Workspace | null>(null);
  const { user } = useAuth()
  const boards = useStore((state) => state.boards)
  const getBoards = useStore((state) => state.getBoards) 
  const getWorkspaces = useStore((state) => state.getWorkspaces)
  const workspace = useStore((state) => state.currentWorkspace)
  const setCurrentWorkspace = useStore((state) => state.setCurrentWorkspace)
  const isLoading = useStore((state) => state.isLoading)
  const params = useParams()
  const workspaceId = params.id as string

  const board = boards.find((b) => b.workspaceId === workspaceId)

  useEffect(() => {
    if (!user) {
      redirect("/")
    }
    if (workspaceId) {
      (async () => {
        await getWorkspaces();
        const ws = useStore.getState().workspaces.find(w => w.workspaceId === workspaceId) || null;
        setCurrentWorkspace(ws);
        setDisplayedWorkspace(ws);
      })();
      getBoards(workspaceId || "");
    }
  }, [user, workspaceId]);

  if (!user) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {
        isLoading &&
        <div className="animate-pulse space-y-2 p-4 bg-gray-200 rounded-md max-w-xl mx-auto">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      }
      {!isLoading && displayedWorkspace && <BoardHeader key={displayedWorkspace.workspaceId} workspace={displayedWorkspace} />}
      {/* <BoardView board={board} /> */}
    </div>
  )
}
