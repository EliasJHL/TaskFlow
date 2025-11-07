"use client"

import { useAuth } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { WorkspacesGridSkeleton } from "@/components/dashboard/workspace-grid-skeleton"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WorkspacesGrid } from "@/components/dashboard/workspaces-grid"
import { CreateWorkspaceDialog } from "@/components/dashboard/create-workspace-dialog"
import { DueDateNotifications } from "@/components/dashboard/due-date-notifications"

export default function DashboardPage() {
  const workspaces = useStore((state) => state.workspaces)
  const getWorkspaces = useStore((state) => state.getWorkspaces)
  const isLoading = useStore((state) => state.isLoading)
  const user = useAuth((state) => state.user)

  useEffect(() => {
    if (!user) {
      redirect("/")
    }
    getWorkspaces()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {workspaces.some(w => w.isPinned) && (
            <>
              <div className="lg:col-span-3 space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-balance">Your pinned Workspaces</h1>
                    <p className="text-muted-foreground mt-2">Quick access to your most important workspaces</p>
                  </div>
                </div>

                {isLoading ? (
                  <WorkspacesGridSkeleton />
                ) : (
                  <WorkspacesGrid workspaces={workspaces.filter(w => w.isPinned === true)} />
                )}
              </div>
            </>
          )}

          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance">Your Workspaces</h1>
                <p className="text-muted-foreground mt-2">Manage your projects and collaborate with your team</p>
              </div>
              <CreateWorkspaceDialog />
            </div>

            {isLoading ? (
              <WorkspacesGridSkeleton />
            ) : (
              <WorkspacesGrid workspaces={workspaces.filter(w => w.owner.user_id === user?.user_id)} />
            )}
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance">Workspaces</h1>
                <p className="text-muted-foreground mt-2">Other workspaces you collaborate on</p>
              </div>
            </div>

            <WorkspacesGrid workspaces={workspaces} />
          </div>
        </div>
      </main>
    </div>
  )
}
