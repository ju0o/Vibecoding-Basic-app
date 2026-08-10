import type { Metadata, Viewport } from "next"
import { Geist_Mono, Noto_Sans_KR } from "next/font/google"
import Script from "next/script"
import type { ReactNode } from "react"
import "./globals.css"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { LearningStateProvider } from "@/features/progress/LearningStateProvider"
import { AuthProvider } from "@/contexts/AuthContext"
import { getSearchIndex } from "@/lib/search-index"

const siteUrl = process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://ju0o-ec967.web.app"

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const enableReactDevTools =
  process.env.NODE_ENV === "development" &&
  process.env["NEXT_PUBLIC_DISABLE_REACT_DEVTOOLS"] !== "1"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Vibe Coding Master",
    template: "%s | AI Vibe Coding Master",
  },
  description:
    "비개발자를 위한 무료 교재. 개발 기초부터 AI 시스템 설계까지, 원리·검증·설명 가능성 중심으로 배웁니다.",
  applicationName: "AI Vibe Coding Master",
  authors: [{ name: "AI Vibe Coding Master" }],
  keywords: [
    "바이브코딩",
    "Vibe Coding",
    "비개발자",
    "웹 개발",
    "AI 코딩",
    "무료 강의",
    "개발 원리",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Vibe Coding Master",
    description:
      "개인적인 학습 과정에서 정리한 자료를 무료 공개한 교재. HTML부터 Agent·MCP까지 개발 원리를 설명합니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "AI Vibe Coding Master",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "AI Vibe Coding Master",
    description: "비개발자를 위한 무료 바이브코딩·개발 원리 교재",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
}

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  const searchEntries = getSearchIndex()

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {enableReactDevTools ? (
          <>
            <Script
              crossOrigin="anonymous"
              src="//unpkg.com/react-grab/dist/index.global.js"
              strategy="beforeInteractive"
            />
            <Script
              crossOrigin="anonymous"
              src="//unpkg.com/react-scan/dist/auto.global.js"
              strategy="beforeInteractive"
            />
          </>
        ) : null}
      </head>
      <body
        className={`${notoSansKr.className} ${geistMono.variable} min-h-[100dvh] bg-[var(--surface-primary)] text-[var(--text-primary)] antialiased`}
      >
        <LearningStateProvider>
          <AuthProvider>
            <SiteHeader searchEntries={searchEntries} />
            <main>{children}</main>
            <SiteFooter />
          </AuthProvider>
        </LearningStateProvider>
      </body>
    </html>
  )
}
