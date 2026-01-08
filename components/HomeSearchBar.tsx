'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function HomeSearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with query:', query)
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      position: 'relative',
      zIndex: 100 
    }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <input 
          type="text" 
          placeholder="Search our knowledge base..." 
          value={query}
          onChange={(e) => {
            console.log('Input changed:', e.target.value)
            setQuery(e.target.value)
          }}
          onClick={() => console.log('Input clicked!')}
          onFocus={() => console.log('Input focused!')}
          style={{
            width: '100%',
            padding: '16px 24px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            outline: 'none',
            boxSizing: 'border-box',
            pointerEvents: 'auto',
            userSelect: 'text',
            WebkitUserSelect: 'text'
          }}
        />
      </form>
    </div>
  )
}
