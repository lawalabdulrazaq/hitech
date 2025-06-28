"use client"

import Link from "next/link"
import { Settings } from "lucide-react"

export default function AdminLink() {
  return (
    <Link
      href="/admin/dashboard"
      className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors z-50"
      title="Admin Dashboard"
    >
      <Settings className="h-6 w-6" />
    </Link>
  )
}
