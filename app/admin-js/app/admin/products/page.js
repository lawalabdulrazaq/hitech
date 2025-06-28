"use client"
import Link from "next/link"
import { CubeIcon } from "@heroicons/react/24/outline"

export default function ProductsPage() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">Manage your single items and solar packages</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link
          href="/admin/products/single"
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">Single Items</span>
          <span className="mt-1 block text-sm text-gray-500">
            Manage batteries, fans, and other individual products
          </span>
        </Link>

        <Link
          href="/admin/products/packages"
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">Solar Packages</span>
          <span className="mt-1 block text-sm text-gray-500">Manage complete solar system packages</span>
        </Link>
      </div>
    </div>
  )
}
