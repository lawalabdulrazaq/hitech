import { DashboardStats } from "@/components/admin/dashboard-stats"

interface Order {
  id: string
  orderNumber: string
  customerName: string
  amount: number
  status: "completed" | "pending" | "processing"
}

interface StockAlert {
  id: string
  productName: string
  current: number
  minimum: number
  status: "low" | "urgent"
}

export default function AdminDashboard() {
  const recentOrders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-001",
      customerName: "John Doe",
      amount: 1234.56,
      status: "completed",
    },
    {
      id: "2",
      orderNumber: "ORD-002",
      customerName: "Jane Smith",
      amount: 2345.67,
      status: "pending",
    },
    {
      id: "3",
      orderNumber: "ORD-003",
      customerName: "Bob Johnson",
      amount: 3456.78,
      status: "processing",
    },
  ]

  const stockAlerts: StockAlert[] = [
    {
      id: "1",
      productName: "Solar Battery 12V 100Ah",
      current: 5,
      minimum: 10,
      status: "low",
    },
    {
      id: "2",
      productName: "DC Ceiling Fan 48V",
      current: 2,
      minimum: 8,
      status: "low",
    },
    {
      id: "3",
      productName: "MPPT Controller 60A",
      current: 0,
      minimum: 5,
      status: "urgent",
    },
  ]

  const getStatusColor = (status: Order["status"]) => {
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

  const getAlertColor = (status: StockAlert["status"]) => {
    switch (status) {
      case "low":
        return "bg-orange-50 border-orange-200"
      case "urgent":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getButtonColor = (status: StockAlert["status"]) => {
    switch (status) {
      case "low":
        return "bg-orange-600 hover:bg-orange-700"
      case "urgent":
        return "bg-red-600 hover:bg-red-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your solar business.</p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">
                    {order.customerName} - ${order.amount.toLocaleString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Low Stock Alerts</h3>
          <div className="space-y-3">
            {stockAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex justify-between items-center p-3 rounded border ${getAlertColor(alert.status)}`}
              >
                <div>
                  <p className="font-medium">{alert.productName}</p>
                  <p className="text-sm text-gray-600">
                    Current: {alert.current} | Min: {alert.minimum}
                  </p>
                </div>
                <button className={`px-3 py-1 text-white rounded text-sm ${getButtonColor(alert.status)}`}>
                  {alert.status === "urgent" ? "Urgent" : "Reorder"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
