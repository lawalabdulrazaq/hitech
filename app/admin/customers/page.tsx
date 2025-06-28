interface Customer {
  id: string
  name: string
  email: string
  phone: string
  segment: "residential" | "commercial" | "industrial"
  status: "active" | "vip" | "inactive"
  totalOrders: number
  totalSpent: number
  lastOrder: string
  joinDate: string
}

export default function CustomersPage() {
  const mockCustomers: Customer[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      segment: "residential",
      status: "active",
      totalOrders: 3,
      totalSpent: 2499.99,
      lastOrder: "2024-01-15",
      joinDate: "2023-06-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 234-5678",
      segment: "commercial",
      status: "vip",
      totalOrders: 8,
      totalSpent: 15299.99,
      lastOrder: "2024-01-14",
      joinDate: "2023-03-22",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+1 (555) 345-6789",
      segment: "residential",
      status: "active",
      totalOrders: 1,
      totalSpent: 899.99,
      lastOrder: "2024-01-10",
      joinDate: "2024-01-05",
    },
  ]

  const getSegmentColor = (segment: Customer["segment"]) => {
    switch (segment) {
      case "residential":
        return "bg-blue-100 text-blue-800"
      case "commercial":
        return "bg-green-100 text-green-800"
      case "industrial":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "vip":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships and track their activity.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Customer</button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Total Customers</h3>
          <p className="text-2xl font-bold">1,234</p>
          <p className="text-xs text-green-600">+15% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Active</h3>
          <p className="text-2xl font-bold text-green-600">987</p>
          <p className="text-xs text-gray-600">Recently active</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">VIP Customers</h3>
          <p className="text-2xl font-bold text-yellow-600">45</p>
          <p className="text-xs text-gray-600">High value customers</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">New This Month</h3>
          <p className="text-2xl font-bold text-blue-600">78</p>
          <p className="text-xs text-gray-600">Recently joined</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Customer List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Phone</th>
                  <th className="text-left py-3 px-4">Segment</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Orders</th>
                  <th className="text-left py-3 px-4">Total Spent</th>
                  <th className="text-left py-3 px-4">Last Order</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b">
                    <td className="py-3 px-4 font-medium">{customer.name}</td>
                    <td className="py-3 px-4">{customer.email}</td>
                    <td className="py-3 px-4">{customer.phone}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${getSegmentColor(customer.segment)}`}>
                        {customer.segment}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{customer.totalOrders}</td>
                    <td className="py-3 px-4">${customer.totalSpent.toLocaleString()}</td>
                    <td className="py-3 px-4">{new Date(customer.lastOrder).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200">
                          View
                        </button>
                        <button className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200">
                          Contact
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
