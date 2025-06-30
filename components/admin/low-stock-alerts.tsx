"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export function LowStockAlerts() {
  const lowStockItems = [
    {
      name: "Solar Panel 300W",
      current: 5,
      minimum: 10,
    },
    {
      name: "Lithium Battery 100Ah",
      current: 2,
      minimum: 8,
    },
    {
      name: "Charge Controller 60A",
      current: 3,
      minimum: 6,
    },
    {
      name: "DC Protector 32A",
      current: 1,
      minimum: 5,
    },
  ]

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
            <div key={item.name} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Current: {item.current} | Min: {item.minimum}
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-orange-600">{item.current} left</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
