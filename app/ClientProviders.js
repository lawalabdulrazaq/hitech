"use client";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient("https://hearty-caiman-345.convex.cloud");

export default function ClientProviders({ children }) {
  return (
    <ConvexProvider client={convex}>
      <ConvexAuthProvider client={convex}>
        {children}
      </ConvexAuthProvider>
    </ConvexProvider>
  );
}
