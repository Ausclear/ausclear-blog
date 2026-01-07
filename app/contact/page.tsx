import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact AusClear - Security Clearance Sponsorship & Consulting',
  description: 'Contact AusClear for expert security clearance sponsorship and assistance. NV1, NV2, and Baseline clearance specialists.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Hero */}
      <div className="bg-navy text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6">
            <ol className="flex items-center space-x-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-white font-medium">Contact</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact AusClear</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Whether you have a query, need more information or are ready to kickstart your security clearance journey, we are just a message away.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email Card */}
            <a
              href="mailto:support@ausclear.com.au?subject=Security%20Clearance%20Enquiry"
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center border-l-4 border-gold group"
            >
              <div className="text-6xl mb-4">✉️</div>
              <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                Email
              </h3>
              <p className="text-gray-600 mb-4">Email support to start your journey</p>
              <p className="text-sm font-semibold text-navy">support@ausclear.com.au</p>
            </a>

            {/* Phone Card */}
            <a
              href="tel:1300027423"
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center border-l-4 border-gold group"
            >
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                Call Us
              </h3>
              <p className="text-gray-600 mb-4">Lines open Monday to Friday<br />9am to 5pm ACST</p>
              <p className="text-sm font-semibold text-navy">1300 027 423</p>
            </a>

            {/* Schedule Card */}
            <div
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center border-l-4 border-gold group cursor-pointer"
              onClick={() => {
                const modal = document.getElementById('bookingModal');
                if (modal) modal.style.display = 'block';
              }}
            >
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                Schedule a Call
              </h3>
              <p className="text-gray-600 mb-4">Can't decide, schedule a call back at your convenience</p>
              <p className="text-sm font-semibold text-navy">Choose your preferred slot</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Form and Business Info */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Business Info Sidebar */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-navy mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Need Professional Help? We've Got You Covered! Kindly complete the contact form with your details and message.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                AusClear delivers responsive, expert support for individuals, defence contractors and organisations navigating Baseline, NV1 and NV2 security clearances.
              </p>

              {/* Business Info Card */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-navy text-white p-6">
                  <h3 className="text-xl font-bold text-center">Business Information</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex gap-3">
                    <div className="text-2xl flex-shrink-0">🏢</div>
                    <div>
                      <p className="font-bold text-navy">AusClear</p>
                      <p className="text-sm text-gray-600">82 Onkaparinga Valley Road</p>
                      <p className="text-sm text-gray-600">Woodside SA 5244</p>
                      <p className="text-sm text-gray-600">Australia</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="text-2xl flex-shrink-0">⏰</div>
                    <div>
                      <p className="font-bold text-navy">Opening Hours</p>
                      <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM ACST</p>
                      <span id="businessStatus" className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold"></span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="text-2xl flex-shrink-0">📞</div>
                    <div>
                      <a href="tel:1300027423" className="text-gray-800 hover:text-navy transition-colors">
                        1300 027 423
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="text-2xl flex-shrink-0">✉️</div>
                    <div>
                      <a href="mailto:support@ausclear.com.au" className="text-gray-800 hover:text-navy transition-colors">
                        support@ausclear.com.au
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="text-2xl flex-shrink-0">🏛️</div>
                    <div>
                      <p className="text-sm text-gray-600"><span className="font-bold text-navy">ABN:</span> 70 628 031 587</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
