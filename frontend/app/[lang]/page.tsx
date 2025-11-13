"use client";

import { useAuth } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubButton } from "@/components/github";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HomeBackground } from "@/components/home-background";
import {
  LayoutGrid,
  Users,
  Calendar,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function HomePage({ params }: { params: { lang: string } }) {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation("common");
  const { lang } = params;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <HomeBackground />
      <div className="relative z-10">
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? "py-3" : "py-6"
          }`}
        >
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
                <span className="hidden sm:inline text-xl font-bold">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <button
                  onClick={() => scrollToSection("discover")}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("discover")}
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("how_it_works")}
                </button>
              </div>

              <div className="flex items-center gap-4">
                <GithubButton />
                <ThemeToggle />
                <Link href={user ? `/${lang}/dashboard` : `/${lang}/login`}>
                  <Button size={scrolled ? "sm" : "default"} id="login-button">
                    {user ? t("dashboard") : t("login")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <div className="flex items-center gap-3 text-xs justify-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border">
                <svg className="w-3.5 h-3.5" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
                <span className="text-muted-foreground">Next.js</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-border" />

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border">
                <Users className="w-3.5 h-3.5" />
                <span className="text-muted-foreground">Fastify GraphQL</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-balance">
              {t("welcome")}{" "}
              <span className="inline-block bg-gradient-to-r from-[#007757FF] to-[#00D4C3FF] bg-clip-text text-transparent">
                {t("simplicity")}
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              {t("a_clean_alternative")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="gap-2 w-full sm:w-auto border-1 border-primary rounded-2xl backdrop-blur-md bg-gradient-to-r from-[#007757FF] to-[#00D4C3FF] text-white hover:brightness-110 transition-transform duration-200 hover:scale-105"
                >
                  {t("try_for_free")}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
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
              <h2 className="text-4xl md:text-5xl font-bold">{t("everything_you_need")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("powerful_features")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <LayoutGrid className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("kanban_boards")}</h3>
                <p className="text-muted-foreground">{t("kanban_description")}</p>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("collaboration")}</h3>
                <p className="text-muted-foreground">{t("collaboration_description")}</p>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("due_dates")}</h3>
                <p className="text-muted-foreground">{t("due_dates_description")}</p>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("roadmap_view")}</h3>
                <p className="text-muted-foreground">{t("roadmap_description")}</p>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("dark_mode")}</h3>
                <p className="text-muted-foreground">{t("dark_mode_description")}</p>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("clean_design")}</h3>
                <p className="text-muted-foreground">{t("clean_design_description")}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center space-y-6">
              <CheckCircle2 className="w-12 h-12 mx-auto text-primary" />
              <h3 className="text-2xl font-bold">{t("ready_to_get_started")}</h3>
              <p className="text-muted-foreground max-w-xl mx-auto">{t("join_thousands")}</p>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  {t("get_started_now")}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-12 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
            <p>©2025 {process.env.NEXT_PUBLIC_APP_NAME}. {t("all_rights_reserved")}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
