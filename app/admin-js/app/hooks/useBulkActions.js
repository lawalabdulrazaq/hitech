"use client"
import { useState } from "react"

export function useBulkActions() {
  const [selectedItems, setSelectedItems] = useState(new Set())

  const toggleItem = (id) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedItems(newSelected)
  }

  const toggleAll = (items) => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(items.map((item) => item._id)))
    }
  }

  const clearSelection = () => {
    setSelectedItems(new Set())
  }

  return {
    selectedItems,
    toggleItem,
    toggleAll,
    clearSelection,
    hasSelection: selectedItems.size > 0,
  }
}
