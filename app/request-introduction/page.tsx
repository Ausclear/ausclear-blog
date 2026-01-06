import RequestIntroductionForm from '@/components/RequestIntroductionForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Introduction',
  description: 'Request an introduction to AusClear security clearance services. Our team will contact you to discuss your requirements.',
}

export default function RequestIntroductionPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Request an Introduction
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Interested in AusClear's security clearance services? Fill out the form below and
              our team will be in touch to discuss your requirements.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border-t-4 border-gold">
            <RequestIntroductionForm />
          </div>

          {/* Info Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gold">
              <h3 className="text-lg font-bold text-navy mb-3">📞 Quick Response</h3>
              <p className="text-gray-600 text-sm">
                We aim to respond to all requests within 1 business day.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gold">
              <h3 className="text-lg font-bold text-navy mb-3">🔒 Secure & Confidential</h3>
              <p className="text-gray-600 text-sm">
                Your information is handled securely and kept strictly confidential.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gold">
              <h3 className="text-lg font-bold text-navy mb-3">💼 Professional Service</h3>
              <p className="text-gray-600 text-sm">
                Expert guidance through every step of your clearance journey.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gold">
              <h3 className="text-lg font-bold text-navy mb-3">🎯 Tailored Solutions</h3>
              <p className="text-gray-600 text-sm">
                Services customised to meet your specific requirements.
              </p>
            </div>
          </div>

          {/* Alternative Contact */}
          <div className="mt-12 text-center bg-navy text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-3">Prefer to Contact Us Directly?</h3>
            <p className="text-gray-300 mb-6">
              You can also reach us through our general contact form
            </p>
            <a
              href="/contact"
              className="inline-block bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colours"
            >
              Go to Contact Page
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
