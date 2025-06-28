"use client"

import { SidebarProvider } from "@/components/ui/sidebar" // Adjust path if needed
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import Dashboard from "./admin/dashboard/page"
import MediaPage from "./admin/media/page"
import InventoryPage from "./admin/inventory/page"
import OrdersPage from "./admin/orders/page"
import CustomersPage from "./admin/customers/page"
import AnalyticsPage from "./admin/analytics/page"
import QuotesPage from "./admin/quotes/page"
import SettingsPage from "./admin/settings/page"

export default function AdminHome() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-8 bg-gray-50 space-y-12">
            <Dashboard />
            <MediaPage />
            <InventoryPage />
            <OrdersPage />
            <CustomersPage />
            <AnalyticsPage />
            <QuotesPage />
            <SettingsPage />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}