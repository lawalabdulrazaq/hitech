"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

const lowStockItems = [
  {
    name: "Lithium Battery 200Ah",
    current: 8,
    minimum: 15,
    status: "low",
  },
  {
    name: "Pure Sine Wave Inverter 5KVA",
    current: 3,
    minimum: 8,
    status: "critical",
  },
  {
    name: "MPPT Controller 40A",
    current: 0,
    minimum: 10,
    status: "out",
  },
]

export function LowStockAlerts() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "low":
        return "text-orange-600"
      case "critical":
        return "text-red-600"
      case "out":
        return "text-red-800"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Low Stock Alerts
        </CardTitle>
        <CardDescription>Items that need restocking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className={`text-sm ${getStatusColor(item.status)}`}>
                  {item.current} / {item.minimum} minimum
                </p>
              </div>
              <Button size="sm" variant="outline">
                Reorder
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
