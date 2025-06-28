"use client"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import DataTable from "../components/DataTable"

export default function CustomersPage() {
  const inquiries = useQuery(api.inquiries.getAll) || []

  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Phone",
      accessor: "phone",
    },
    {
      header: "Message",
      accessor: "message",
      cell: (inquiry) => <div className="max-w-xs truncate">{inquiry.message}</div>,
    },
    {
      header: "Date",
      accessor: "date",
      cell: (inquiry) => new Date(inquiry._creationTime).toLocaleDateString(),
    },
  ]

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="mt-2 text-sm text-gray-700">View and manage customer inquiries and information</p>
        </div>
      </div>

      <div className="mt-8">
        <DataTable data={inquiries} columns={columns} />
      </div>
    </div>
  )
}
