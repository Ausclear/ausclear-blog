import ContactForm from '@/components/ContactForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the AusClear team. We are here to help with your security clearance enquiries.',
}

export default function ContactPage() {
  return (
    <div className="form-container" style={{ marginTop: '3rem' }}>
      <h2 style={{ color: 'var(--navy)', marginBottom: '1rem', textAlign: 'center' }}>Contact Us</h2>
      <p style={{ color: 'var(--text-grey)', marginBottom: '2rem', textAlign: 'center' }}>
        Have a question? Send us a message and we'll get back to you within 24 hours
      </p>

      <ContactForm />
    </div>
  )
}
