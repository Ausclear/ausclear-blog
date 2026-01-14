import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RequestIntroModal from '@/components/RequestIntroModal'
// import AnthonyAIWidget from '@/components/AnthonyAIWidget' // TEMPORARILY DISABLED

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
        {/* <AnthonyAIWidget /> */} {/* TEMPORARILY DISABLED */}
        <RequestIntroModal />
        <Script id="request-intro-interceptor" strategy="afterInteractive">
          {`
            document.addEventListener('click', function(e) {
              const target = e.target.closest('a[href="/request-introduction"], button[href="/request-introduction"]');
              if (target) {
                e.preventDefault();
                e.stopPropagation();
                document.getElementById('request-intro-trigger')?.click();
              }
            }, true);
          `}
        </Script>
      </body>
    </html>
  )
}

