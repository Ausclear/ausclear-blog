import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnthonyAIWidget from '@/components/AnthonyAIWidget'

export const metadata: Metadata = {
  title: {
    default: 'AusClear Knowledge Base | Security Clearance Information',
    template: '%s | AusClear Knowledge Base'
  },
  description: 'Comprehensive knowledge base for Australian security clearances. Learn about clearance types, application processes, eligibility requirements, and more.',
  keywords: ['Australian security clearance', 'AGSVA', 'clearance application', 'security vetting', 'AusClear'],
  authors: [{ name: 'AusClear' }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://support.ausclear.au',
    siteName: 'AusClear Knowledge Base',
    title: 'AusClear Knowledge Base | Security Clearance Information',
    description: 'Comprehensive knowledge base for Australian security clearances.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AusClear Knowledge Base',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AusClear Knowledge Base',
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
