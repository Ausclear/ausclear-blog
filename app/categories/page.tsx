import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all knowledge base categories to find information about Australian security clearances.',
}

export const revalidate = 3600

export default async function CategoriesPage() {
  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container-custom">
        <div className="section-title">
          <h2>Browse by Category</h2>
          <p>Select a clearance level or topic to view relevant articles</p>
        </div>

        <div className="category-grid">
          <div className="category-card">
            <div className="category-icon">📘</div>
            <h3>AusClear Insights</h3>
            <p>28 articles • Expert insights and industry updates</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🔒</div>
            <h3>Security Clearances</h3>
            <p>15 articles • Comprehensive clearance information</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🏢</div>
            <h3>AusClear</h3>
            <p>11 articles • About our services and approach</p>
          </div>

          <div className="category-card">
            <div className="category-icon">💰</div>
            <h3>AGSVA Fees</h3>
            <p>10 articles • Costs and pricing information</p>
          </div>

          <div className="category-card">
            <div className="category-icon">❓</div>
            <h3>FAQs</h3>
            <p>9 articles • Frequently asked questions</p>
          </div>

          <div className="category-card">
            <div className="category-icon">📄</div>
            <h3>Summary Articles for Security Clearances</h3>
            <p>9 articles • Quick reference summaries</p>
          </div>

          <div className="category-card">
            <div className="category-icon">📝</div>
            <h3>Application Process</h3>
            <p>7 articles • Step-by-step application guides</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🛡️</div>
            <h3>Cyber Security</h3>
            <p>6 articles • Security awareness and best practices</p>
          </div>

          <div className="category-card">
            <div className="category-icon">⚖️</div>
            <h3>Policy and Regulations</h3>
            <p>5 articles • Government policies and compliance</p>
          </div>

          <div className="category-card">
            <div className="category-icon">📈</div>
            <h3>Trends & Predictions</h3>
            <p>4 articles • Industry trends and future outlook</p>
          </div>

          <div className="category-card">
            <div className="category-icon">💼</div>
            <h3>Careers & Opportunities as a Clearance Holder</h3>
            <p>3 articles • Career opportunities for cleared personnel</p>
          </div>

          <div className="category-card">
            <div className="category-icon">👁️</div>
            <h3>Security Awareness</h3>
            <p>3 articles • Security culture and awareness</p>
          </div>

          <div className="category-card">
            <div className="category-icon">⚠️</div>
            <h3>Disclaimer</h3>
            <p>1 article • Important legal disclaimer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
