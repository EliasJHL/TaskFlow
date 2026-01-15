import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Github } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const isAuthenticated = false; 

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/src/assets/TaskFlow.svg" alt="TaskFlow Logo" className="h-12 w-12" />
            <span className="font-bold text-xl hidden sm:inline-block tracking-tight">
              TaskFlow
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
            <Link to="/features" className="transition-colors hover:text-foreground">Fonctionnalités</Link>
            <Link to="/pricing" className="transition-colors hover:text-foreground">Tarifs</Link>
            <Link to="/docs" className="transition-colors hover:text-foreground">Docs</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          
          <a 
            href="https://github.com/ton-repo/taskflow" 
            target="_blank" 
            rel="noreferrer"
            className="hidden lg:flex"
          >
             <Button variant="outline" size="sm" className="gap-2 bg-background/50 backdrop-blur-sm border-border/60 text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border">
                <Github className="h-4 w-4" />
                <span>Star on GitHub</span>
                <span className="ml-1 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                  2.4k {/* à REMPLACER */}
                </span>
             </Button>
          </a>

          <div className="h-6 w-px bg-border/50 hidden md:block" />

          <LanguageSwitcher />
          <div className="scale-90">
              <AnimatedThemeToggler />
          </div>

          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-2 ml-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Connexion</Link>
              </Button>
              <Button size="sm" className="rounded-full px-6" onClick={() => navigate('/register')}>
                Commencer
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};