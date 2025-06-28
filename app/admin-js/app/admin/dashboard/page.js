"use client"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import StatsCard from "../components/StatsCard"
import { CubeIcon, DocumentTextIcon } from "@heroicons/react/24/outline"

export default function AdminDashboard() {
  const singleItems = useQuery(api.singleItems.getAll) || []
  const packages = useQuery(api.solarPackages.getAll) || []
  const inquiries = useQuery(api.inquiries.getAll) || []

  const stats = [
    {
      name: "Total Products",
      value: singleItems.length + packages.length,
      icon: CubeIcon,
      change: "+4.75%",
      changeType: "positive",
    },
    {
      name: "Single Items",
      value: singleItems.length,
      icon: CubeIcon,
      change: "+2.02%",
      changeType: "positive",
    },
    {
      name: "Solar Packages",
      value: packages.length,
      icon: CubeIcon,
      change: "+1.39%",
      changeType: "positive",
    },
    {
      name: "Total Inquiries",
      value: inquiries.length,
      icon: DocumentTextIcon,
      change: "+10.18%",
      changeType: "positive",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-gray-700">
          Welcome to your admin dashboard. Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <StatsCard key={item.name} {...item} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Products</h3>
            <div className="space-y-3">
              {singleItems.slice(0, 5).map((item) => (
                <div key={item._id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <span className="text-sm text-gray-900">${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Inquiries</h3>
            <div className="space-y-3">
              {inquiries.slice(0, 5).map((inquiry) => (
                <div key={inquiry._id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{inquiry.name}</p>
                    <p className="text-sm text-gray-500">{inquiry.email}</p>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(inquiry._creationTime).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
