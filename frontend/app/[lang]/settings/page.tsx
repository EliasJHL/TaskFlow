"use client"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, User, Bell, Palette, Shield } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTranslation } from "react-i18next"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { t, i18n } = useTranslation("common")
  const currentLang = i18n.language

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [taskNotifications, setTaskNotifications] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push(`/${currentLang}`)
    } else {
      setName(user.username)
      setEmail(user.email)
    }
  }, [user, router, currentLang])

  if (!user) return null

  const handleSave = () => {
    console.log("Saving settings:", { name, email, emailNotifications, taskNotifications })
  }

  const handleLogout = () => {
    logout()
    router.push(`/${currentLang}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href={`/${currentLang}/dashboard`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{t("settings_title")}</h1>
            <p className="text-muted-foreground">{t("settings_subtitle")}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <CardTitle>{t("settings_profile")}</CardTitle>
              </div>
              <CardDescription>{t("settings_profile_desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.picture || "/placeholder.svg"} />
                  <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("settings_username")}</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("settings_email")}</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>{t("settings_notifications")}</CardTitle>
              </div>
              <CardDescription>{t("settings_notifications_desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings_email_notifications")}</Label>
                  <p className="text-sm text-muted-foreground">{t("settings_email_notifications_desc")}</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings_task_notifications")}</Label>
                  <p className="text-sm text-muted-foreground">{t("settings_task_notifications_desc")}</p>
                </div>
                <Switch checked={taskNotifications} onCheckedChange={setTaskNotifications} />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                <CardTitle>{t("settings_appearance")}</CardTitle>
              </div>
              <CardDescription>{t("settings_appearance_desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings_theme")}</Label>
                  <p className="text-sm text-muted-foreground">{t("settings_theme_desc")}</p>
                </div>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>

          {/* Account */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>{t("settings_account")}</CardTitle>
              </div>
              <CardDescription>{t("settings_account_desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="flex gap-3">
                <Button onClick={handleSave} className="flex-1">
                  {t("settings_save")}
                </Button>
                <Button onClick={handleLogout} variant="destructive">
                  {t("settings_logout")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
