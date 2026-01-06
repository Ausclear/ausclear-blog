import Link from 'next/link'

export default async function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h1>Security Clearance Knowledge Base</h1>
        <p>Find answers to your clearance questions instantly</p>
        <div className="search-container">
          <input type="text" className="search-bar" placeholder="Search for articles..." />
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom" style={{ padding: '3rem 2rem' }}>
        {/* Welcome Section */}
        <div className="section-title">
          <h2>Welcome to AusClear Support</h2>
          <p>Your comprehensive resource for Australian security clearance information</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--text-grey)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Browse our knowledge base by category or use the search above to find specific information about security clearances.
          </p>
        </div>

        {/* Browse Categories CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/categories" className="btn" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}>
            📚 Browse All Categories
          </Link>
        </div>
      </div>
    </div>
  )
}
