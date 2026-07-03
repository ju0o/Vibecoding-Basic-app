import type { Metadata, Viewport } from "next"
import { Geist_Mono, Noto_Sans_KR } from "next/font/google"
import Script from "next/script"
import type { ReactNode } from "react"
import "./globals.css"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { LearningStateProvider } from "@/features/progress/LearningStateProvider"
import { getSearchIndex } from "@/lib/search-index"

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
  title: {
    default: "AI Vibe Coding Master",
    template: "%s | AI Vibe Coding Master",
  },
  description:
    "개발 기초부터 최신 AI 엔지니어링 개념까지 읽고, 퀴즈처럼 점검하고, 설명 연습으로 익히는 교재형 학습 사이트입니다.",
  openGraph: {
    title: "AI Vibe Coding Master",
    description: "HTML부터 Agent, MCP, Harness Engineering까지 이어지는 AI 바이브코딩 교재.",
    type: "website",
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
          <SiteHeader searchEntries={searchEntries} />
          <main>{children}</main>
          <SiteFooter />
        </LearningStateProvider>
      </body>
    </html>
  )
}
