"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Upload, Search, MoreVertical, Eye, Trash2, Download } from "lucide-react"

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
  const [filterType, setFilterType] = useState<string>("all")

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || file.type === filterType
    return matchesSearch && matchesType
  })

  const handleDelete = (id: string) => {
    setMediaFiles(mediaFiles.filter((file) => file.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage your images and videos for products and marketing.</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search media files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFiles.map((file) => (
          <Card key={file.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <img src={file.url || "/placeholder.svg"} alt={file.name} className="w-full h-full object-cover" />
              <Badge className="absolute top-2 left-2" variant={file.type === "image" ? "default" : "secondary"}>
                {file.type}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(file.id)} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium truncate" title={file.name}>
                {file.name}
              </h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                <span>{file.size}</span>
                <span>Used {file.usageCount}x</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{new Date(file.uploadDate).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No media files found</h3>
          <p className="text-muted-foreground">
            {searchTerm || filterType !== "all"
              ? "Try adjusting your search or filters"
              : "Upload your first media file to get started"}
          </p>
        </div>
      )}
    </div>
  )
}
