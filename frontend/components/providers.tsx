"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from "@/lib/auth"
import { useEffect } from "react"
import { ApolloProvider } from "@apollo/client/react"
import { apolloClient } from "@/lib/apollo-client"

export function Providers({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuth((state) => state.checkAuth)
  const isInitialized = useAuth((state) => state.isInitialized)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (!isInitialized) {
    return (
      <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw"
          }}>
            <img
              src="https://i.pinimg.com/originals/a6/ec/56/a6ec563bcc7bfe131ea1976cb17b4915.gif"
              alt="Loading"
              style={{ maxWidth: "100%", maxHeight: "60vh" }}
            />
          </div>
    )
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <Toaster />
      </ThemeProvider>
    </ApolloProvider>
  )
}
