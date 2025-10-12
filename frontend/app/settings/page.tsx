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

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [taskNotifications, setTaskNotifications] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/")
    } else {
    //   setName(user.name)
      setEmail(user.email)
    }
  }, [user, router])

  if (!user) return null

  const handleSave = () => {
    console.log("Saving settings:", { name, email, emailNotifications, taskNotifications })
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Paramètres</h1>
            <p className="text-muted-foreground">Gérez vos préférences et votre compte</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <CardTitle>Profil</CardTitle>
              </div>
              <CardDescription>Informations personnelles et avatar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {/* <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar> */}
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Gérez vos préférences de notification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des emails pour les mises à jour</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications de tâches</Label>
                  <p className="text-sm text-muted-foreground">Alertes pour les tâches assignées</p>
                </div>
                <Switch checked={taskNotifications} onCheckedChange={setTaskNotifications} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                <CardTitle>Apparence</CardTitle>
              </div>
              <CardDescription>Personnalisez l'apparence de l'application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thème</Label>
                  <p className="text-sm text-muted-foreground">Basculer entre mode clair et sombre</p>
                </div>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Compte</CardTitle>
              </div>
              <CardDescription>Gérez votre compte et vos données</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rôle</Label>
                  {/* <p className="text-sm text-muted-foreground capitalize">{user.role}</p> */}
                </div>
              </div>
              <Separator />
              <div className="flex gap-3">
                <Button onClick={handleSave} className="flex-1">
                  Enregistrer les modifications
                </Button>
                <Button onClick={handleLogout} variant="destructive">
                  Se déconnecter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
