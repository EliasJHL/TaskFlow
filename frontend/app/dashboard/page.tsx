"use client"

import { useAuth } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BoardGrid } from "@/components/dashboard/board-grid"
import { CreateBoardDialog } from "@/components/dashboard/create-board-dialog"
import { DueDateNotifications } from "@/components/dashboard/due-date-notifications"

export default function DashboardPage() {
  const { boards } = useStore()
  const user = useAuth((state) => state.user)

  useEffect(() => {
    if (!user) {
      redirect("/")
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance">Your pinned Workspaces</h1>
                <p className="text-muted-foreground mt-2">Quick access to your most important workspaces</p>
              </div>
            </div>

            <BoardGrid boards={boards} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <DueDateNotifications />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance">Your Workspaces</h1>
                <p className="text-muted-foreground mt-2">Manage your projects and collaborate with your team</p>
              </div>
              <CreateBoardDialog />
            </div>

            <BoardGrid boards={boards} />
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance">Workspaces</h1>
                <p className="text-muted-foreground mt-2">Other workspaces you collaborate on</p>
              </div>
            </div>

            <BoardGrid boards={boards} />
          </div>
        </div>
      </main>
    </div>
  )
}
