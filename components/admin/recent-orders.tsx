"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Adebayo Johnson",
    amount: 450000,
    status: "processing",
  },
  {
    id: "ORD-002",
    customer: "Fatima Ibrahim",
    amount: 850000,
    status: "shipped",
  },
  {
    id: "ORD-003",
    customer: "Chinedu Okafor",
    amount: 225000,
    status: "delivered",
  },
]

export function RecentOrders() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "default"
      case "shipped":
        return "outline"
      case "delivered":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest customer orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₦{order.amount.toLocaleString()}</p>
                <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
