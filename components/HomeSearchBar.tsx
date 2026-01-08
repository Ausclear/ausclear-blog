'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function HomeSearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search our knowledge base..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
