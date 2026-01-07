'use client'

import { useState } from 'react'
import ContactForm from '@/components/ContactForm'
import FlipCard from '@/components/FlipCard'

export default function ContactPageClient() {
  const [showBooking, setShowBooking] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(true)

  function openBookingModal() {
    setShowBooking(true)
    setBookingLoading(true)
    document.body.style.overflow = 'hidden'
    
    // Hide loading after iframe loads or 5 seconds
    setTimeout(() => {
      setBookingLoading(false)
    }, 5000)
  }

  function closeBookingModal() {
    setShowBooking(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      {/* Contact Methods - 3 Flip Cards */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FlipCard
              frontEmoji="✉️"
              frontTitle="Email"
              frontDescription="Email support to start your journey"
              backEmoji="✉️"
              backTitle="Click to send us an email"
              backDetail="support@ausclear.com.au"
              href="mailto:support@ausclear.com.au?subject=Security%20Clearance%20Enquiry"
            />
            
            <FlipCard
              frontEmoji="📞"
              frontTitle="Call Us"
              frontDescription="Lines open Monday to Friday<br>9am to 5pm"
              backEmoji="📞"
              backTitle="Click to call us now"
              backDetail="1300 027 423"
              href="tel:1300027423"
            />
            
            <FlipCard
              frontEmoji="📅"
              frontTitle="Schedule a Call"
              frontDescription="Can't decide, schedule a call back at your convenience"
              backEmoji="📅"
              backTitle="Click to book a time"
              backDetail="Choose your preferred slot"
              onClick={openBookingModal}
            />
          </div>
        </div>
      </section>

      {/* Main Content - Sidebar + Form */}
      <section style={{ padding: '100px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[60px] items-start">
            {/* Sidebar - 35% */}
            <div className="w-full lg:flex-[0_0_35%] lg:max-w-[450px]">
              <h2 style={{
                fontSize: '40px',
                fontWeight: 800,
                color: '#002147',
                marginBottom: '16px',
                lineHeight: 1.2,
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '40px',
                  background: '#dc2626',
                  marginRight: '16px',
                  borderRadius: '3px'
                }}></span>
                Get In Touch
              </h2>
              
              <p style={{
                fontSize: '18px',
                color: '#475569',
                lineHeight: 1.7,
                marginBottom: '24px'
              }}>
                Need Professional Help? We've Got You Covered! Kindly complete the contact form with your details and message. At AusClear, we are dedicated to assisting you with your security clearance needs, and our team will contact you within the next few hours.
              </p>

              <p style={{
                fontSize: '18px',
                color: '#475569',
                lineHeight: 1.7,
                marginBottom: '48px'
              }}>
                AusClear delivers responsive, expert support for individuals, defence contractors and organisations navigating Baseline, NV1 and NV2 security clearances. Whether you're beginning the process or seeking guidance on AGSVA requirements, our team provides clear, compliant and timely assistance to keep your clearance journey on track.
              </p>

              {/* Business Info Card */}
              <div style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                marginTop: '32px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(30,58,138,0.9) 0%, rgba(10,22,40,0.85) 100%), url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920) center/cover',
                  color: '#ffffff',
                  padding: '24px',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 700
                }}>
                  Business Information
                </div>
                
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '22px', flexShrink: 0 }}>🏢</div>
                    <div style={{ fontSize: '15px', lineHeight: 1.5, color: '#1e293b' }}>
                      <strong style={{ color: '#002147', fontWeight: 700, marginBottom: '4px', display: 'block' }}>AusClear</strong>
                      82 Onkaparinga Valley Road<br />
                      Woodside SA 5244<br />
                      Australia
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '22px', flexShrink: 0 }}>⏰</div>
                    <div style={{ fontSize: '15px', lineHeight: 1.5, color: '#1e293b' }}>
                      <strong style={{ color: '#002147', fontWeight: 700, marginBottom: '4px', display: 'block' }}>Opening Hours</strong>
                      Monday - Friday: 9:00 AM - 5:00 PM ACST<br />
                      <span id="businessStatus" className="business-status"></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '22px', flexShrink: 0 }}>📞</div>
                    <div style={{ fontSize: '15px', lineHeight: 1.5, color: '#1e293b' }}>
                      <a href="tel:1300027423" style={{ color: '#1e293b', textDecoration: 'none' }}>1300 027 423</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '22px', flexShrink: 0 }}>✉️</div>
                    <div style={{ fontSize: '15px', lineHeight: 1.5, color: '#1e293b' }}>
                      <a href="mailto:support@ausclear.com.au" style={{ color: '#1e293b', textDecoration: 'none' }}>support@ausclear.com.au</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '22px', flexShrink: 0 }}>🏛️</div>
                    <div style={{ fontSize: '15px', lineHeight: 1.5, color: '#1e293b' }}>
                      <strong style={{ color: '#002147', fontWeight: 700 }}>ABN:</strong> 70 628 031 587
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form - 65% (flex: 1) */}
            <div className="w-full lg:flex-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBooking && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-[10000] overflow-auto"
          style={{ backdropFilter: 'blur(5px)' }}
        >
          <div className="relative bg-white my-[2%] mx-auto w-[95%] max-w-[900px] h-[90vh] rounded-[15px] shadow-[0_25px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white p-5 flex justify-between items-center border-b-[3px] border-[#0066cc]">
              <h2 className="m-0 text-2xl font-bold">📅 Book Your Consultation</h2>
              <button
                onClick={closeBookingModal}
                className="text-white text-[32px] font-bold cursor-pointer w-[45px] h-[45px] flex items-center justify-center rounded-full transition-all bg-white/10 border-2 border-transparent hover:bg-white/20 hover:rotate-90 hover:border-white/30"
              >
                ×
              </button>
            </div>
            <div className="w-full h-[calc(100%-80px)] relative">
              {bookingLoading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[#002147]">
                  <div className="border-4 border-gray-300 border-t-[#002147] rounded-full w-[50px] h-[50px] animate-spin mx-auto mb-5"></div>
                  <p>Loading booking system...</p>
                </div>
              )}
              <iframe
                src="https://portal.ausclear.au/schedule-a-call.html"
                className="w-full h-full border-none block"
                onLoad={() => setBookingLoading(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
