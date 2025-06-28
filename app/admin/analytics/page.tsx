export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">View business insights and performance metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Revenue This Month</h3>
          <p className="text-2xl font-bold text-green-600">$45,231</p>
          <p className="text-xs text-green-600">+20.1% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Orders This Month</h3>
          <p className="text-2xl font-bold">156</p>
          <p className="text-xs text-green-600">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">New Customers</h3>
          <p className="text-2xl font-bold">78</p>
          <p className="text-xs text-green-600">+15% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
          <p className="text-2xl font-bold">3.2%</p>
          <p className="text-xs text-red-600">-0.5% from last month</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Chart placeholder - Sales over time</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Solar Battery 12V 100Ah</span>
              <span className="font-medium">45 sold</span>
            </div>
            <div className="flex justify-between items-center">
              <span>DC Ceiling Fan 48V</span>
              <span className="font-medium">32 sold</span>
            </div>
            <div className="flex justify-between items-center">
              <span>MPPT Controller 60A</span>
              <span className="font-medium">28 sold</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Solar Panel 300W</span>
              <span className="font-medium">24 sold</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Customer Segments</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center p-4 bg-blue-50 rounded">
            <p className="text-2xl font-bold text-blue-600">65%</p>
            <p className="text-sm text-gray-600">Residential</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded">
            <p className="text-2xl font-bold text-green-600">25%</p>
            <p className="text-sm text-gray-600">Commercial</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded">
            <p className="text-2xl font-bold text-purple-600">10%</p>
            <p className="text-sm text-gray-600">Industrial</p>
          </div>
        </div>
      </div>
    </div>
  )
}
