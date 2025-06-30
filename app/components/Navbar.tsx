"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Settings } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src="/images/logo.png" alt="Logo" width={120} height={40} className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              About
            </Link>
            <Link href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Services
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Contact
            </Link>

            {/* Admin Button */}
            <Link
              href="/admin/dashboard"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Settings className="h-4 w-4" />
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="#services"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/admin/dashboard"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Admin Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
