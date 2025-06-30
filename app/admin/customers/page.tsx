"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Phone, Mail, MapPin } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
  status: "active" | "inactive"
  lastOrder: string
}

const customers: Customer[] = [
  {
    id: "1",
    name: "Adebayo Johnson",
    email: "adebayo.johnson@email.com",
    phone: "+234 803 123 4567",
    address: "Lagos, Nigeria",
    totalOrders: 3,
    totalSpent: 450000,
    status: "active",
    lastOrder: "2024-01-15",
  },
  {
    id: "2",
    name: "Fatima Ibrahim",
    email: "fatima.ibrahim@email.com",
    phone: "+234 806 987 6543",
    address: "Abuja, Nigeria",
    totalOrders: 1,
    totalSpent: 180000,
    status: "active",
    lastOrder: "2024-01-10",
  },
  {
    id: "3",
    name: "Chinedu Okafor",
    email: "chinedu.okafor@email.com",
    phone: "+234 809 456 7890",
    address: "Port Harcourt, Nigeria",
    totalOrders: 5,
    totalSpent: 720000,
    status: "active",
    lastOrder: "2024-01-20",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Database</CardTitle>
          <CardDescription>View and manage all your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid gap-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{customer.name}</h3>
                        <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                          {customer.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {customer.address}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">₦{customer.totalSpent.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{customer.totalOrders} orders</div>
                      <div className="text-sm text-muted-foreground">Last: {customer.lastOrder}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
