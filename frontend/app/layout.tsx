import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import { Suspense } from "react"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "var(--background)"
          }}>
            <img
              src="https://i.pinimg.com/originals/a6/ec/56/a6ec563bcc7bfe131ea1976cb17b4915.gif"
              alt="Loading"
              style={{ maxWidth: "100%", maxHeight: "60vh" }}
            />
          </div>
        }>
          <Providers>{children}</Providers>
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
