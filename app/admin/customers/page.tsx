"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/admin/data-table"
import { Badge } from "@/components/ui/badge"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, MoreHorizontal, Plus, Mail, Phone } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  segment: "residential" | "commercial" | "industrial"
  status: "active" | "inactive" | "vip"
  totalOrders: number
  totalSpent: number
  lastOrder: string
  joinDate: string
}

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

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "segment",
      header: "Segment",
      cell: ({ row }) => {
        const segment = row.getValue("segment") as string
        const segmentColors = {
          residential: "bg-blue-100 text-blue-800",
          commercial: "bg-green-100 text-green-800",
          industrial: "bg-purple-100 text-purple-800",
        }
        return <Badge className={segmentColors[segment as keyof typeof segmentColors]}>{segment}</Badge>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusColors = {
          active: "bg-green-100 text-green-800",
          inactive: "bg-gray-100 text-gray-800",
          vip: "bg-yellow-100 text-yellow-800",
        }
        return <Badge className={statusColors[status as keyof typeof statusColors]}>{status}</Badge>
      },
    },
    {
      accessorKey: "totalOrders",
      header: "Orders",
    },
    {
      accessorKey: "totalSpent",
      header: "Total Spent",
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("totalSpent"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return formatted
      },
    },
    {
      accessorKey: "lastOrder",
      header: "Last Order",
      cell: ({ row }) => {
        return new Date(row.getValue("lastOrder")).toLocaleDateString()
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const customer = row.original

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
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="mr-2 h-4 w-4" />
                Call Customer
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Orders</DropdownMenuItem>
              <DropdownMenuItem>Create Quote</DropdownMenuItem>
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
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships and track their activity.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <DataTable columns={columns} data={customers} searchKey="name" searchPlaceholder="Search customers..." />
    </div>
  )
}
