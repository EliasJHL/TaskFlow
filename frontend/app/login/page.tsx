"use client"

import { useAuth } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ParticlesBackground } from "@/components/ui/particles-background"

export default function LoginPage() {
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      redirect("/dashboard")
    }
  }, [user])
  
  return (
    <div className="min-h-screen bg-background">  {/* Retiré 'relative' */}
      <ParticlesBackground />
      
      <nav className="fixed top-0 left-0 right-0 z-50 py-6">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Back</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <img
              src="https://i.ibb.co/svnNFVFW/download-1.png"
              alt="Logo"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <span className="text-xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          </div>

          <ThemeToggle />
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-screen px-4 pt-20 relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">
              Welcome back
            </h1>
            <p className="text-lg text-muted-foreground">
              Log in to access your projects
            </p>
          </div>

          <LoginForm />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
