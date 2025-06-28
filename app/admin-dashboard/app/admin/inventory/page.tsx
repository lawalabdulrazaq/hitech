"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/admin/data-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  reserved: number
  available: number
  reorderPoint: number
  supplier: string
  location: string
  lastRestocked: string
  status: "in-stock" | "low-stock" | "out-of-stock" | "reorder"
}

const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Solar Battery 12V 100Ah",
    sku: "BATT-001",
    category: "Batteries",
    currentStock: 15,
    minStock: 10,
    maxStock: 50,
    reserved: 3,
    available: 12,
    reorderPoint: 15,
    supplier: "PowerTech Solutions",
    location: "Warehouse A-1",
    lastRestocked: "2024-01-10",
    status: "in-stock",
  },
  {
    id: "2",
    name: "DC Ceiling Fan 48V",
    sku: "FAN-002",
    category: "Fans",
    currentStock: 5,
    minStock: 8,
    maxStock: 30,
    reserved: 2,
    available: 3,
    reorderPoint: 12,
    supplier: "EcoFan Industries",
    location: "Warehouse B-2",
    lastRestocked: "2024-01-05",
    status: "low-stock",
  },
  {
    id: "3",
    name: "MPPT Controller 60A",
    sku: "CTRL-003",
    category: "Controllers",
    currentStock: 0,
    minStock: 5,
    maxStock: 25,
    reserved: 0,
    available: 0,
    reorderPoint: 8,
    supplier: "Solar Control Co.",
    location: "Warehouse A-3",
    lastRestocked: "2023-12-20",
    status: "out-of-stock",
  },
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)

  const columns: ColumnDef<InventoryItem>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Product
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "currentStock",
      header: "Current Stock",
      cell: ({ row }) => {
        const current = row.getValue("currentStock") as number
        const min = row.original.minStock
        return (
          <div className="flex items-center gap-2">
            <span>{current}</span>
            {current <= min && <AlertTriangle className="h-4 w-4 text-orange-500" />}
          </div>
        )
      },
    },
    {
      accessorKey: "available",
      header: "Available",
    },
    {
      accessorKey: "reserved",
      header: "Reserved",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusColors = {
          "in-stock": "bg-green-100 text-green-800",
          "low-stock": "bg-orange-100 text-orange-800",
          "out-of-stock": "bg-red-100 text-red-800",
          reorder: "bg-blue-100 text-blue-800",
        }
        return <Badge className={statusColors[status as keyof typeof statusColors]}>{status.replace("-", " ")}</Badge>
      },
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
    },
  ]

  const totalItems = inventory.reduce((sum, item) => sum + item.currentStock, 0)
  const lowStockItems = inventory.filter((item) => item.currentStock <= item.minStock).length
  const outOfStockItems = inventory.filter((item) => item.currentStock === 0).length
  const totalValue = inventory.reduce((sum, item) => sum + item.currentStock * 100, 0) // Assuming $100 average value

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">Track stock levels, manage reorders, and monitor inventory health.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">+12%</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Items below minimum stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">Items requiring immediate restock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              <span className="text-red-500">-2%</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <DataTable columns={columns} data={inventory} searchKey="name" searchPlaceholder="Search inventory..." />
    </div>
  )
}
