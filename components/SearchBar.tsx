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
    <form onSubmit={handleSubmit}>
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            console.log('Input changed:', e.target.value)
            setQuery(e.target.value)
          }}
          onKeyDown={(e) => console.log('Key pressed:', e.key)}
          onClick={() => console.log('Input clicked')}
          onFocus={() => console.log('Input focused')}
          placeholder="Search articles..."
          style={{
            width: '100%',
            padding: '16px 140px 16px 24px',
            fontSize: '18px',
            borderRadius: '8px',
            border: '2px solid #d1d5db',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        <button
          type="submit"
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#002147',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </div>
    </form>
  )
}

