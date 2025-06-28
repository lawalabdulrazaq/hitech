"use client"

import { useState } from "react"
import { Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

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
  status: "in-stock" | "low-stock" | "out-of-stock"
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

  const totalItems = inventory.reduce((sum, item) => sum + item.currentStock, 0)
  const lowStockItems = inventory.filter((item) => item.currentStock <= item.minStock).length
  const outOfStockItems = inventory.filter((item) => item.currentStock === 0).length
  const totalValue = inventory.reduce((sum, item) => sum + item.currentStock * 100, 0)

  const getStatusColor = (status: InventoryItem["status"]) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800"
      case "low-stock":
        return "bg-orange-100 text-orange-800"
      case "out-of-stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">Track stock levels, manage reorders, and monitor inventory health.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold">{totalItems}</p>
            </div>
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-xs text-gray-600 flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-green-500">+12%</span>
            <span className="ml-1">from last month</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
              <p className="text-2xl font-bold text-orange-600">{lowStockItems}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-500" />
          </div>
          <p className="text-xs text-gray-600 mt-2">Items below minimum stock</p>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <p className="text-xs text-gray-600 mt-2">Items requiring immediate restock</p>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-xs text-gray-600 flex items-center mt-2">
            <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
            <span className="text-red-500">-2%</span>
            <span className="ml-1">from last month</span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Inventory Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">SKU</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Current Stock</th>
                  <th className="text-left py-3 px-4">Available</th>
                  <th className="text-left py-3 px-4">Reserved</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-left py-3 px-4">Supplier</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.sku}</td>
                    <td className="py-3 px-4">{item.category}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span>{item.currentStock}</span>
                        {item.currentStock <= item.minStock && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                      </div>
                    </td>
                    <td className="py-3 px-4">{item.available}</td>
                    <td className="py-3 px-4">{item.reserved}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(item.status)}`}>
                        {item.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.location}</td>
                    <td className="py-3 px-4">{item.supplier}</td>
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
