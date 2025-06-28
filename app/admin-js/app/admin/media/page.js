"use client"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

export default function MediaPage() {
  const media = useQuery(api.media.getAll) || []
  const deleteMedia = useMutation(api.media.remove)

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this media file?")) {
      try {
        await deleteMedia({ id })
        toast.success("Media deleted successfully")
      } catch (error) {
        toast.error("Error deleting media")
      }
    }
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="mt-2 text-sm text-gray-700">Manage your uploaded images and videos</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {media.map((item) => (
          <div key={item._id} className="relative group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
              {item.type?.startsWith("image/") ? (
                <img
                  src={item.url || "/placeholder.svg"}
                  alt={item.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <PhotoIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleDelete(item._id)}
                className="rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-900 truncate">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
