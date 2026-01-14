'use client'

import { useState } from 'react'

export default function RequestIntroModal() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      {/* Trigger - hidden, controlled by global click handler */}
      <button 
        id="request-intro-trigger" 
        onClick={openModal}
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: '#666',
                cursor: 'pointer',
                padding: '5px 10px',
              }}
            >
              ×
            </button>

            {/* Content */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: '#002147',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <span style={{ fontSize: '40px' }}>🚀</span>
              </div>

              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#002147',
                  marginBottom: '15px',
                }}
              >
                Coming Soon
              </h2>

              <p
                style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '25px',
                }}
              >
                We're working on an exciting new way to request introductions to our sponsorship partners. This feature will be available shortly.
              </p>

              <p
                style={{
                  fontSize: '14px',
                  color: '#999',
                  marginBottom: '30px',
                }}
              >
                In the meantime, please contact us directly for assistance.
              </p>

              <button
                onClick={closeModal}
                style={{
                  background: '#002147',
                  color: 'white',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#003a70')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#002147')}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
