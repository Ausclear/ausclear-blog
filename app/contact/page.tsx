import { Metadata } from 'next'
import ContactPageClient from '@/components/ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Clearance First - Security Clearance Sponsorship & Consulting',
  description: 'Contact Clearance First for expert security clearance sponsorship and assistance. NV1, NV2, and Baseline clearance specialists.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero */}
      <div style={{
        padding: '60px 0 40px',
        background: 'linear-gradient(135deg, rgba(30,58,138,0.9) 0%, rgba(10,22,40,0.85) 100%), url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920) center/cover',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 800,
            marginBottom: '24px',
            lineHeight: 1.2,
            color: '#ffffff'
          }}>
            Contact Clearance First
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Whether you have a query, need more information or are ready to kickstart your security clearance journey, we are just a message away.
          </p>
        </div>
      </div>

      <ContactPageClient />
    </div>
  )
}

