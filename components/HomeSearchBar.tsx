export default function HomeSearchBar() {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto'
    }}>
      <form action="/search" method="GET" style={{ width: '100%' }}>
        <input 
          type="text"
          name="q"
          placeholder="Search our knowledge base..." 
          style={{
            width: '100%',
            padding: '16px 24px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'block',
            boxSizing: 'border-box'
          }}
        />
      </form>
    </div>
  )
}
