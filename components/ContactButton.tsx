'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ContactButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href="/contact"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-block',
        background: isHovered ? '#f1c40f' : 'white',
        color: isHovered ? 'white' : '#002147',
        padding: '16px 40px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: '18px',
        transition: 'all 0.3s ease'
      }}
    >
      Contact Us
    </Link>
  )
}
