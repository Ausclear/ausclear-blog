'use client'

interface FlipCardProps {
  frontEmoji: string
  frontTitle: string
  frontDescription: string
  backEmoji: string
  backTitle: string
  backDetail: string
  href?: string
  onClick?: () => void
}

export default function FlipCard({ 
  frontEmoji, 
  frontTitle, 
  frontDescription,
  backEmoji,
  backTitle,
  backDetail,
  href,
  onClick 
}: FlipCardProps) {
  const baseStyles = {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '32px 24px',
    textAlign: 'center' as const,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden',
    perspective: '1000px',
    minHeight: '240px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const innerContent = (
    <>
      <div 
        className="contact-card-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          minHeight: '180px',
        }}
      >
        {/* Front */}
        <div 
          className="contact-card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotateY(0deg)',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>{frontEmoji}</div>
          <h3 style={{ 
            fontSize: '24px', 
            fontWeight: 700, 
            color: '#002147',
            marginBottom: '16px' 
          }}>
            {frontTitle}
          </h3>
          <p style={{ 
            color: '#475569', 
            marginBottom: 0,
            lineHeight: 1.7 
          }} dangerouslySetInnerHTML={{ __html: frontDescription }} />
        </div>

        {/* Back */}
        <div 
          className="contact-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotateY(180deg)',
            padding: '24px',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>{backEmoji}</div>
          <div style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#002147',
            marginBottom: '12px',
            lineHeight: 1.4
          }}>
            {backTitle}
          </div>
          <div style={{
            fontSize: '16px',
            color: '#475569',
            fontWeight: 600
          }}>
            {backDetail}
          </div>
        </div>
      </div>
    </>
  )

  if (href) {
    return (
      <>
        <a
          href={href}
          className="contact-card"
          style={baseStyles}
        >
          {innerContent}
        </a>
        <style jsx>{`
          .contact-card:hover :global(.contact-card-inner) {
            transform: rotateY(180deg);
          }
          .contact-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #dc2626, #f1c40f);
            transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .contact-card:hover::before {
            left: 0;
          }
          .contact-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0,33,71,0.15);
            border-color: #002147;
            background: white;
          }
        `}</style>
      </>
    )
  }

  return (
    <>
      <div
        className="contact-card"
        style={baseStyles}
        onClick={onClick}
      >
        {innerContent}
      </div>
      <style jsx>{`
        .contact-card:hover :global(.contact-card-inner) {
          transform: rotateY(180deg);
        }
        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #dc2626, #f1c40f);
          transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .contact-card:hover::before {
          left: 0;
        }
        .contact-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0,33,71,0.15);
          border-color: #002147;
          background: white;
        }
      `}</style>
    </>
  )
}
