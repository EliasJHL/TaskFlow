"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User, Map, LayoutDashboard, ArrowLeft, Menu } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { cn } from "@/lib/utils"

interface FloatingNavigationProps {
  variant?: "dashboard" | "board"
  boardTitle?: string
  boardColor?: string
  onBack?: () => void
}

export function Navigation({ variant = "dashboard", boardTitle, boardColor, onBack }: FloatingNavigationProps) {
  const [compressed, setCompressed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setCompressed(window.scrollY > 50)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleScroll()
    handleResize()

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsSheetOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsSheetOpen(false)
  }

  if (!user) return null

  return (
    <>
      {compressed && <div className="h-16" />}

      <header
        className={cn(
          "z-50 transition-all duration-500 ease-out",
          "bg-background/60 backdrop-blur-xl border border-border/40",
          compressed
            ? "fixed top-4 left-1/2 -translate-x-1/2 rounded-full shadow-lg px-4 py-2 w-auto min-w-[400px]"
            : "sticky top-0 left-0 w-full px-6 py-4 border-b",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {variant === "board" && onBack && (
              <Button
                variant="ghost"
                size={compressed ? "sm" : "icon"}
                onClick={onBack}
                className={cn("transition-all", compressed && "h-8 w-8")}
              >
                <ArrowLeft className={cn("transition-all", compressed ? "h-3 w-3" : "h-4 w-4")} />
              </Button>
            )}

            {variant === "board" && boardTitle ? (
              <div className="flex items-center gap-2">
                {boardColor && (
                  <div
                    className={cn("rounded transition-all", compressed ? "h-3 w-3" : "h-4 w-4")}
                    style={{ backgroundColor: boardColor }}
                  />
                )}
                <h1
                  className={cn(
                    "font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent transition-all",
                    compressed ? "text-sm" : "text-xl",
                  )}
                >
                  {compressed ? boardTitle.slice(0, 20) + (boardTitle.length > 20 ? "..." : "") : boardTitle}
                </h1>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <img
                  src="https://i.ibb.co/svnNFVFW/download-1.png"
                  alt="Logo"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <h1
                  className={cn(
                    "font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent transition-all",
                    compressed ? "text-base" : "text-2xl",
                  )}
                >
                  {process.env.NEXT_PUBLIC_APP_NAME}
              </h1>
              </div>
            )}
          </div>

          {variant === "dashboard" && !compressed && !isMobile && (
            <div className="flex items-center gap-2">
              <Button
                variant={pathname === "/dashboard" ? "default" : "ghost"}
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={pathname === "/roadmap" ? "default" : "ghost"}
                size="sm"
                onClick={() => router.push("/roadmap")}
                className="gap-2"
              >
                <Map className="h-4 w-4" />
                Roadmap
              </Button>
            </div>
          )}

          <div className="flex items-center gap-3">
            {isMobile ? (
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="text-left mt-5">Menu</SheetTitle>
                  </SheetHeader>
                  
                    <div className="flex flex-col gap-4 mt-4 px-4">
                    <div 
                      className="flex items-center gap-4 p-4 rounded-lg bg-accent cursor-pointer hover:bg-accent/80 transition-colors px-1"
                      onClick={() => handleNavigation("/profile")}
                    >
                        <Avatar className="h-10 w-10 ml-3 ">
                        <AvatarImage src={user.picture || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"} alt={user.username} />
                        <AvatarFallback>
                          {user.username
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                        </AvatarFallback>
                        </Avatar>
                      <div className="flex flex-col">
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>

                    {variant === "dashboard" && (
                      <div className="flex flex-col gap-2 px-1">
                      <Button
                        variant={pathname === "/dashboard" ? "default" : "ghost"}
                        className="w-full justify-start gap-3 h-12 px-1"
                        onClick={() => handleNavigation("/dashboard")}
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        <span className="text-base">Dashboard</span>
                      </Button>
                      <Button
                        variant={pathname === "/roadmap" ? "default" : "ghost"}
                        className="w-full justify-start gap-3 h-12 px-1"
                        onClick={() => handleNavigation("/roadmap")}
                      >
                        <Map className="h-5 w-5" />
                        <span className="text-base">Roadmap</span>
                      </Button>
                      </div>
                    )}

                    <div className="border-t pt-4 px-1">
                      <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 h-12 px-1"
                        onClick={() => handleNavigation("/settings")}
                      >
                        <Settings className="h-5 w-5" />
                        <span className="text-base">Paramètres</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10 px-1"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="text-base">Se déconnecter</span>
                      </Button>
                      </div>
                    </div>

                    <div className="border-t pt-4 px-1">
                      <div className="flex items-center justify-between px-1">
                      <span className="text-sm font-medium">Thème</span>
                      <ThemeToggle />
                      </div>
                    </div>
                    </div>
                </SheetContent>
              </Sheet>
            ) : (
              <>
                <ThemeToggle />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn("rounded-full p-0 transition-all", compressed ? "h-8 w-8" : "h-10 w-10")}
                    >
                      <Avatar className={cn("transition-all", compressed ? "h-8 w-8" : "h-10 w-10")}>
                        <AvatarImage src={user.picture || "/placeholder.svg"} alt={user.username} />
                        <AvatarFallback className={cn(compressed && "text-xs")}>
                          {user.username
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium leading-none">{user.username}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => router.push("/profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => router.push("/settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Se déconnecter</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
