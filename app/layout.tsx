import { Inter } from "next/font/google"
import "./globals.css"
import ClientProviders from "./ClientProviders"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Solar Power Innovation Limited",
  description: "Professional solar energy solutions for your home and business",
    generator: 'v0.dev'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
