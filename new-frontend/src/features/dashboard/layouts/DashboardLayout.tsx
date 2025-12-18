/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** DashboardLayout
*/

import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutGrid, Settings, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

export const DashboardLayout = () => {
  const location = useLocation();

  const NavItem = ({ href, icon: Icon, label }: any) => {
    const isActive = location.pathname === href;
    return (
      <Link to={href}>
        <div className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}>
          <Icon className="w-4 h-4" />
          {label}
        </div>
      </Link>
    );
  };

  return (
    <div className="flex h-screen w-full bg-background">
      
      <aside className="w-64 border-r border-border bg-card/50 flex flex-col">
        
        <div className="h-16 flex items-center px-6 border-b border-border/50">
           <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold mr-2">T</div>
           <span className="font-bold text-lg tracking-tight">TaskFlow</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Menu</div>
          <NavItem href="/app" icon={LayoutGrid} label="Workspaces" />
          <NavItem href="/app/settings" icon={Settings} label="Paramètres" />
        </nav> 

        <div className="p-4 border-t border-border/50">
           <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground">Thème</span>
              <div className="scale-75 origin-right"><AnimatedThemeToggler /></div>
           </div>
           <Button variant="outline" className="w-full justify-start text-muted-foreground" size="sm">
             <LogOut className="w-4 h-4 mr-2" /> Déconnexion
           </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-8 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
           <h1 className="font-semibold text-lg">Dashboard</h1>
           <div className="flex items-center gap-2">
             <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-blue-500"></div>
           </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
};