"use client"

import Link from "next/link"
import { useState } from "react"
import { Settings } from "lucide-react"

interface AdminAccessButtonProps {
  className?: string
}

export default function AdminAccessButton({ className = "" }: AdminAccessButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href="/admin/dashboard"
      className={`fixed bottom-6 right-6 z-50 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group relative">
        <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl">
          <Settings className="w-5 h-5" />
          {isHovered && <span className="text-sm font-medium whitespace-nowrap">Admin Panel</span>}
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Access Admin Dashboard
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </Link>
  )
}
