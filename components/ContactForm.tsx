'use client'

import { useState, useEffect, FormEvent, ChangeEvent } from 'react'

export default function ContactForm() {
  const [emailValidation, setEmailValidation] = useState<{
    type: 'checking' | 'valid' | 'invalid' | 'hide'
    message: string
  }>({ type: 'hide', message: '' })
  
  const [mobileValidation, setMobileValidation] = useState<{
    type: 'valid' | 'invalid' | 'hide'
    message: string
  }>({ type: 'hide', message: '' })
  
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showThankYou, setShowThankYou] = useState(false)
  const [thankYouMessage, setThankYouMessage] = useState({
    title: 'Thank you!',
    message: 'Someone from our team will be in touch soon.'
  })
  const [showBooking, setShowBooking] = useState(false)
  const [enquiryType, setEnquiryType] = useState<'general' | 'security'>('general')
  
  // Email validation cache
  const emailCache: Record<string, any> = {}
  
  // Business hours status
  useEffect(() => {
    updateBusinessStatus()
    const interval = setInterval(updateBusinessStatus, 60000)
    return () => clearInterval(interval)
  }, [])
  
  function updateBusinessStatus() {
    const statusElement = document.getElementById('businessStatus')
    if (!statusElement) return
    
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = { 
      timeZone: 'Australia/Adelaide',
      hour12: false,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }
    
    const formatter = new Intl.DateTimeFormat('en-AU', options)
    const parts = formatter.formatToParts(now)
    
    const weekday = parts.find(p => p.type === 'weekday')?.value
    const hours = parseInt(parts.find(p => p.type === 'hour')?.value || '0')
    const minutes = parseInt(parts.find(p => p.type === 'minute')?.value || '0')
    
    const currentTime = hours * 60 + minutes
    const openTime = 9 * 60
    const closeTime = 17 * 60
    
    const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday || '')
    const isDuringBusinessHours = currentTime >= openTime && currentTime < closeTime
    
    if (isWeekday && isDuringBusinessHours) {
      statusElement.textContent = '🟢 OPEN NOW'
      statusElement.className = 'inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800'
    } else {
      statusElement.textContent = '🔴 CLOSED'
      statusElement.className = 'inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800'
    }
  }
  
  async function validateEmail(email: string) {
    if (!email) {
      setEmailValidation({ type: 'hide', message: '' })
      return
    }
    
    setEmailValidation({ type: 'checking', message: 'Verifying email address...' })
    
    if (emailCache[email]) {
      const result = emailCache[email]
      setEmailValidation({ 
        type: result.isValid ? 'valid' : 'invalid', 
        message: result.message 
      })
      return
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      const result = { isValid: false, message: 'Invalid email format' }
      emailCache[email] = result
      setEmailValidation({ type: 'invalid', message: result.message })
      return
    }
    
    try {
      const response = await fetch('https://portal.ausclear.au/api/validate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      const result = await response.json()
      emailCache[email] = result
      setEmailValidation({ 
        type: result.isValid ? 'valid' : 'invalid', 
        message: result.message 
      })
    } catch (error) {
      const result = { isValid: true, message: 'Format valid (verification service unavailable)' }
      emailCache[email] = result
      setEmailValidation({ type: 'valid', message: result.message })
    }
  }
  
  function validateMobile(mobile: string) {
    const cleanMobile = mobile.replace(/\D/g, '')
    
    if (cleanMobile.length === 0) {
      setMobileValidation({ type: 'hide', message: '' })
      return true
    } else if (cleanMobile.length < 10) {
      setMobileValidation({ type: 'invalid', message: 'Mobile must be 10 digits' })
      return false
    } else if (cleanMobile.length === 10 && !cleanMobile.startsWith('04')) {
      setMobileValidation({ type: 'invalid', message: 'Australian mobile numbers must start with 04' })
      return false
    } else if (cleanMobile.length === 10 && cleanMobile.startsWith('04')) {
      setMobileValidation({ type: 'hide', message: '' })
      return true
    }
    
    setMobileValidation({ type: 'hide', message: '' })
    return true
  }
  
  useEffect(() => {
    const isEmailValid = emailValidation.type === 'valid'
    const isMobileValid = mobileValidation.type !== 'invalid'
    setIsSubmitEnabled(isEmailValid && isMobileValid && !isSubmitting)
  }, [emailValidation, mobileValidation, isSubmitting])
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    setIsSubmitting(true)
    setProgress(0)
    
    // Get form data first
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const firstName = formData.get('First Name') as string
    const isSecurityEnquiry = formData.get('enquiry_type') === 'Security Clearance'
    const clearanceType = formData.get('LEADCF5') as string
    
    // Personalize thank you message
    const capitalizedName = firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() : ''
    const greeting = capitalizedName ? `Hi ${capitalizedName}!` : 'Thank you!'
    
    if (isSecurityEnquiry && clearanceType) {
      setThankYouMessage({
        title: greeting,
        message: `Thank you for your interest in the ${clearanceType}. Our security clearance specialists will be in touch soon to discuss your requirements. We typically respond within a few hours during business days.`
      })
    } else {
      setThankYouMessage({
        title: greeting,
        message: 'Thank you for your enquiry. Someone from our team will be in touch soon. We typically respond within a few hours during business days.'
      })
    }
    
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          
          // Submit form when progress completes
          const iframe = document.createElement('iframe')
          iframe.style.display = 'none'
          iframe.name = 'zohoFrame'
          document.body.appendChild(iframe)
          
          form.target = 'zohoFrame'
          form.submit()
          
          // Show modal immediately
          setShowThankYou(true)
          
          // Reset form after 500ms
          setTimeout(() => {
            form.reset()
            setEmailValidation({ type: 'hide', message: '' })
            setMobileValidation({ type: 'hide', message: '' })
            setProgress(0)
            setIsSubmitting(false)
            setEnquiryType('general')
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe)
            }
            form.removeAttribute('target')
          }, 500)
          
          return 100
        }
        return prev + 1
      })
    }, 30)
  }
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-navy text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Send us a Message</h2>
          <p className="text-gray-200">We'll respond within a few hours during business days</p>
        </div>
        
        <div className="p-8">
          <form
            id="contactForm"
            action="https://crm.zoho.com.au/crm/WebToLeadForm"
            method="POST"
            acceptCharset="UTF-8"
            onSubmit={handleSubmit}
          >
            {/* Hidden Zoho fields */}
            <input type="text" style={{ display: 'none' }} name="xnQsjsdp" value="3a956f1dea651c85ad7f49ee9a07acf816c0a953039726dbce0359bfefc352f8" />
            <input type="hidden" name="zc_gad" id="zc_gad" value="" />
            <input type="text" style={{ display: 'none' }} name="xmIwtLD" value="797981c3150ff77053d2b9a9ca70c0e2de92609a977a940c3cd9636f2789cf417e754a284df75edef491a2d1e735a54a" />
            <input type="text" style={{ display: 'none' }} name="actionType" value="TGVhZHM=" />
            <input type="text" style={{ display: 'none' }} name="returnURL" value="null" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold text-navy mb-2 uppercase">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="First Name"
                  maxLength={40}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-navy focus:outline-none transition-colors bg-gray-50"
                  style={{ textTransform: 'capitalize' }}
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-bold text-navy mb-2 uppercase">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="Last Name"
                  maxLength={80}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-navy focus:outline-none transition-colors bg-gray-50"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-navy mb-2 uppercase">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="Email"
                  maxLength={100}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors bg-gray-50 ${
                    emailValidation.type === 'valid' ? 'border-green-500' : 
                    emailValidation.type === 'invalid' ? 'border-red-500' : 
                    'border-gray-200 focus:border-navy'
                  }`}
                  onBlur={(e) => validateEmail(e.target.value)}
                  onChange={(e) => {
                    const timeout = setTimeout(() => validateEmail(e.target.value), 1000)
                    return () => clearTimeout(timeout)
                  }}
                />
                {emailValidation.type !== 'hide' && (
                  <div className={`flex items-center gap-2 mt-2 text-sm ${
                    emailValidation.type === 'valid' ? 'text-green-600' : 
                    emailValidation.type === 'invalid' ? 'text-red-600' : 
                    'text-yellow-600'
                  }`}>
                    {emailValidation.type === 'checking' && <span className="animate-spin">⏳</span>}
                    {emailValidation.type === 'valid' && <span>✓</span>}
                    {emailValidation.type === 'invalid' && <span>✗</span>}
                    <span>{emailValidation.message}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">We verify your email address exists to ensure we can reach you.</p>
              </div>
              
              <div>
                <label htmlFor="mobile" className="block text-sm font-bold text-navy mb-2 uppercase">
                  Mobile (Optional)
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="Mobile"
                  maxLength={10}
                  placeholder="0412345678"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors bg-gray-50 ${
                    mobileValidation.type === 'invalid' ? 'border-red-500' : 'border-gray-200 focus:border-navy'
                  }`}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 10)
                    validateMobile(e.target.value)
                  }}
                />
                {mobileValidation.type === 'invalid' && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                    <span>✗</span>
                    <span>{mobileValidation.message}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Australian mobile numbers must be exactly 10 digits.</p>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-navy mb-3 uppercase">
                Type of Enquiry <span className="text-red-600">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <label className="flex items-center cursor-pointer p-3 sm:p-0">
                  <input
                    type="radio"
                    name="enquiry_type"
                    value="General"
                    checked={enquiryType === 'general'}
                    onChange={() => setEnquiryType('general')}
                    className="w-5 h-5 text-navy flex-shrink-0"
                  />
                  <span className="ml-3 text-gray-700 text-base">General Enquiry</span>
                </label>
                <label className="flex items-center cursor-pointer p-3 sm:p-0">
                  <input
                    type="radio"
                    name="enquiry_type"
                    value="Security Clearance"
                    checked={enquiryType === 'security'}
                    onChange={() => setEnquiryType('security')}
                    className="w-5 h-5 text-navy flex-shrink-0"
                  />
                  <span className="ml-3 text-gray-700 text-base">Security Clearance Enquiry</span>
                </label>
              </div>
            </div>
            
            {enquiryType === 'security' && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-navy mb-3 uppercase">
                  Clearance Type <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
                  <label className="flex items-center cursor-pointer p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-navy hover:bg-white transition-colors">
                    <input
                      type="radio"
                      name="LEADCF5"
                      value="Baseline Security Clearance"
                      required={enquiryType === 'security'}
                      className="w-5 h-5 text-navy flex-shrink-0"
                    />
                    <span className="ml-3 text-gray-700 text-base leading-tight">Baseline Security Clearance</span>
                  </label>
                  <label className="flex items-center cursor-pointer p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-navy hover:bg-white transition-colors">
                    <input
                      type="radio"
                      name="LEADCF5"
                      value="NV1 Security Clearance"
                      required={enquiryType === 'security'}
                      className="w-5 h-5 text-navy flex-shrink-0"
                    />
                    <span className="ml-3 text-gray-700 text-base leading-tight">NV1 Security Clearance</span>
                  </label>
                  <label className="flex items-center cursor-pointer p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-navy hover:bg-white transition-colors">
                    <input
                      type="radio"
                      name="LEADCF5"
                      value="NV2 Security Clearance"
                      required={enquiryType === 'security'}
                      className="w-5 h-5 text-navy flex-shrink-0"
                    />
                    <span className="ml-3 text-gray-700 text-base leading-tight">NV2 Security Clearance</span>
                  </label>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="state" className="block text-sm font-bold text-navy mb-2 uppercase">
                  State/Territory
                </label>
                <select
                  id="state"
                  name="State"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-navy focus:outline-none transition-colors bg-gray-50"
                >
                  <option value="">-- Select --</option>
                  <option value="Australian Capital Territory">Australian Capital Territory</option>
                  <option value="New South Wales">New South Wales</option>
                  <option value="Northern Territory">Northern Territory</option>
                  <option value="Queensland">Queensland</option>
                  <option value="South Australia">South Australia</option>
                  <option value="Tasmania">Tasmania</option>
                  <option value="Victoria">Victoria</option>
                  <option value="Western Australia">Western Australia</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="leadSource" className="block text-sm font-bold text-navy mb-2 uppercase">
                  Referral Source
                </label>
                <select
                  id="leadSource"
                  name="Lead Source"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-navy focus:outline-none transition-colors bg-gray-50"
                >
                  <option value="-None-">-None-</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Web Research">Web Research</option>
                  <option value="Friend Referral">Friend Referral</option>
                  <option value="External Referral">External Referral</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-bold text-navy mb-2 uppercase">
                Message
              </label>
              <textarea
                id="message"
                name="Description"
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-navy focus:outline-none transition-colors bg-gray-50 resize-vertical"
                placeholder="Tell us about your security clearance requirements..."
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t-2 border-gray-100">
              <button
                type="submit"
                disabled={!isSubmitEnabled}
                className="bg-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="reset"
                onClick={() => {
                  setEmailValidation({ type: 'hide', message: '' })
                  setMobileValidation({ type: 'hide', message: '' })
                  setEnquiryType('general')
                }}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>
            
            {isSubmitting && (
              <div className="mt-6 bg-gray-200 rounded-lg overflow-hidden h-10 relative">
                <div
                  className="bg-navy h-full transition-all duration-100 flex items-center justify-center text-white font-bold text-sm"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" style={{ backdropFilter: 'blur(5px)' }}>
          <div className="bg-white rounded-[15px] max-w-md w-full overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.7)]">
            <div className="bg-navy text-white p-6 relative">
              <h2 className="text-2xl font-bold text-center m-0">Message Sent Successfully!</h2>
              <button
                onClick={() => setShowThankYou(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200 text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 hover:rotate-90 transition-all bg-white/10"
              >
                &times;
              </button>
            </div>
            <div className="p-8 text-center">
              <div 
                className="w-20 h-20 bg-gradient-to-br from-[#002147] to-[#003366] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_8px_25px_rgba(0,33,71,0.3)]"
                style={{
                  animation: 'checkBounce 0.6s ease'
                }}
              >
                <span className="text-4xl text-white">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">{thankYouMessage.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{thankYouMessage.message}</p>
              <button
                onClick={() => setShowThankYou(false)}
                className="bg-gradient-to-br from-[#002147] to-[#003366] text-white px-8 py-3 rounded-lg font-bold hover:from-[#003366] hover:to-[#3b82f6] hover:-translate-y-0.5 transition-all shadow-[0_4px_15px_rgba(0,33,71,0.3)] hover:shadow-[0_6px_20px_rgba(0,33,71,0.4)] uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes checkBounce {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
      
      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-hidden">
            <div className="bg-navy text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">📅 Book Your Consultation</h2>
              <button
                onClick={() => setShowBooking(false)}
                className="text-white hover:text-gray-200 text-4xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10 transition-all"
              >
                &times;
              </button>
            </div>
            <iframe
              src="https://portal.ausclear.au/schedule-a-call.html"
              className="w-full h-[calc(100%-80px)] border-none"
            />
          </div>
        </div>
      )}
      
      {/* Global click handler for booking card */}
      <script dangerouslySetInnerHTML={{ __html: `
        if (typeof window !== 'undefined') {
          window.addEventListener('message', function(event) {
            if (event.data === 'closeBookingModal') {
              const modal = document.getElementById('bookingModal');
              if (modal) modal.style.display = 'none';
            }
          });
        }
      ` }} />
    </>
  )
}


