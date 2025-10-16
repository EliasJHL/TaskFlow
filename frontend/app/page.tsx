"use client"

import { useAuth } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { GithubButton } from "@/components/github"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { HomeBackground } from "@/components/home-background"
import { LayoutGrid, Users, Calendar, TrendingUp, CheckCircle2, ArrowRight, Sparkles, Zap, Target } from "lucide-react"
import Link from "next/link"
import { Github, Server, Lock, Check, Code2, Shield, Database, GitBranch, X, Rocket } from "lucide-react"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
  }, [user, router])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background relative">
      <HomeBackground />
      <div className="relative z-10">
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
                <span className="hidden sm:inline text-xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("discover")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Discover
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How it works
              </button>
            </div>

            <div className="flex items-center gap-4">
              <GithubButton />
              <ThemeToggle />
              <Link href={user ? "/dashboard" : "/login"}>
                <Button size={scrolled ? "sm" : "default"} id="login-button" >
                  {user ? "Dashboard" : "Login"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
             <div className="flex items-center gap-3 text-xs justify-center flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background/50 backdrop-blur-sm">
                <svg className="w-3.5 h-3.5" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
                <span className="text-muted-foreground">Next.js</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-border" />

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background/50 backdrop-blur-sm">
                <Server className="w-3.5 h-3.5" />
                <span className="text-muted-foreground">Fastify GraphQL</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-border" />

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background/50 backdrop-blur-sm">
                <Database className="w-3.5 h-3.5" />
                <span className="text-muted-foreground">PostgreSQL</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-border" />

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background/50 backdrop-blur-sm">
                <Code2 className="w-3.5 h-3.5" />
                <span className="text-muted-foreground">Prisma ORM</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-balance">
            Organize your projects with{" "}
            <span className="inline-block bg-gradient-to-r from-[#00FFBBFF] to-[#00D4C3FF] bg-clip-text text-transparent">
              simplicity
            </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            A clean alternative to Trello. Manage your tasks, collaborate with your team, and track your projects in real time.
            </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="gap-2 w-full sm:w-auto border-0 border-primary rounded-2xl backdrop-blur-md bg-gradient-to-r from-[#007757FF] to-[#00D4C3FF] text-white hover:brightness-110 transition-transform duration-200 hover:scale-105"
                >
                  Try for free
                  <ArrowRight className="w-5 h-5" />
                </Button>
            </Link>
            <Button
                size="lg"
                variant="outline"
                className="gap-2 w-full sm:w-auto rounded-2xl"
                onClick={() => window.open("https://github.com/eliasjhl/taskflow", "_blank")}
              >
                <GitBranch className="w-5 h-5" />
                Voir sur GitHub
              </Button>
          </div>

          <div className="pt-12">
            <div className="relative rounded-2xl border border-border bg-muted/30 p-2 shadow-2xl">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <img
                  src="https://www.atlassian.com/blog/wp-content/uploads/2024/01/trello-like-a-pro-final-1.png"
                  alt="Aperçu de l'interface"
                  className="rounded-lg shadow-lg mx-auto w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="discover" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Fonctionnalités Clés</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour gérer vos projets efficacement
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <LayoutGrid className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Système de Workspaces</h3>
              <p className="text-muted-foreground">
                Organisez plusieurs projets avec gestion de membres, rôles (Admin, Member, Guest) et permissions
                granulaires pour chaque workspace.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Boards Kanban</h3>
              <p className="text-muted-foreground">
                Tableaux personnalisables avec listes et cartes déplaçables en drag-and-drop. Organisez vos tâches
                visuellement et intuitivement.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration Temps Réel</h3>
              <p className="text-muted-foreground">
                Travaillez en équipe avec des mises à jour instantanées. Voyez les modifications de vos collègues en
                direct sans rafraîchir la page.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion Complète des Tâches</h3>
              <p className="text-muted-foreground">
                Assignation multi-utilisateurs, étiquettes colorées, dates limites, descriptions riches, commentaires
                et pièces jointes pour chaque tâche.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Timeline & Roadmap</h3>
              <p className="text-muted-foreground">
                Visualisez vos projets dans le temps avec des vues calendrier, timeline et roadmap. Planifiez à long
                terme et suivez les échéances.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentification Sécurisée</h3>
              <p className="text-muted-foreground">
                Système d'authentification moderne avec gestion des sessions, protection des données et sécurité
                renforcée pour vos projets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="philosophy" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Philosophie du Projet</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Les valeurs qui guident le développement de TaskFlow
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10">
              <Lock className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Souveraineté des Données</h3>
              <p className="text-muted-foreground leading-relaxed">
                Vos données vous appartiennent. Hébergez TaskFlow où vous le souhaitez, gardez le contrôle total et
                profitez d'une transparence complète sur le traitement de vos informations.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10">
              <GitBranch className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Open Source Complet</h3>
              <p className="text-muted-foreground leading-relaxed">
                Code source transparent et accessible à tous. Les contributions sont bienvenues et la communauté est
                au cœur du développement. Ensemble, construisons un meilleur outil.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10">
              <TrendingUp className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Performance Avant Tout</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tests de charge avec k6, optimisations continues et architecture pensée pour la vitesse. Chaque
                milliseconde compte pour offrir une expérience fluide et réactive.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Design Thoughtful</h3>
              <p className="text-muted-foreground leading-relaxed">
                Interface élégante avec attention aux détails : particules animées, transitions fluides, thème sombre
                soigné. Le design au service de la productivité et du plaisir d'utilisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold">Architecture Technique</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Une stack moderne et performante pour une application robuste
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-2xl bg-background border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-semibold">Backend</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">API GraphQL</strong>
                      <p className="text-sm text-muted-foreground">
                        Fastify avec Mercurius pour des requêtes optimisées et type-safe
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Prisma ORM</strong>
                      <p className="text-sm text-muted-foreground">
                        Gestion de données robuste avec migrations et types TypeScript
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">PostgreSQL</strong>
                      <p className="text-sm text-muted-foreground">
                        Base de données relationnelle fiable et performante
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-background border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Code2 className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-semibold">Frontend</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Next.js 15</strong>
                      <p className="text-sm text-muted-foreground">
                        Framework React moderne avec App Router et Server Components
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Tailwind CSS</strong>
                      <p className="text-sm text-muted-foreground">Design system cohérent avec dark mode natif</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">shadcn/ui</strong>
                      <p className="text-sm text-muted-foreground">
                        Composants réutilisables et accessibles pour une UX premium
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-semibold">Infrastructure & Déploiement</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Docker Compose</h4>
                  <p className="text-sm text-muted-foreground">
                    Orchestration multi-conteneurs pour dev et prod avec configuration séparée
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Support Kubernetes</h4>
                  <p className="text-sm text-muted-foreground">
                    Prêt pour le scaling horizontal et déploiement cloud-native
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Multi-environnement</h4>
                  <p className="text-sm text-muted-foreground">
                    Gestion propre des environnements dev/staging/prod avec variables d'environnement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Pourquoi TaskFlow ?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comparaison avec les solutions propriétaires
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white/70 dark:bg-black/20 backdrop-blur-md rounded-2xl">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left font-semibold">Fonctionnalité</th>
                  <th className="p-4 text-center font-semibold">TaskFlow</th>
                  <th className="p-4 text-center font-semibold text-muted-foreground">Trello</th>
                  <th className="p-4 text-center font-semibold text-muted-foreground">Asana</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4">Open Source</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">Self-Hosted</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">Utilisateurs illimités</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  </td>
                  <td className="p-4 text-center text-sm text-muted-foreground">Limité</td>
                  <td className="p-4 text-center text-sm text-muted-foreground">Limité</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">Toutes les fonctionnalités</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  </td>
                  <td className="p-4 text-center text-sm text-muted-foreground">Payant</td>
                  <td className="p-4 text-center text-sm text-muted-foreground">Payant</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4">Contrôle des données</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4">API GraphQL moderne</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  </td>
                  <td className="p-4 text-center text-sm text-muted-foreground">REST</td>
                  <td className="p-4 text-center text-sm text-muted-foreground">REST</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Rejoignez la Communauté</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Contribuez au développement et façonnez l'avenir de TaskFlow
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <GitBranch className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Contribuer</h3>
              <p className="text-muted-foreground mb-4">
                Guidelines claires pour issues, PRs et suggestions de features
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://github.com/eliasjhl/taskflow/contribute", "_blank")}
              >
                Voir le guide
              </Button>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Roadmap</h3>
              <p className="text-muted-foreground mb-4">
                Fonctionnalités prévues : intégrations, app mobile, plugins
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://github.com/eliasjhl/taskflow/roadmap", "_blank")}
              >
                Voir la roadmap
              </Button>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <Users className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Support</h3>
              <p className="text-muted-foreground mb-4">Documentation complète et discussions communautaires</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://github.com/eliasjhl/taskflow/discussions", "_blank")}
              >
                Rejoindre
              </Button>
            </div>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center space-y-6">
            <Rocket className="w-12 h-12 mx-auto text-primary" />
            <h3 className="text-2xl font-bold">Prêt à reprendre le contrôle ?</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Déployez TaskFlow sur votre infrastructure et profitez d'une gestion de projets moderne, transparente
              et respectueuse de vos données.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Essayer maintenant
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => window.open("https://github.com/eliasjhl/taskflow", "_blank")}
              >
                <GitBranch className="w-5 h-5" />
                Cloner le repo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
            <p>©2025 {process.env.NEXT_PUBLIC_APP_NAME}. A modern alternative to Trello.</p>
        </div>
      </footer>
      </div>
    </div>
  )
}
