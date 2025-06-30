import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

const lowStockItems = [
  {
    id: "1",
    name: "Solar Battery 12V 100Ah",
    current: 5,
    minimum: 10,
    status: "low",
  },
  {
    id: "2",
    name: "DC Ceiling Fan 48V",
    current: 2,
    minimum: 8,
    status: "critical",
  },
  {
    id: "3",
    name: "MPPT Controller 60A",
    current: 0,
    minimum: 5,
    status: "out",
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
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  Current: {item.current} | Min: {item.minimum}
                </p>
              </div>
              <Badge
                variant={
                  item.status === "out" ? "destructive" : item.status === "critical" ? "destructive" : "secondary"
                }
              >
                {item.status === "out" ? "Out of Stock" : item.status === "critical" ? "Critical" : "Low"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
