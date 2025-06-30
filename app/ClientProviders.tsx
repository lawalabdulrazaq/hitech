"use client"

import type React from "react"
import type { ReactNode } from "react"
import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { ConvexProvider, ConvexReactClient } from "convex/react"

const convex = new ConvexReactClient("https://hearty-caiman-345.convex.cloud")

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps): React.ReactElement {
  return (
    <ConvexProvider client={convex}>
      <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>
    </ConvexProvider>
  )
}
