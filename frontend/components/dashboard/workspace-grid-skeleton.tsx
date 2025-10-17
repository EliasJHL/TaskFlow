"use client"

import type { Workspace } from "@/lib/store"
import { WorkspaceCardSkeleton } from "./workspace-card-skeleton"

interface WorkspacesGridProps {
  workspaces: Workspace[]
}

export function WorkspacesGridSkeleton() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <WorkspaceCardSkeleton key={index} />
      ))}
    </div>
  )
}
