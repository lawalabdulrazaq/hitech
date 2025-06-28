"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Package } from "lucide-react"

const lowStockItems = [
  {
    id: "BATT-001",
    name: "Solar Battery 12V 100Ah",
    currentStock: 5,
    minStock: 10,
    category: "Batteries",
  },
  {
    id: "FAN-002",
    name: "DC Ceiling Fan 48V",
    currentStock: 2,
    minStock: 8,
    category: "Fans",
  },
  {
    id: "CTRL-003",
    name: "MPPT Controller 60A",
    currentStock: 3,
    minStock: 12,
    category: "Controllers",
  },
]

export function LowStockAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Low Stock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.id} • {item.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-orange-600">
                    {item.currentStock} / {item.minStock}
                  </p>
                  <p className="text-xs text-muted-foreground">Current / Min</p>
                </div>
                <Button size="sm" variant="outline">
                  Reorder
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
