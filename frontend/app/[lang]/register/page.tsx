"use client"

import { RegisterForm } from "@/components/auth/register-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTranslation } from "next-i18next";
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { ParticlesBackground } from "@/components/ui/particles-background"

export default function RegisterPage({ params }: { params: { lang: string } }) {
    const { lang } = params;
    const { t } = useTranslation("common");
    return (
      <div className="min-h-screen bg-background relative pb-16">
        <ParticlesBackground />
        <nav className="fixed top-0 left-0 right-0 z-50 py-6 backdrop-blur-[1px] bg-background/80 h-16 ">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
            <Link href={`/${lang}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">{t("back")}</span>
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

        <div className="flex items-center justify-center min-h-screen px-4 pt-20">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                <Sparkles className="w-4 h-4" />
                {t("register_bubble")}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold">
                {t("register_title")}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("register_description")}
              </p>
            </div>

            <RegisterForm lang={lang} />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {t("register_have_account")}{" "}
                <Link href={`/${lang}/login`} className="text-primary font-medium hover:underline">
                {t("register_sign_in")}
                </Link>
              </p>
            </div>

              <p className="text-xs text-muted-foreground text-center max-w-sm mx-auto">
              {t("register_msg")}{" "}
              <Link href="/terms" className="underline hover:text-foreground">
                {t("register_terms")}
              </Link>{" "}
              {t("and")}{" "}
              <Link href="/privacy" className="underline hover:text-foreground">
                {t("register_privacy")}
              </Link>
              .
              </p>
          </div>
        </div>
      </div>
    );
}
