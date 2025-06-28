interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  amount: number
  status: "completed" | "processing" | "pending" | "cancelled"
  orderDate: string
  items: number
}

export default function OrdersPage() {
  const mockOrders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-001",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      amount: 2499.99,
      status: "completed",
      orderDate: "2024-01-15",
      items: 4,
    },
    {
      id: "2",
      orderNumber: "ORD-002",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      amount: 3299.99,
      status: "processing",
      orderDate: "2024-01-14",
      items: 6,
    },
    {
      id: "3",
      orderNumber: "ORD-003",
      customerName: "Bob Johnson",
      customerEmail: "bob@example.com",
      amount: 1899.99,
      status: "pending",
      orderDate: "2024-01-13",
      items: 3,
    },
  ]

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">View and manage customer orders and fulfillment.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">New Order</button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
          <p className="text-2xl font-bold">156</p>
          <p className="text-xs text-green-600">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Pending</h3>
          <p className="text-2xl font-bold text-orange-600">23</p>
          <p className="text-xs text-gray-600">Awaiting processing</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Processing</h3>
          <p className="text-2xl font-bold text-blue-600">45</p>
          <p className="text-xs text-gray-600">In fulfillment</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Completed</h3>
          <p className="text-2xl font-bold text-green-600">88</p>
          <p className="text-xs text-gray-600">Successfully delivered</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order #</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Items</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
                    <td className="py-3 px-4">{order.customerName}</td>
                    <td className="py-3 px-4">{order.customerEmail}</td>
                    <td className="py-3 px-4">{order.items} items</td>
                    <td className="py-3 px-4">${order.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200">
                          View
                        </button>
                        <button className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200">
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
