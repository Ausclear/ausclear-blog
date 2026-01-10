import Link from 'next/link'
import Script from 'next/script'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer style={{
        background: 'var(--header-navy)',
        color: 'var(--white)',
        marginTop: '4rem',
        borderTop: '4px solid var(--gold)'
      }}>
        <div className="container-custom" style={{ padding: '3rem 2rem 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* Company Info */}
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                AusClear Support
              </h3>
              <p style={{
                color: '#9CA3AF',
                lineHeight: 1.6,
                fontSize: '0.95rem'
              }}>
                Your comprehensive resource for Australian security clearance information. Professional guidance every step of the way.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Home
                  </Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/categories" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Browse Categories
                  </Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/search" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Search Articles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                Get Help
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/contact" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Contact Us
                  </Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/request-introduction" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Request Introduction
                  </Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="mailto:support@ausclear.com.au" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
                    support@ausclear.com.au
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <p style={{
              color: '#9CA3AF',
              fontSize: '0.9rem',
              margin: 0
            }}>
              &copy; {currentYear} AusClear. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Privacy Policy
              </a>
              <a href="#" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      <Script
        id="visitor-tracking-footer"
        strategy="lazyOnload"
        src="https://www.ausclear.com.au/tracking-script.js"
      />
    </>
  )
}
