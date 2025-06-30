"use client"

import Link from "next/link"
import { Shield } from "lucide-react"

export default function AdminNavLink() {
  return (
    <Link
      href="/admin/dashboard"
      className="hidden md:flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
      title="Admin Dashboard"
    >
      <Shield className="w-4 h-4" />
      <span>Admin</span>
    </Link>
  )
}
