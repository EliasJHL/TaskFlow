"use client"

import type React from "react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from "@/lib/auth"
import { useEffect } from "react"
import { ApolloProvider } from "@apollo/client/react"
import { apolloClient } from "@/lib/apollo-client"
import i18n from "@/lib/i18n/client"
import { I18nextProvider } from "react-i18next"

interface ProvidersProps {
  children: React.ReactNode
  locale: string
}

export function Providers({ children, locale }: ProvidersProps) {
  const checkAuth = useAuth((state) => state.checkAuth)
  const isInitialized = useAuth((state) => state.isInitialized)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale])

  if (!isInitialized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <img
          src="/load.gif"
          alt="Loading"
          style={{ maxWidth: "100%", maxHeight: "60vh" }}
        />
      </div>
    )
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        <Toaster />
      </ThemeProvider>
    </ApolloProvider>
  )
}
