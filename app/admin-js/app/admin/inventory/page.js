"use client"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import DataTable from "../components/DataTable"

export default function InventoryPage() {
  const items = useQuery(api.singleItems.getAll) || []

  const columns = [
    {
      header: "Product",
      accessor: "name",
      cell: (item) => (
        <div className="flex items-center">
          {item.imageUrl && <img className="h-8 w-8 rounded mr-3" src={item.imageUrl || "/placeholder.svg"} alt="" />}
          <div>
            <div className="text-sm font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500">{item.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Current Stock",
      accessor: "stock",
      cell: (item) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            item.stock > 10
              ? "bg-green-100 text-green-800"
              : item.stock > 0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {item.stock} units
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (item) => {
        if (item.stock === 0) return <span className="text-red-600 font-medium">Out of Stock</span>
        if (item.stock <= 5) return <span className="text-yellow-600 font-medium">Low Stock</span>
        return <span className="text-green-600 font-medium">In Stock</span>
      },
    },
    {
      header: "Price",
      accessor: "price",
      cell: (item) => `$${item.price}`,
    },
  ]

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="mt-2 text-sm text-gray-700">Monitor stock levels and manage inventory</p>
        </div>
      </div>

      <div className="mt-8">
        <DataTable data={items} columns={columns} />
      </div>
    </div>
  )
}
