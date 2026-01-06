'use client'

import { useState } from 'react'
import Link from 'next/link'

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
      await new Promise(resolve => setTimeout(resolve, 1000))

      setMessage({
        type: 'success',
        text: 'Login successful! Redirecting to your dashboard...'
      })

      setFormData({ name: '', email: '', clientNumber: '' })
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Login failed. Please check your credentials and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      minHeight: 'calc(100vh - 200px)',
      padding: '3rem 1.5rem'
    }}>
      <div className="container-custom" style={{ maxWidth: '520px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, var(--navy) 0%, #003a70 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 4px 20px rgba(0, 33, 71, 0.3)'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h1 style={{
            color: 'var(--navy)',
            fontSize: '2.25rem',
            marginBottom: '0.75rem',
            fontWeight: 700,
            lineHeight: 1.2
          }}>
            Client Portal Login
          </h1>
          <p style={{
            color: 'var(--text-grey)',
            fontSize: '1rem',
            lineHeight: 1.6
          }}>
            Secure access to your AusClear account
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0, 33, 71, 0.1)'
        }}>
          {message && (
            <div style={{
              padding: '1rem 1.25rem',
              borderRadius: '8px',
              marginBottom: '1.75rem',
              background: message.type === 'success' ? '#d4edda' : '#f8d7da',
              color: message.type === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
              fontSize: '0.95rem',
              fontWeight: 500
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
                  marginBottom: '0.625rem',
                  color: 'var(--navy)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.3px'
                }}
              >
                FULL NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '0.875rem 1.125rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s',
                  background: '#fafafa'
                }}
                className="form-input"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '0.625rem',
                  color: 'var(--navy)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.3px'
                }}
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                style={{
                  width: '100%',
                  padding: '0.875rem 1.125rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s',
                  background: '#fafafa'
                }}
                className="form-input"
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label
                htmlFor="clientNumber"
                style={{
                  display: 'block',
                  marginBottom: '0.625rem',
                  color: 'var(--navy)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.3px'
                }}
              >
                CLIENT NUMBER
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
                  padding: '0.875rem 1.125rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s',
                  background: '#fafafa',
                  letterSpacing: '1px'
                }}
                className="form-input"
              />
              <p style={{
                fontSize: '0.8rem',
                color: '#6c757d',
                marginTop: '0.625rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                Format: XXX-#####-XX (e.g., Ind-12345-MS)
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-block btn-large"
              style={{
                background: isSubmitting ? '#ccc' : 'linear-gradient(135deg, var(--navy) 0%, #003a70 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: isSubmitting ? 'none' : '0 4px 15px rgba(0, 33, 71, 0.3)',
                padding: '1.125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {isSubmitting ? 'LOGGING IN...' : 'LOGIN TO PORTAL'}
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '2px solid #f0f0f0',
            textAlign: 'center'
          }}>
            <p style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              Don't have a client number?
            </p>
            <Link
              href="/request-introduction"
              style={{
                color: 'var(--gold)',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
            >
              Request an introduction
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Support Section */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          padding: '1.75rem',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid rgba(0, 33, 71, 0.1)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}>
          <p style={{
            color: '#6c757d',
            fontSize: '0.9rem',
            marginBottom: '0.875rem',
            fontWeight: 500
          }}>
            Having trouble logging in?
          </p>
          <Link
            href="/contact"
            className="btn btn-secondary"
            style={{
              background: 'var(--gold)',
              color: 'var(--navy)',
              textDecoration: 'none',
              display: 'inline-block',
              minWidth: '200px',
              padding: '0.875rem 2rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              boxShadow: '0 2px 10px rgba(184, 134, 11, 0.25)',
              transition: 'all 0.3s'
            }}
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
