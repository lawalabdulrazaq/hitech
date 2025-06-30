import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentOrders = [
  {
    id: "1",
    customer: "John Doe",
    amount: 2499.99,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "2",
    customer: "Jane Smith",
    amount: 3299.99,
    status: "processing",
    date: "2024-01-14",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    amount: 1899.99,
    status: "pending",
    date: "2024-01-13",
  },
]

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{order.customer}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${order.amount.toLocaleString()}</p>
                <Badge
                  variant={
                    order.status === "completed" ? "default" : order.status === "processing" ? "secondary" : "outline"
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
