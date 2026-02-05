import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Github } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [stars, setStars] = useState<number | null>(null);
  
  if (!t) return null;

  const repo = useMemo(() => "eliasjhl/taskflow", []);
  const repoUrl = `https://github.com/${repo}`;

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.stargazers_count) return;
        setStars(data.stargazers_count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [repo]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/TaskFlow.svg" alt="TaskFlow Logo" className="h-12 w-12" />
            <span className="font-bold text-xl hidden sm:inline-block tracking-tight">
              TaskFlow
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
            <Link to="/features" className="transition-colors hover:text-foreground">
              {t("header.features")}
            </Link>
            <Link to="/pricing" className="transition-colors hover:text-foreground">
              {t("header.pricing")}
            </Link>
            <Link to="/docs" className="transition-colors hover:text-foreground">
              {t("header.docs")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          
          <a 
            href={repoUrl}
            target="_blank" 
            rel="noreferrer"
            className="hidden lg:flex"
          >
             <Button variant="outline" size="sm" className="gap-2 bg-background/50 backdrop-blur-sm border-border/60 text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border">
                <Github className="h-4 w-4" />
                <span>{t("header.github_star")}</span>
                {stars !== null && (
                  <span className="ml-1 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                    {Intl.NumberFormat().format(stars)}
                  </span>
                )}
             </Button>
          </a>

          <div className="h-6 w-px bg-border/50 hidden md:block" />

          <LanguageSwitcher />
          <div className="scale-90">
              <AnimatedThemeToggler />
          </div>

          <div className="hidden md:flex items-center gap-2 ml-2">
            {isAuthenticated ? (
              <Button size="sm" className="rounded-full px-6" asChild>
                <Link to="/app">{t("header.my_space")}</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">{t("header.login")}</Link>
                </Button>
                <Button size="sm" className="rounded-full px-6" asChild>
                  <Link to="/register">{t("header.start")}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
