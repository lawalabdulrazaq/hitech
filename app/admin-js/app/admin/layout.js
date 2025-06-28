"use client"
import AdminLayout from "./components/AdminLayout"
import ProtectedRoute from "./components/ProtectedRoute"

export default function AdminRootLayout({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  )
}
