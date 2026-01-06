import ContactForm from '@/components/ContactForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the AusClear team. We are here to help with your security clearance enquiries.',
}

export default function ContactPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Have a question or need assistance? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border-t-4 border-gold">
                <h2 className="text-2xl font-bold text-navy mb-6">Send us a Message</h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gold">
                <h3 className="text-lg font-bold text-navy mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📧</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Email</p>
                        <a
                          href="mailto:support@ausclear.au"
                          className="text-gold hover:text-navy transition-colours text-sm"
                        >
                          support@ausclear.au
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📞</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Phone</p>
                        <a
                          href="tel:+61XXXXXXXXX"
                          className="text-gold hover:text-navy transition-colours text-sm"
                        >
                          +61 X XXXX XXXX
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⏰</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Business Hours</p>
                        <p className="text-sm text-gray-600">
                          Mon-Fri: 9:00 AM - 5:00 PM AEST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="bg-navy text-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Need Help Now?</h3>
                <div className="space-y-4">
                  <a
                    href="/search"
                    className="block bg-white/10 hover:bg-white/20 transition-colours rounded-lg p-4"
                  >
                    <p className="font-semibold mb-1">🔍 Search Knowledge Base</p>
                    <p className="text-sm text-gray-300">
                      Find answers to common questions
                    </p>
                  </a>

                  <a
                    href="/categories/faq"
                    className="block bg-white/10 hover:bg-white/20 transition-colours rounded-lg p-4"
                  >
                    <p className="font-semibold mb-1">❓ FAQ</p>
                    <p className="text-sm text-gray-300">
                      View frequently asked questions
                    </p>
                  </a>

                  <a
                    href="/request-introduction"
                    className="block bg-gold text-navy hover:bg-yellow-600 transition-colours rounded-lg p-4 font-semibold text-center"
                  >
                    Request Introduction →
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-navy mb-3">Response Time</h3>
                <p className="text-sm text-gray-700">
                  We aim to respond to all enquiries within 1 business day. For urgent matters,
                  please call us directly during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
