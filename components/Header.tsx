'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Shared menu link style
  const menuLinkStyle = {
    color: 'var(--gold)',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    padding: '8px 16px',
    borderRadius: '4px',
  }

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
          <nav className="hidden md:flex items-center gap-8">
            <ul style={{ listStyle: 'none', display: 'flex', gap: '0.5rem' }}>
              <li>
                <Link
                  href="/"
                  style={menuLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(241, 196, 15, 0.1)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  style={menuLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(241, 196, 15, 0.1)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/request-introduction"
                  style={menuLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(241, 196, 15, 0.1)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Request Introduction
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={menuLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(241, 196, 15, 0.1)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <Link
              href="/login"
              style={{
                ...menuLinkStyle,
                border: '2px solid var(--gold)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--gold)'
                e.currentTarget.style.color = 'var(--header-navy)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--gold)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
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
                  style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500, display: 'block', padding: '12px', border: '2px solid var(--gold)', margin: '8px 16px', borderRadius: '4px' }}
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
