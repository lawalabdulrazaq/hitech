"use client"

import type { ReactNode } from "react"

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return <>{children}</>
}
