"use client"
import { useState, useMemo } from "react"

export function useSearchAndFilter(data, searchFields = []) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({})

  const filteredData = useMemo(() => {
    if (!data) return []

    return data.filter((item) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" || searchFields.some((field) => item[field]?.toLowerCase().includes(searchTerm.toLowerCase()))

      // Additional filters
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true
        return item[key] === value
      })

      return matchesSearch && matchesFilters
    })
  }, [data, searchTerm, filters, searchFields])

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredData,
  }
}
