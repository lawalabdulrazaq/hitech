import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Package, Users, ShoppingCart, Settings, ImageIcon } from "lucide-react"
import Hero from "./Hero"
import About from "./About"
import WhyChooseUs from "./WhyChooseUs"
import Sponsors from "./Sponsors"
import AdminAccessButton from "../components/AdminAccessButton"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Sponsors Section */}
        <Sponsors />

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Admin Dashboard</h1>
          <p className="text-xl text-gray-600 mb-8">Manage your solar energy business with powerful admin tools</p>
          <Link href="/admin/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Access Admin Dashboard
            </Button>
          </Link>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Analytics
              </CardTitle>
              <CardDescription>View business performance and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/analytics">
                <Button variant="outline" className="w-full bg-transparent">
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                Products
              </CardTitle>
              <CardDescription>Manage solar panels and packages</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/products/single">
                <Button variant="outline" className="w-full bg-transparent">
                  Manage Products
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Customers
              </CardTitle>
              <CardDescription>View and manage customer relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/customers">
                <Button variant="outline" className="w-full bg-transparent">
                  View Customers
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-orange-600" />
                Orders
              </CardTitle>
              <CardDescription>Track and manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/orders">
                <Button variant="outline" className="w-full bg-transparent">
                  View Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-pink-600" />
                Media Library
              </CardTitle>
              <CardDescription>Manage images and videos</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/media">
                <Button variant="outline" className="w-full bg-transparent">
                  View Media
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                Settings
              </CardTitle>
              <CardDescription>Configure system settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/settings">
                <Button variant="outline" className="w-full bg-transparent">
                  View Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">150+</div>
              <div className="text-gray-600">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">1,200+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">850+</div>
              <div className="text-gray-600">Orders Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Admin Access Button - Only visible to authorized users */}
        <AdminAccessButton />
      </div>
    </main>
  )
}
