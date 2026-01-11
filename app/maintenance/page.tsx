export default function MaintenancePage() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #002147 0%, #003d7a 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '60px 40px',
        maxWidth: '600px'
      }}>
        {/* Logo/Icon */}
        <div style={{
          fontSize: '80px',
          marginBottom: '30px'
        }}>
          🔧
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          color: '#FFD700',
          marginBottom: '20px',
          lineHeight: 1.2
        }}>
          Clearance First Support
        </h1>

        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: 'white',
          marginBottom: '30px'
        }}>
          Currently Down for Maintenance
        </h2>

        {/* Message */}
        <p style={{
          fontSize: '18px',
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 1.6,
          marginBottom: '40px'
        }}>
          We're performing scheduled maintenance to improve your experience.
          We'll be back shortly.
        </p>

        {/* Additional Info */}
        <div style={{
          padding: '20px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '10px'
          }}>
            Need immediate assistance?
          </p>
          <a 
            href="mailto:support@ausclear.com.au"
            style={{
              color: '#FFD700',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            support@ausclear.com.au
          </a>
        </div>

        {/* Status Updates */}
        <p style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.6)',
          marginTop: '40px'
        }}>
          Follow us for updates: <a href="https://www.ausclear.com.au" style={{ color: '#FFD700', textDecoration: 'none' }}>www.ausclear.com.au</a>
        </p>
      </div>
    </div>
  )
}
