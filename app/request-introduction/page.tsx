import RequestIntroductionForm from '@/components/RequestIntroductionForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Introduction',
  description: 'Request an introduction to AusClear security clearance services. Our team will contact you to discuss your requirements.',
}

export default function RequestIntroductionPage() {
  return (
    <div className="form-container" style={{ marginTop: '3rem' }}>
      <h2 style={{ color: 'var(--navy)', marginBottom: '1rem', textAlign: 'center' }}>
        Request Sponsor Introduction
      </h2>
      <p style={{ color: 'var(--text-grey)', marginBottom: '2rem', textAlign: 'center' }}>
        Get a personalised email introduction to our preferred clearance sponsor
      </p>

      <div className="alert alert-info">
        <strong>What happens next:</strong> We'll send you an email introducing you to our trusted clearance sponsor partner who can assist with your application.
      </div>

      <RequestIntroductionForm />
    </div>
  )
}
