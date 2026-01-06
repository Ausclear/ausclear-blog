'use client'

import { useState } from 'react'
import { Metadata } from 'next'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clientNumber: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000))

      setMessage({
        type: 'success',
        text: 'Login successful! Redirecting...'
      })

      // Reset form
      setFormData({ name: '', email: '', clientNumber: '' })
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Login failed. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ background: 'var(--light-grey)', minHeight: 'calc(100vh - 200px)', padding: '4rem 2rem' }}>
      <div className="container-custom" style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--navy)', fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 700 }}>
            Client Login
          </h1>
          <p style={{ color: 'var(--text-grey)', fontSize: '1.1rem' }}>
            Access your AusClear client portal
          </p>
        </div>

        {/* Login Form */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '3rem 2.5rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          border: '1px solid var(--mid-grey)'
        }}>
          {message && (
            <div style={{
              padding: '1rem',
              borderRadius: '4px',
              marginBottom: '1.5rem',
              background: message.type === 'success' ? '#d4edda' : '#f8d7da',
              color: message.type === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--navy)',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Smith"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid var(--mid-grey)',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.3s'
                }}
                className="form-input"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--navy)',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john.smith@example.com"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid var(--mid-grey)',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.3s'
                }}
                className="form-input"
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label
                htmlFor="clientNumber"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--navy)',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                Client Number *
              </label>
              <input
                type="text"
                id="clientNumber"
                name="clientNumber"
                required
                value={formData.clientNumber}
                onChange={handleChange}
                placeholder="Ind-12345-MS"
                pattern="[A-Za-z]{3}-[0-9]{5}-[A-Za-z]{2}"
                title="Format: Ind-12345-MS (3 letters, 5 numbers, 2 letters)"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid var(--mid-grey)',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.3s'
                }}
                className="form-input"
              />
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-grey)',
                marginTop: '0.5rem'
              }}>
                Format: XXX-#####-XX (e.g., Ind-12345-MS)
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '1rem',
                background: isSubmitting ? 'var(--mid-grey)' : 'var(--navy)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 2px 8px rgba(0, 33, 71, 0.2)'
              }}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--mid-grey)',
            textAlign: 'center'
          }}>
            <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem' }}>
              Don't have a client number?{' '}
              <a
                href="/request-introduction"
                style={{
                  color: 'var(--gold)',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Request an introduction
              </a>
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          padding: '1.5rem',
          background: 'white',
          borderRadius: '8px',
          border: '1px solid var(--mid-grey)'
        }}>
          <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            Need help logging in?
          </p>
          <a
            href="/contact"
            style={{
              color: 'var(--navy)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1rem'
            }}
          >
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  )
}
