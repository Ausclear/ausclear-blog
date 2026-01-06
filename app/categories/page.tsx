import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all knowledge base categories to find information about Australian security clearances.',
}

export const revalidate = 3600

export default async function CategoriesPage() {
  return (
    <div style={{ background: 'var(--light-grey)', minHeight: 'calc(100vh - 200px)' }}>
      {/* Header Section */}
      <div style={{ background: 'white', padding: '3rem 2rem', borderBottom: '1px solid var(--mid-grey)' }}>
        <div className="container-custom">
          <div className="section-title">
            <h1 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '1rem' }}>
              Knowledge Base Categories
            </h1>
            <p style={{ fontSize: '1.1rem' }}>
              Explore our comprehensive collection of articles organised by topic
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div style={{ padding: '3rem 2rem' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">📘</div>
              <h3>AusClear Insights</h3>
              <p>Expert insights and industry updates</p>
            </div>

            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">🔒</div>
              <h3>Security Clearances</h3>
              <p>Comprehensive clearance information</p>
            </div>

            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">🏢</div>
              <h3>AusClear</h3>
              <p>About our services and approach</p>
            </div>

            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">💰</div>
              <h3>AGSVA Fees</h3>
              <p>Costs and pricing information</p>
            </div>

            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">❓</div>
              <h3>FAQs</h3>
              <p>Frequently asked questions</p>
            </div>

            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">📄</div>
              <h3>Summary Articles</h3>
              <p>Quick reference summaries</p>
            </div>

            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">📝</div>
              <h3>Application Process</h3>
              <p>Step-by-step application guides</p>
            </div>

            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">🛡️</div>
              <h3>Cyber Security</h3>
              <p>Security awareness and best practices</p>
            </div>

            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">⚖️</div>
              <h3>Policy and Regulations</h3>
              <p>Government policies and compliance</p>
            </div>

            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">📈</div>
              <h3>Trends & Predictions</h3>
              <p>Industry trends and future outlook</p>
            </div>

            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">💼</div>
              <h3>Careers & Opportunities</h3>
              <p>Career opportunities for cleared personnel</p>
            </div>

            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">👁️</div>
              <h3>Security Awareness</h3>
              <p>Security culture and awareness</p>
            </div>

            <div className="category-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="category-icon">⚠️</div>
              <h3>Disclaimer</h3>
              <p>Important legal information</p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div style={{ padding: '3rem 2rem', background: 'white', marginTop: '3rem' }}>
        <div className="container-custom" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--navy)', fontSize: '2rem', marginBottom: '1rem' }}>
            Can't Find What You're Looking For?
          </h2>
          <p style={{ color: 'var(--text-grey)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Use our search feature or contact our team for personalised assistance
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/search" className="btn" style={{
              padding: '1rem 2rem',
              display: 'inline-block',
              boxShadow: '0 2px 8px rgba(0, 33, 71, 0.15)'
            }}>
              Search Articles
            </a>
            <a href="/contact" className="btn" style={{
              padding: '1rem 2rem',
              display: 'inline-block',
              boxShadow: '0 2px 8px rgba(0, 33, 71, 0.15)'
            }}>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
