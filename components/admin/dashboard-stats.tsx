"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+180.1%",
    changeType: "positive",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    value: "12,234",
    change: "+19%",
    changeType: "positive",
    icon: Package,
  },
  {
    title: "Active Customers",
    value: "573",
    change: "+201",
    changeType: "positive",
    icon: Users,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stat.changeType === "positive" ? (
                <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
