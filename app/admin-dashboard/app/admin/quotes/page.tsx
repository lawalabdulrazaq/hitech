"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/admin/data-table"
import { QuoteBuilder } from "@/components/admin/quote-builder"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, MoreHorizontal, Plus, FileText } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const columns: ColumnDef<Quote>[] = [
    {
      accessorKey: "quoteNumber",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Quote #
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "customerName",
      header: "Customer",
    },
    {
      accessorKey: "customerEmail",
      header: "Email",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("amount"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return formatted
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusColors = {
          draft: "bg-gray-100 text-gray-800",
          sent: "bg-blue-100 text-blue-800",
          accepted: "bg-green-100 text-green-800",
          rejected: "bg-red-100 text-red-800",
          expired: "bg-orange-100 text-orange-800",
        }
        return <Badge className={statusColors[status as keyof typeof statusColors]}>{status}</Badge>
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        return new Date(row.getValue("createdAt")).toLocaleDateString()
      },
    },
    {
      accessorKey: "validUntil",
      header: "Valid Until",
      cell: ({ row }) => {
        return new Date(row.getValue("validUntil")).toLocaleDateString()
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const quote = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Send to Customer</DropdownMenuItem>
              <DropdownMenuItem>Duplicate Quote</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
          <p className="text-muted-foreground">Create and manage customer quotes for solar installations.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Quote
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Quote</DialogTitle>
            </DialogHeader>
            <QuoteBuilder />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns} data={quotes} searchKey="customerName" searchPlaceholder="Search quotes..." />
    </div>
  )
}
