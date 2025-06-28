"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    amount: "$1,234.56",
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    amount: "$2,345.67",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    amount: "$3,456.78",
    status: "processing",
    date: "2024-01-13",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    amount: "$4,567.89",
    status: "shipped",
    date: "2024-01-12",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
}

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
                <p className="font-medium">{order.amount}</p>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
