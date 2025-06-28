"use client"

import { useState } from "react"
import { Upload, Search, MoreVertical } from "lucide-react"

interface MediaFile {
  id: string
  name: string
  type: "image" | "video"
  size: string
  uploadDate: string
  usageCount: number
  url: string
}

const mockMediaFiles: MediaFile[] = [
  {
    id: "1",
    name: "solar-panel-installation.jpg",
    type: "image",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    usageCount: 5,
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "battery-setup-guide.mp4",
    type: "video",
    size: "15.2 MB",
    uploadDate: "2024-01-14",
    usageCount: 2,
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "inverter-specifications.jpg",
    type: "image",
    size: "1.8 MB",
    uploadDate: "2024-01-13",
    usageCount: 8,
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    name: "solar-fan-demo.mp4",
    type: "video",
    size: "22.1 MB",
    uploadDate: "2024-01-12",
    usageCount: 3,
    url: "/placeholder.svg?height=200&width=300",
  },
]

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(mockMediaFiles)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all")

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || file.type === filterType
    return matchesSearch && matchesType
  })

  const handleDelete = (id: string) => {
    setMediaFiles(mediaFiles.filter((file) => file.id !== id))
  }

  const getTypeColor = (type: MediaFile["type"]) => {
    return type === "image" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage your images and videos for products and marketing.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Upload className="h-4 w-4" />
          Upload Media
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search media files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as "all" | "image" | "video")}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFiles.map((file) => (
          <div key={file.id} className="bg-white rounded-lg border overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              <img src={file.url || "/placeholder.svg"} alt={file.name} className="w-full h-full object-cover" />
              <span className={`absolute top-2 left-2 px-2 py-1 rounded text-xs ${getTypeColor(file.type)}`}>
                {file.type}
              </span>
              <div className="absolute top-2 right-2">
                <button className="p-1 bg-white/80 hover:bg-white rounded">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium truncate" title={file.name}>
                {file.name}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                <span>{file.size}</span>
                <span>Used {file.usageCount}x</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{new Date(file.uploadDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No media files found</h3>
          <p className="text-gray-600">
            {searchTerm || filterType !== "all"
              ? "Try adjusting your search or filters"
              : "Upload your first media file to get started"}
          </p>
        </div>
      )}
    </div>
  )
}
