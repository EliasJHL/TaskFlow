"use client"

import { LoginForm } from "@/components/auth/login-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "next-i18next";
import { ParticlesBackground } from "@/components/ui/particles-background"

export default function LoginPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const { t } = useTranslation("common");
  return (
    <div className="min-h-screen w-screen bg-background overflow-hidden">
      <ParticlesBackground />
      
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 backdrop-blur-[1px] bg-background/80">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">{t("back")}</span>
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
        <div className="w-full max-w-md space-y-8 backdrop-blur-[1px] bg-background/80 pb-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">
              {t("login_title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("login_description")}
            </p>
          </div>

          <LoginForm lang={lang}/>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t("login_no_account")}{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                {t("login_sign_up")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
