'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CTAButtons() {
  const [hoveredIntro, setHoveredIntro] = useState(false)
  const [hoveredContact, setHoveredContact] = useState(false)

  return (
    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Link 
        href="/request-introduction"
        onMouseEnter={() => setHoveredIntro(true)}
        onMouseLeave={() => setHoveredIntro(false)}
        style={{
          display: 'inline-block',
          background: hoveredIntro ? '#003a70' : 'white',
          color: hoveredIntro ? 'white' : '#002147',
          padding: '16px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '16px',
          transition: 'all 0.3s ease',
          transform: hoveredIntro ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: hoveredIntro ? '0 8px 20px rgba(0,0,0,0.3)' : 'none',
          minWidth: '200px',
          textAlign: 'center'
        }}
      >
        Request Introduction
      </Link>
      <Link 
        href="/contact"
        onMouseEnter={() => setHoveredContact(true)}
        onMouseLeave={() => setHoveredContact(false)}
        style={{
          display: 'inline-block',
          background: hoveredContact ? '#003a70' : 'white',
          color: hoveredContact ? 'white' : '#002147',
          padding: '16px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '16px',
          transition: 'all 0.3s ease',
          transform: hoveredContact ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: hoveredContact ? '0 8px 20px rgba(0,0,0,0.3)' : 'none',
          minWidth: '200px',
          textAlign: 'center'
        }}
      >
        Contact Us
      </Link>
    </div>
  )
}
