export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      background: 'var(--navy)',
      color: 'var(--white)',
      textAlign: 'center',
      padding: '2rem',
      marginTop: '4rem'
    }}>
      <p style={{ opacity: 0.8 }}>
        &copy; {currentYear} AusClear. All rights reserved. | {' '}
        <a href="#" style={{ color: 'var(--gold)' }}>Privacy Policy</a> | {' '}
        <a href="#" style={{ color: 'var(--gold)' }}>Terms of Service</a>
      </p>
    </footer>
  )
}
