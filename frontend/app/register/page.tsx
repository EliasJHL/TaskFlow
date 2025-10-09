"use client"

import { useAuth } from "@/lib/auth"
import { RegisterForm } from "@/components/auth/register-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { ArrowLeft, LayoutGrid, Sparkles } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      redirect("/dashboard")
    }
  }, [user])
  
  return (
    <div className="min-h-screen bg-background relative">
      <nav className="fixed top-0 left-0 right-0 z-50 py-6">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Back</span>
          </Link>
          
          <div className="flex items-center gap-2 justify-center w-full">
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

      {/* Contenu principal */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-20">
        <div className="w-full max-w-md space-y-8">
          {/* En-tête */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              <Sparkles className="w-4 h-4" />
              Gratuit pour toujours
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">
              Commencez gratuitement
            </h1>
            <p className="text-lg text-muted-foreground">
              Créez votre compte et organisez vos projets en quelques secondes
            </p>
          </div>

          {/* Formulaire d'inscription */}
          <RegisterForm />

          {/* Lien de connexion */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Se connecter
              </Link>
            </p>
          </div>

          {/* Mention légale */}
          <p className="text-xs text-muted-foreground text-center max-w-sm mx-auto">
            En créant un compte, vous acceptez nos{" "}
            <Link href="/terms" className="underline hover:text-foreground">
              conditions d'utilisation
            </Link>{" "}
            et notre{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
