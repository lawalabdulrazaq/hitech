"use client"

import { SidebarProvider } from "@/components/ui/sidebar" // Adjust path if needed
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import Dashboard from "./dashboard/page"
import MediaPage from "./media/page"
import InventoryPage from "./inventory/page"
import OrdersPage from "./orders/page"
import CustomersPage from "./customers/page"
import AnalyticsPage from "./analytics/page"
import QuotesPage from "./quotes/page"
import SettingsPage from "./settings/page"

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
