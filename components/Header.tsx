'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              color: 'var(--white)',
              textDecoration: 'none'
            }}
          >
            Clearance First Support
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem' }}>
              <li>
                <Link
                  href="/"
                  style={{
                    color: 'var(--white)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.3s'
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  style={{
                    color: 'var(--white)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.3s'
                  }}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/request-introduction"
                  style={{
                    color: 'var(--white)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.3s'
                  }}
                >
                  Request Introduction
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={{
                    color: 'var(--white)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.3s'
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <Link
              href="/login"
              className="header-login-btn"
            >
              Login
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                  style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/request-introduction"
                  style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Request Introduction
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}
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
