"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Eye, Send, FileText } from "lucide-react"

interface Quote {
  id: string
  quoteNumber: string
  customerName: string
  customerEmail: string
  items: { name: string; quantity: number; price: number }[]
  totalAmount: number
  status: "draft" | "sent" | "accepted" | "rejected" | "expired"
  createdDate: string
  validUntil: string
}

const quotes: Quote[] = [
  {
    id: "1",
    quoteNumber: "QUO-2024-001",
    customerName: "Adebayo Johnson",
    customerEmail: "adebayo.johnson@email.com",
    items: [
      { name: "Home Standard Solar Package (5KVA)", quantity: 1, price: 850000 },
      { name: "Installation Service", quantity: 1, price: 100000 },
    ],
    totalAmount: 950000,
    status: "sent",
    createdDate: "2024-01-15",
    validUntil: "2024-02-15",
  },
  {
    id: "2",
    quoteNumber: "QUO-2024-002",
    customerName: "Fatima Ibrahim",
    customerEmail: "fatima.ibrahim@email.com",
    items: [
      { name: "Home Basic Solar Package (2KVA)", quantity: 1, price: 450000 },
      { name: "Extended Warranty", quantity: 1, price: 50000 },
    ],
    totalAmount: 500000,
    status: "accepted",
    createdDate: "2024-01-10",
    validUntil: "2024-02-10",
  },
  {
    id: "3",
    quoteNumber: "QUO-2024-003",
    customerName: "Chinedu Okafor",
    customerEmail: "chinedu.okafor@email.com",
    items: [
      { name: "Commercial Solar Package (20KVA)", quantity: 1, price: 2800000 },
      { name: "Maintenance Contract (2 years)", quantity: 1, price: 200000 },
    ],
    totalAmount: 3000000,
    status: "draft",
    createdDate: "2024-01-18",
    validUntil: "2024-02-18",
  },
]

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: Quote["status"]) => {
    switch (status) {
      case "draft":
        return "secondary"
      case "sent":
        return "default"
      case "accepted":
        return "default"
      case "rejected":
        return "destructive"
      case "expired":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
          <p className="text-muted-foreground">Create and manage customer quotes</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Quote
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quotes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {quotes.filter((quote) => quote.status === "draft").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {quotes.filter((quote) => quote.status === "sent").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {quotes.filter((quote) => quote.status === "accepted").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{quotes.reduce((total, quote) => total + quote.totalAmount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quote Management</CardTitle>
          <CardDescription>View and manage all customer quotes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quotes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="space-y-4">
            {filteredQuotes.map((quote) => (
              <Card key={quote.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{quote.quoteNumber}</h3>
                        <Badge variant={getStatusColor(quote.status)}>{quote.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div>Customer: {quote.customerName}</div>
                        <div>Email: {quote.customerEmail}</div>
                        <div>Created: {quote.createdDate}</div>
                        <div>Valid Until: {quote.validUntil}</div>
                      </div>
                      <div className="text-sm">
                        <strong>Items:</strong>
                        <ul className="list-disc list-inside ml-2">
                          {quote.items.map((item, index) => (
                            <li key={index}>
                              {item.name} x{item.quantity} - ₦{item.price.toLocaleString()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-lg font-semibold">₦{quote.totalAmount.toLocaleString()}</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {quote.status === "draft" && (
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            Send
                          </Button>
                        )}
                      </div>
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
