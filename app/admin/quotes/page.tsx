interface Quote {
  id: string
  quoteNumber: string
  customerName: string
  customerEmail: string
  amount: number
  status: "draft" | "sent" | "accepted" | "rejected" | "expired"
  createdAt: string
  validUntil: string
}

export default function QuotesPage() {
  const mockQuotes: Quote[] = [
    {
      id: "1",
      quoteNumber: "QUO-001",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      amount: 2499.99,
      status: "sent",
      createdAt: "2024-01-15",
      validUntil: "2024-02-15",
    },
    {
      id: "2",
      quoteNumber: "QUO-002",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      amount: 3299.99,
      status: "accepted",
      createdAt: "2024-01-14",
      validUntil: "2024-02-14",
    },
    {
      id: "3",
      quoteNumber: "QUO-003",
      customerName: "Bob Johnson",
      customerEmail: "bob@example.com",
      amount: 1899.99,
      status: "draft",
      createdAt: "2024-01-13",
      validUntil: "2024-02-13",
    },
  ]

  const getStatusColor = (status: Quote["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "expired":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
          <p className="text-muted-foreground">Create and manage customer quotes for solar installations.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Quote</button>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Quotes</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Quote #</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Created</th>
                  <th className="text-left py-3 px-4">Valid Until</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockQuotes.map((quote) => (
                  <tr key={quote.id} className="border-b">
                    <td className="py-3 px-4 font-medium">{quote.quoteNumber}</td>
                    <td className="py-3 px-4">{quote.customerName}</td>
                    <td className="py-3 px-4">{quote.customerEmail}</td>
                    <td className="py-3 px-4">${quote.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{new Date(quote.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{new Date(quote.validUntil).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200">
                          View
                        </button>
                        <button className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200">
                          PDF
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
