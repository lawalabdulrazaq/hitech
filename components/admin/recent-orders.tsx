"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentOrders() {
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      product: "Solar Panel Kit 5kW",
      amount: "₦450,000",
      status: "completed",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      product: "Lithium Battery 200Ah",
      amount: "₦180,000",
      status: "pending",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      product: "Solar Street Light",
      amount: "₦75,000",
      status: "processing",
    },
    {
      id: "ORD-004",
      customer: "Sarah Wilson",
      product: "DC Protector Kit",
      amount: "₦25,000",
      status: "completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">{order.customer}</p>
                <p className="text-xs text-muted-foreground">{order.product}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm font-medium">{order.amount}</p>
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
