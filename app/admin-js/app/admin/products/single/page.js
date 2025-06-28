"use client"
import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import DataTable from "../../components/DataTable"
import FormModal from "../../components/FormModal"
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

export default function SingleItemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const items = useQuery(api.singleItems.getAll) || []
  const categories = useQuery(api.categories.getAll) || []
  const createItem = useMutation(api.singleItems.create)
  const updateItem = useMutation(api.singleItems.update)
  const deleteItem = useMutation(api.singleItems.remove)

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateItem({
          id: editingItem._id,
          ...formData,
        })
        toast.success("Item updated successfully")
      } else {
        await createItem(formData)
        toast.success("Item created successfully")
      }
      setIsModalOpen(false)
      setEditingItem(null)
    } catch (error) {
      toast.error("Error saving item")
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem({ id })
        toast.success("Item deleted successfully")
      } catch (error) {
        toast.error("Error deleting item")
      }
    }
  }

  const columns = [
    {
      header: "Name",
      accessor: "name",
      cell: (item) => (
        <div className="flex items-center">
          {item.imageUrl && (
            <img className="h-10 w-10 rounded-lg mr-3" src={item.imageUrl || "/placeholder.svg"} alt="" />
          )}
          <div>
            <div className="text-sm font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500">{item.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      accessor: "price",
      cell: (item) => `$${item.price}`,
    },
    {
      header: "Stock",
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
      header: "Actions",
      accessor: "actions",
      cell: (item) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900">
            <PencilIcon className="h-4 w-4" />
          </button>
          <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  const formFields = [
    { name: "name", label: "Product Name", type: "text", required: true },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categories.map((cat) => ({ value: cat.name, label: cat.name })),
      required: true,
    },
    { name: "price", label: "Price", type: "number", required: true },
    { name: "stock", label: "Stock Quantity", type: "number", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "specifications", label: "Specifications", type: "textarea" },
    { name: "imageUrl", label: "Image URL", type: "text" },
  ]

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Single Items</h1>
          <p className="mt-2 text-sm text-gray-700">Manage individual products like batteries, fans, and accessories</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="h-4 w-4 inline mr-1" />
            Add Item
          </button>
        </div>
      </div>

      <div className="mt-8">
        <DataTable data={items} columns={columns} />
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingItem(null)
        }}
        onSubmit={handleSubmit}
        title={editingItem ? "Edit Item" : "Add New Item"}
        fields={formFields}
        initialData={editingItem}
      />
    </div>
  )
}
