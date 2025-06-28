interface SolarPackage {
  id: string
  name: string
  description: string
  items: string[]
  price: number
}

export default function PackagesPage() {
  const packages: SolarPackage[] = [
    {
      id: "1",
      name: "Basic Home Package",
      description: "Perfect for small homes and apartments",
      items: ["4x Solar Panels 300W", "2x Batteries 12V 100Ah", "1x MPPT Controller 60A", "1x Inverter 2000W"],
      price: 2499,
    },
    {
      id: "2",
      name: "Premium Home Package",
      description: "Ideal for medium to large homes",
      items: ["8x Solar Panels 300W", "4x Batteries 12V 100Ah", "1x MPPT Controller 100A", "1x Inverter 5000W"],
      price: 4999,
    },
    {
      id: "3",
      name: "Commercial Package",
      description: "For businesses and large installations",
      items: ["16x Solar Panels 300W", "8x Batteries 12V 200Ah", "2x MPPT Controller 100A", "1x Inverter 10000W"],
      price: 9999,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solar Packages</h1>
          <p className="text-muted-foreground">Manage complete solar system packages and configurations.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Package</button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">{pkg.name}</h3>
            <p className="text-gray-600 mb-4">{pkg.description}</p>
            <div className="space-y-2 text-sm">
              {pkg.items.map((item, index) => (
                <p key={index}>• {item}</p>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-2xl font-bold text-green-600">${pkg.price.toLocaleString()}</p>
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">Edit</button>
                <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
