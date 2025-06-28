"use client"
import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import DataTable from "../../components/DataTable"
import FormModal from "../../components/FormModal"
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

export default function SolarPackagesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState(null)

  const packages = useQuery(api.solarPackages.getAll) || []
  const createPackage = useMutation(api.solarPackages.create)
  const updatePackage = useMutation(api.solarPackages.update)
  const deletePackage = useMutation(api.solarPackages.remove)

  const handleSubmit = async (formData) => {
    try {
      const packageData = {
        ...formData,
        supportedDevices: formData.supportedDevices.split(",").map((d) => d.trim()),
        price: Number.parseFloat(formData.price),
        rating: Number.parseFloat(formData.rating),
      }

      if (editingPackage) {
        await updatePackage({
          id: editingPackage._id,
          ...packageData,
        })
        toast.success("Package updated successfully")
      } else {
        await createPackage(packageData)
        toast.success("Package created successfully")
      }
      setIsModalOpen(false)
      setEditingPackage(null)
    } catch (error) {
      toast.error("Error saving package")
    }
  }

  const handleEdit = (pkg) => {
    setEditingPackage({
      ...pkg,
      supportedDevices: pkg.supportedDevices?.join(", ") || "",
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this package?")) {
      try {
        await deletePackage({ id })
        toast.success("Package deleted successfully")
      } catch (error) {
        toast.error("Error deleting package")
      }
    }
  }

  const columns = [
    {
      header: "Package",
      accessor: "model",
      cell: (pkg) => (
        <div className="flex items-center">
          {pkg.imageUrl && (
            <img className="h-10 w-10 rounded-lg mr-3" src={pkg.imageUrl || "/placeholder.svg"} alt="" />
          )}
          <div>
            <div className="text-sm font-medium text-gray-900">{pkg.model}</div>
            <div className="text-sm text-gray-500">{pkg.rating}W</div>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      accessor: "price",
      cell: (pkg) => `$${pkg.price}`,
    },
    {
      header: "Controller",
      accessor: "controller",
    },
    {
      header: "Backup Time",
      accessor: "backupTime",
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (pkg) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEdit(pkg)} className="text-blue-600 hover:text-blue-900">
            <PencilIcon className="h-4 w-4" />
          </button>
          <button onClick={() => handleDelete(pkg._id)} className="text-red-600 hover:text-red-900">
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  const formFields = [
    { name: "model", label: "Package Model", type: "text", required: true },
    { name: "rating", label: "Rating (W)", type: "number", required: true },
    { name: "price", label: "Price", type: "number", required: true },
    { name: "controller", label: "Controller Type", type: "text", required: true },
    { name: "backupTime", label: "Backup Time", type: "text", required: true },
    { name: "supportedDevices", label: "Supported Devices (comma separated)", type: "textarea" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "imageUrl", label: "Image URL", type: "text" },
  ]

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Solar Packages</h1>
          <p className="mt-2 text-sm text-gray-700">Manage complete solar system packages</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="h-4 w-4 inline mr-1" />
            Add Package
          </button>
        </div>
      </div>

      <div className="mt-8">
        <DataTable data={packages} columns={columns} />
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingPackage(null)
        }}
        onSubmit={handleSubmit}
        title={editingPackage ? "Edit Package" : "Add New Package"}
        fields={formFields}
        initialData={editingPackage}
      />
    </div>
  )
}
