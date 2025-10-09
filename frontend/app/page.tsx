"use client"

import { useAuth } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Users, Calendar, TrendingUp, CheckCircle2, ArrowRight, Sparkles, Zap, Target } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (user) {
    return null // Will redirect
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background relative">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-6"}`}>
        <div
          className={`mx-auto transition-all duration-300 ${
            scrolled
              ? "max-w-4xl px-6 py-3 bg-background/80 backdrop-blur-lg border border-border rounded-full shadow-lg"
              : "max-w-7xl px-8"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img
                src="https://i.ibb.co/svnNFVFW/download-1.png"
                alt="Logo"
                className="w-10 h-10 rounded-lg object-cover"
                />
              <span className="text-xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("discover")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Découvrir
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Fonctionnement
              </button>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/login">
                <Button size={scrolled ? "sm" : "default"}>
                  Se connecter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Gestion de projets moderne
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-balance">
            Organisez vos projets avec{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              simplicité
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Une alternative épurée à Trello. Gérez vos tâches, collaborez avec votre équipe et suivez vos projets en
            temps réel.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Commencer gratuitement
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("discover")}>
              En savoir plus
            </Button>
          </div>

          <div className="pt-12">
            <div className="relative rounded-2xl border border-border bg-muted/30 p-2 shadow-2xl">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <img
                  src="https://www.sysnove.fr/images/blog/trello-board.png"
                  alt="Aperçu de l'interface"
                  className="rounded-lg shadow-lg mx-auto w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="discover" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Tout ce dont vous avez besoin</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des fonctionnalités puissantes dans une interface épurée
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <LayoutGrid className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tableaux Kanban</h3>
              <p className="text-muted-foreground">
                Organisez vos tâches en colonnes personnalisables avec drag & drop fluide
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-muted-foreground">
                Assignez des tâches à votre équipe et suivez la progression en temps réel
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dates limites</h3>
              <p className="text-muted-foreground">
                Définissez des échéances et recevez des notifications pour ne rien manquer
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vue Roadmap</h3>
              <p className="text-muted-foreground">
                Visualisez vos projets dans le temps avec une timeline interactive
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mode sombre</h3>
              <p className="text-muted-foreground">
                Interface adaptative avec thème clair et sombre pour votre confort
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Design épuré</h3>
              <p className="text-muted-foreground">
                Interface minimaliste et intuitive pour se concentrer sur l'essentiel
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Comment ça fonctionne</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Commencez à organiser vos projets en quelques étapes simples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="text-xl font-semibold">Créez un projet</h3>
              <p className="text-muted-foreground">
                Commencez par créer un nouveau board pour votre projet avec un nom et une couleur
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="text-xl font-semibold">Ajoutez des tâches</h3>
              <p className="text-muted-foreground">
                Créez des colonnes et ajoutez vos tâches. Glissez-déposez pour les organiser
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="text-xl font-semibold">Collaborez</h3>
              <p className="text-muted-foreground">
                Invitez votre équipe, assignez des tâches et suivez la progression ensemble
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center space-y-6">
            <CheckCircle2 className="w-12 h-12 mx-auto text-primary" />
            <h3 className="text-2xl font-bold">Prêt à commencer ?</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Rejoignez des milliers d'équipes qui utilisent {process.env.NEXT_PUBLIC_APP_NAME} pour gérer leurs projets efficacement
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Commencer maintenant
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>©2025 {process.env.NEXT_PUBLIC_APP_NAME}. Une alternative moderne à Trello.</p>
        </div>
      </footer>
    </div>
  )
}
