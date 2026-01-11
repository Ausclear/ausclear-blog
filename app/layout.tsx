import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnthonyAIWidget from '@/components/AnthonyAIWidget'

export const metadata: Metadata = {
  title: {
    default: 'Clearance First Support | Security Clearance Information',
    template: '%s | Clearance First Support'
  },
  description: 'Comprehensive knowledge base for Australian security clearances. Learn about clearance types, application processes, eligibility requirements, and more.',
  keywords: ['Australian security clearance', 'AGSVA', 'clearance application', 'security vetting', 'Clearance First'],
  authors: [{ name: 'Clearance First' }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://support.ausclear.au',
    siteName: 'Clearance First Support',
    title: 'Clearance First Support | Security Clearance Information',
    description: 'Comprehensive knowledge base for Australian security clearances.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clearance First Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clearance First Support',
    description: 'Comprehensive knowledge base for Australian security clearances.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU">
      <body>
        <Script
          src="/tracking.js"
          strategy="afterInteractive"
        />
        
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <AnthonyAIWidget />
      </body>
    </html>
  )
}

