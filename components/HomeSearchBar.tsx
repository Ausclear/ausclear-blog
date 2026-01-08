'use client'

export default function HomeSearchBar() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim()
      if (value) {
        window.location.href = `/search?q=${encodeURIComponent(value)}`
      }
    }
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto'
    }}>
      <input 
        type="text" 
        placeholder="Search our knowledge base..." 
        onKeyDown={handleKeyDown}
        style={{
          width: '600px',
          padding: '16px 24px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '4px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'block'
        }}
      />
    </div>
  )
}
