'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-navy border-b-4 border-gold sticky top-0 z-50 shadow-lg">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-2xl md:text-3xl font-bold text-white tracking-wider">
              AusClear
            </span>
            <span className="text-xs md:text-sm text-gold tracking-widest uppercase">
              Knowledge Base
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-gold transition-colours duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="text-white hover:text-gold transition-colours duration-200 font-medium"
            >
              Categories
            </Link>
            <Link
              href="/search"
              className="text-white hover:text-gold transition-colours duration-200 font-medium"
            >
              Search
            </Link>
            <Link
              href="/request-introduction"
              className="text-white hover:text-gold transition-colours duration-200 font-medium"
            >
              Request Introduction
            </Link>
            <Link
              href="/contact"
              className="bg-gold text-navy px-6 py-2 rounded-md hover:bg-yellow-600 transition-colours duration-200 font-semibold"
            >
              Contact Us
            </Link>
          </div>

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
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="/"
              className="block text-white hover:text-gold transition-colours duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="block text-white hover:text-gold transition-colours duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/search"
              className="block text-white hover:text-gold transition-colours duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
            <Link
              href="/request-introduction"
              className="block text-white hover:text-gold transition-colours duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Introduction
            </Link>
            <Link
              href="/contact"
              className="block bg-gold text-navy px-6 py-2 rounded-md hover:bg-yellow-600 transition-colours duration-200 font-semibold text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
