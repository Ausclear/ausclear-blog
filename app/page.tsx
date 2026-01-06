import Link from 'next/link'

export default async function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="container-custom">
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            Security Clearance Knowledge Base
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '2.5rem', opacity: 0.95 }}>
            Expert guidance for Australian security clearances
          </p>
          <div className="search-container">
            <input type="text" className="search-bar" placeholder="Search our knowledge base..." />
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div style={{ background: 'white', padding: '4rem 2rem' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'var(--light-grey)',
              borderRadius: '8px',
              border: '1px solid var(--mid-grey)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
              <h3 style={{ color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                Comprehensive Resources
              </h3>
              <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem' }}>
                In-depth articles covering all aspects of Australian security clearances
              </p>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'var(--light-grey)',
              borderRadius: '8px',
              border: '1px solid var(--mid-grey)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
              <h3 style={{ color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                Expert Guidance
              </h3>
              <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem' }}>
                Professional insights to navigate your clearance journey with confidence
              </p>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'var(--light-grey)',
              borderRadius: '8px',
              border: '1px solid var(--mid-grey)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                Up-to-Date Information
              </h3>
              <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem' }}>
                Current, accurate information on clearance requirements and processes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Preview Section */}
      <div style={{ background: 'var(--light-grey)', padding: '4rem 2rem' }}>
        <div className="container-custom">
          <div className="section-title">
            <h2>Explore by Topic</h2>
            <p>Find the information you need, organised by category</p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/categories" className="btn" style={{
              padding: '1.25rem 3rem',
              fontSize: '1.1rem',
              display: 'inline-block',
              boxShadow: '0 4px 12px rgba(0, 33, 71, 0.2)'
            }}>
              Browse All Categories →
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, #003a70 100%)',
        padding: '4rem 2rem',
        color: 'white'
      }}>
        <div className="container-custom" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            Need Personalised Assistance?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.9 }}>
            Our team is ready to help you navigate your security clearance journey
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-introduction" style={{
              background: 'var(--gold)',
              color: 'var(--navy)',
              padding: '1.25rem 2.5rem',
              borderRadius: '4px',
              fontSize: '1.1rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 4px 12px rgba(184, 134, 11, 0.3)'
            }}>
              Request Introduction
            </Link>
            <Link href="/contact" style={{
              background: 'white',
              color: 'var(--navy)',
              padding: '1.25rem 2.5rem',
              borderRadius: '4px',
              fontSize: '1.1rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
            }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
