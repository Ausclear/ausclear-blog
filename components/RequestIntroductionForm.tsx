'use client'

import { useState, FormEvent } from 'react'

export default function RequestIntroductionForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    clearanceType: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/request-introduction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        clearanceType: '',
        message: '',
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage('Sorry, there was an error submitting your request. Please try again or contact us directly.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Request Submitted!</h3>
        <p className="text-green-700 mb-6">
          Thank you for your interest. We'll be in touch with you shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="bg-gold text-navy px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colours"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
          Company/Organisation
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>

      <div>
        <label htmlFor="clearanceType" className="block text-sm font-semibold text-gray-700 mb-2">
          Clearance Type Required <span className="text-red-500">*</span>
        </label>
        <select
          id="clearanceType"
          name="clearanceType"
          required
          value={formData.clearanceType}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        >
          <option value="">Select clearance type</option>
          <option value="baseline">Baseline Vetting</option>
          <option value="nv1">Negative Vetting Level 1 (NV1)</option>
          <option value="nv2">Negative Vetting Level 2 (NV2)</option>
          <option value="pv">Positive Vetting (PV)</option>
          <option value="not-sure">Not Sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Additional Information
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more about your requirements..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-gold text-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-colours disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
      </button>

      <p className="text-sm text-gray-600 text-center">
        By submitting this form, you agree to our Privacy Policy and Terms of Service.
      </p>
    </form>
  )
}
