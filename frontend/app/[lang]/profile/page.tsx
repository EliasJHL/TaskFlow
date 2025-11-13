"use client"

import { useAuth } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, CheckCircle2, Clock, FolderKanban, Mail, TrendingUp, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function ProfilePage() {
  const user = useAuth((state) => state.user)
  const { workspaces, cards } = useStore()
  const router = useRouter()
  const { i18n, t } = useTranslation("common")
  const currentLang = i18n.language

  useEffect(() => {
    if (!user) {
      router.push(`/${currentLang}`)
    }
  }, [user, router, currentLang])

  if (!user) return null

  const recentTasks = [...cards].slice(0, 5)

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Link href={`/${currentLang}/dashboard`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight">{t("profile_title")}</h1>
            <p className="mt-2 text-muted-foreground">{t("profile_subtitle")}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.picture || "/placeholder.svg"} alt={user.username} />
                  <AvatarFallback className="text-2xl">{getInitials(user.username)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-2xl font-bold">{user.username}</h2>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4 font-semibold">{t("profile_statistics")}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <FolderKanban className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("profile_workspaces")}</p>
                      <p className="text-2xl font-bold">{workspaces.length}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("profile_finished_tasks")}</p>
                      <p className="text-2xl font-bold">N/A</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                      <Clock className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("profile_in_progress")}</p>
                      <p className="text-2xl font-bold">N/A</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">{t("profile_progress")}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">{t("profile_recent_activity")}</h3>
              {/* TODO: Display recentTasks */}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
