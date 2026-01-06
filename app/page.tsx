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
        {/* Latest Articles */}
        <div className="section-title">
          <h2>Latest Articles</h2>
          <p>Recently published and updated content</p>
        </div>

        <div className="article-list">
          <div className="article-item">
            <h4><Link href="/articles/nv2-clearance">NV2 Clearance: Everything You Need to Know in 2024</Link></h4>
            <div className="article-meta">
              <span>🔐 Security Clearances</span> •
              <span>Updated 2 Jan 2025</span> •
              <span>12 min read</span>
            </div>
          </div>
          <div className="article-item">
            <h4><Link href="/articles/agsva-processing-times">AGSVA Processing Times: Current Estimates</Link></h4>
            <div className="article-meta">
              <span>📘 AusClear Insights</span> •
              <span>Updated 30 Dec 2024</span> •
              <span>8 min read</span>
            </div>
          </div>
          <div className="article-item">
            <h4><Link href="/articles/baseline-mistakes">Common Mistakes in Baseline Clearance Applications</Link></h4>
            <div className="article-meta">
              <span>📝 Application Process</span> •
              <span>Updated 28 Dec 2024</span> •
              <span>6 min read</span>
            </div>
          </div>
          <div className="article-item">
            <h4><Link href="/articles/clearance-fees">Security Clearance Fees: Complete Breakdown 2024</Link></h4>
            <div className="article-meta">
              <span>💰 AGSVA Fees</span> •
              <span>Updated 25 Dec 2024</span> •
              <span>5 min read</span>
            </div>
          </div>
          <div className="article-item">
            <h4><Link href="/articles/cyber-security-best-practices">Cyber Security Best Practices for Cleared Personnel</Link></h4>
            <div className="article-meta">
              <span>🛡️ Cyber Security</span> •
              <span>Updated 20 Dec 2024</span> •
              <span>10 min read</span>
            </div>
          </div>
        </div>

        {/* Popular Articles */}
        <div className="section-title" style={{ marginTop: '3rem' }}>
          <h2>Popular Articles</h2>
          <p>Most viewed content this month</p>
        </div>

        <div className="article-list">
          <div className="article-item">
            <h4><Link href="/articles/baseline-application">How to Apply for Baseline Security Clearance in Australia</Link></h4>
            <div className="article-meta">
              <span>🔒 Security Clearances</span> •
              <span>👁️ 12,450 views</span> •
              <span>5 min read</span>
            </div>
          </div>
          <div className="article-item">
            <h4><Link href="/articles/nv1-vs-nv2">NV1 vs NV2: What's the Difference?</Link></h4>
            <div className="article-meta">
              <span>❓ FAQs</span> •
              <span>👁️ 8,320 views</span> •
              <span>7 min read</span>
            </div>
          </div>
          <div className="article-item">
            <h4><Link href="/articles/eligibility-guide">Security Clearance Eligibility: Complete Guide</Link></h4>
            <div className="article-meta">
              <span>📝 Application Process</span> •
              <span>👁️ 7,890 views</span> •
              <span>9 min read</span>
            </div>
          </div>
          <div className="article-item">
            <h4><Link href="/articles/what-agsva-checks">What Does AGSVA Actually Check?</Link></h4>
            <div className="article-meta">
              <span>❓ FAQs</span> •
              <span>👁️ 6,540 views</span> •
              <span>8 min read</span>
            </div>
          </div>
          <div className="article-item">
            <h4><Link href="/articles/career-opportunities">Career Opportunities for Cleared Personnel</Link></h4>
            <div className="article-meta">
              <span>💼 Careers & Opportunities</span> •
              <span>👁️ 5,230 views</span> •
              <span>11 min read</span>
            </div>
          </div>
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
