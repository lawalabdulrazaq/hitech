"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Package } from "lucide-react"

interface SolarPackage {
  id: string
  name: string
  capacity: string
  price: number
  components: string[]
  description: string
  status: "active" | "inactive"
  popular?: boolean
}

const packages: SolarPackage[] = [
  {
    id: "1",
    name: "Home Basic Solar Package",
    capacity: "2KVA",
    price: 450000,
    components: [
      "2x 300W Solar Panels",
      "1x 100Ah Lithium Battery",
      "1x 2KVA Inverter",
      "1x 40A MPPT Controller",
      "Installation Kit",
    ],
    description: "Perfect for small homes and apartments",
    status: "active",
    popular: true,
  },
  {
    id: "2",
    name: "Home Standard Solar Package",
    capacity: "5KVA",
    price: 850000,
    components: [
      "6x 300W Solar Panels",
      "2x 200Ah Lithium Batteries",
      "1x 5KVA Inverter",
      "1x 60A MPPT Controller",
      "Installation Kit",
      "Monitoring System",
    ],
    description: "Ideal for medium-sized homes",
    status: "active",
  },
  {
    id: "3",
    name: "Home Premium Solar Package",
    capacity: "10KVA",
    price: 1500000,
    components: [
      "12x 300W Solar Panels",
      "4x 200Ah Lithium Batteries",
      "1x 10KVA Inverter",
      "2x 60A MPPT Controllers",
      "Installation Kit",
      "Advanced Monitoring System",
      "Backup Generator Interface",
    ],
    description: "Complete solution for large homes",
    status: "active",
  },
  {
    id: "4",
    name: "Commercial Solar Package",
    capacity: "20KVA",
    price: 2800000,
    components: [
      "24x 300W Solar Panels",
      "8x 200Ah Lithium Batteries",
      "2x 10KVA Inverters",
      "4x 60A MPPT Controllers",
      "Commercial Installation Kit",
      "Enterprise Monitoring System",
    ],
    description: "Designed for small businesses and offices",
    status: "inactive",
  },
]

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.capacity.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solar Packages</h1>
          <p className="text-muted-foreground">Manage complete solar system packages</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Package
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{packages.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {packages.filter((pkg) => pkg.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{packages.filter((pkg) => pkg.popular).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Package Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{Math.round(packages.reduce((total, pkg) => total + pkg.price, 0) / packages.length).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Package Catalog</CardTitle>
          <CardDescription>Manage your solar system packages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className={pkg.popular ? "border-primary" : ""}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{pkg.name}</h3>
                          {pkg.popular && <Badge variant="default">Popular</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{pkg.capacity} System</p>
                      </div>
                      <Badge variant={pkg.status === "active" ? "default" : "secondary"}>{pkg.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium">Package Includes:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {pkg.components.map((component, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-current rounded-full" />
                            {component}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <div className="text-2xl font-bold">₦{pkg.price.toLocaleString()}</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
