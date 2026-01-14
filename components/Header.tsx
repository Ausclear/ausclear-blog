'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <header style={{ background: 'var(--header-navy)', color: 'var(--white)', padding: '1rem 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--gold)',
              textDecoration: 'none',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Clearance First Support
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              style={{
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                padding: '8px 16px',
                borderRadius: '4px',
                border: hoveredItem === 'home' ? '2px solid var(--gold)' : '2px solid transparent',
                backgroundColor: hoveredItem === 'home' ? 'var(--gold)' : 'transparent',
                color: hoveredItem === 'home' ? 'var(--header-navy)' : 'var(--gold)',
                display: 'inline-block'
              }}
              onMouseEnter={() => setHoveredItem('home')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Home
            </Link>
            <Link
              href="/categories"
              style={{
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                padding: '8px 16px',
                borderRadius: '4px',
                border: hoveredItem === 'categories' ? '2px solid var(--gold)' : '2px solid transparent',
                backgroundColor: hoveredItem === 'categories' ? 'var(--gold)' : 'transparent',
                color: hoveredItem === 'categories' ? 'var(--header-navy)' : 'var(--gold)',
                display: 'inline-block'
              }}
              onMouseEnter={() => setHoveredItem('categories')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Categories
            </Link>
            <Link
              href="/request-introduction"
              style={{
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                padding: '8px 16px',
                borderRadius: '4px',
                border: hoveredItem === 'request' ? '2px solid var(--gold)' : '2px solid transparent',
                backgroundColor: hoveredItem === 'request' ? 'var(--gold)' : 'transparent',
                color: hoveredItem === 'request' ? 'var(--header-navy)' : 'var(--gold)',
                display: 'inline-block'
              }}
              onMouseEnter={() => setHoveredItem('request')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Request Introduction
            </Link>
            <Link
              href="/contact"
              style={{
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                padding: '8px 16px',
                borderRadius: '4px',
                border: hoveredItem === 'contact' ? '2px solid var(--gold)' : '2px solid transparent',
                backgroundColor: hoveredItem === 'contact' ? 'var(--gold)' : 'transparent',
                color: hoveredItem === 'contact' ? 'var(--header-navy)' : 'var(--gold)',
                display: 'inline-block'
              }}
              onMouseEnter={() => setHoveredItem('contact')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Contact
            </Link>
            <Link
              href="/login"
              style={{
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                padding: '8px 16px',
                borderRadius: '4px',
                border: hoveredItem === 'login' ? '2px solid var(--gold)' : '2px solid transparent',
                backgroundColor: hoveredItem === 'login' ? 'var(--gold)' : 'transparent',
                color: hoveredItem === 'login' ? 'var(--header-navy)' : 'var(--gold)',
                display: 'inline-block'
              }}
              onMouseEnter={() => setHoveredItem('login')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Login
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2"
            style={{ color: 'var(--gold)', transition: 'opacity 0.3s' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center' }}>
              <li>
                <Link
                  href="/"
                  style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500, display: 'block', padding: '12px' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500, display: 'block', padding: '12px' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/request-introduction"
                  style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500, display: 'block', padding: '12px' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Request Introduction
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500, display: 'block', padding: '12px' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500, display: 'block', padding: '12px' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
