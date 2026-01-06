'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  initialQuery?: string
}

export default function SearchBar({ initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full px-6 py-4 pr-12 text-lg rounded-lg border-2 border-gray-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold text-navy px-6 py-2 rounded-md hover:bg-yellow-600 transition-colours font-semibold"
        >
          Search
        </button>
      </div>
    </form>
  )
}
