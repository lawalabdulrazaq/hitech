"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Upload, ImageIcon, Video, File, Trash2 } from "lucide-react"

interface MediaItem {
  id: string
  name: string
  type: "image" | "video" | "document"
  size: string
  uploadDate: string
  url: string
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    name: "solar-panel-installation.jpg",
    type: "image",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    url: "/images/w1.jpg",
  },
  {
    id: "2",
    name: "battery-setup-guide.pdf",
    type: "document",
    size: "1.8 MB",
    uploadDate: "2024-01-12",
    url: "#",
  },
  {
    id: "3",
    name: "inverter-demo.mp4",
    type: "video",
    size: "15.2 MB",
    uploadDate: "2024-01-10",
    url: "#",
  },
  {
    id: "4",
    name: "solar-street-light.jpg",
    type: "image",
    size: "1.9 MB",
    uploadDate: "2024-01-08",
    url: "/images/w2.jpg",
  },
]

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMedia = mediaItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getTypeIcon = (type: MediaItem["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-8 w-8 text-blue-500" />
      case "video":
        return <Video className="h-8 w-8 text-green-500" />
      case "document":
        return <File className="h-8 w-8 text-orange-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage your images, videos, and documents</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mediaItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mediaItems.filter((item) => item.type === "image").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mediaItems.filter((item) => item.type === "video").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mediaItems.filter((item) => item.type === "document").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Media Files</CardTitle>
          <CardDescription>Browse and manage your media library</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMedia.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-center">
                      {item.type === "image" ? (
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                          {getTypeIcon(item.type)}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{item.size}</span>
                        <span>{item.uploadDate}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
