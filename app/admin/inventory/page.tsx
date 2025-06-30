"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Package, AlertTriangle } from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  category: string
  sku: string
  currentStock: number
  minimumStock: number
  price: number
  supplier: string
  lastRestocked: string
}

const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Monocrystalline Solar Panel 300W",
    category: "Solar Panels",
    sku: "SP-MONO-300",
    currentStock: 45,
    minimumStock: 20,
    price: 85000,
    supplier: "SolarTech Nigeria",
    lastRestocked: "2024-01-10",
  },
  {
    id: "2",
    name: "Lithium Battery 200Ah",
    category: "Batteries",
    sku: "BAT-LI-200",
    currentStock: 8,
    minimumStock: 15,
    price: 320000,
    supplier: "PowerStore Lagos",
    lastRestocked: "2024-01-05",
  },
  {
    id: "3",
    name: "MPPT Charge Controller 60A",
    category: "Controllers",
    sku: "CTRL-MPPT-60",
    currentStock: 25,
    minimumStock: 10,
    price: 45000,
    supplier: "ElectroMax",
    lastRestocked: "2024-01-12",
  },
  {
    id: "4",
    name: "Pure Sine Wave Inverter 5KVA",
    category: "Inverters",
    sku: "INV-PSW-5K",
    currentStock: 3,
    minimumStock: 8,
    price: 180000,
    supplier: "PowerTech Solutions",
    lastRestocked: "2023-12-28",
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStockStatus = (current: number, minimum: number) => {
    if (current === 0) return { status: "out-of-stock", color: "destructive" }
    if (current <= minimum) return { status: "low-stock", color: "secondary" }
    return { status: "in-stock", color: "default" }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">Manage your product inventory and stock levels</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {inventoryItems.filter((item) => item.currentStock <= item.minimumStock).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {inventoryItems.filter((item) => item.currentStock === 0).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{inventoryItems.reduce((total, item) => total + item.currentStock * item.price, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>Monitor and manage your product stock levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="space-y-4">
            {filteredItems.map((item) => {
              const stockStatus = getStockStatus(item.currentStock, item.minimumStock)
              return (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <Badge variant={stockStatus.color as any}>{stockStatus.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>SKU: {item.sku}</span>
                          <span>Category: {item.category}</span>
                          <span>Supplier: {item.supplier}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Last restocked: {item.lastRestocked}</div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-lg font-semibold">₦{item.price.toLocaleString()}</div>
                        <div className="text-sm">
                          Stock: {item.currentStock} / Min: {item.minimumStock}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm">Restock</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
