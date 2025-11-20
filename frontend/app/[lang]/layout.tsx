import type React from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                backgroundColor: "var(--background)",
              }}
            >
              <img
                src="/load.gif"
                alt="Loading"
                style={{ maxWidth: "100%", maxHeight: "60vh" }}
              />
            </div>
          }
        >
          <Providers locale={lang}>{children}</Providers>
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
