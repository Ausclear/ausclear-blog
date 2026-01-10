import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnthonyAIWidget from '@/components/AnthonyAIWidget'

export const metadata: Metadata = {
  title: {
    default: 'AusClear Knowledge Base | Security Clearance Information',
    template: '%s | AusClear Knowledge Base'
  },
  description: 'Comprehensive knowledge base for Australian security clearances. Learn about clearance types, application processes, eligibility requirements, and more.',
  keywords: ['Australian security clearance', 'AGSVA', 'clearance application', 'security vetting', 'AusClear'],
  authors: [{ name: 'AusClear' }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://support.ausclear.au',
    siteName: 'AusClear Knowledge Base',
    title: 'AusClear Knowledge Base | Security Clearance Information',
    description: 'Comprehensive knowledge base for Australian security clearances.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AusClear Knowledge Base',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AusClear Knowledge Base',
    description: 'Comprehensive knowledge base for Australian security clearances.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU">
      <body>
        {/* Visitor Tracking Script */}
        <Script
          id="visitor-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var SUPABASE_URL = 'https://qraxdkzmteogkbfatvir.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyYXhka3ptdGVvZ2tiZmF0dmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1OTk5MjEsImV4cCI6MjA3OTE3NTkyMX0.WqCGjBEiLgmqbaGmc8Z87CeqY-l_DBR3Gj9VQ4sujks';
  
  // Log to system_logs table
  function logToSystem(level, message, details) {
    fetch(SUPABASE_URL + '/rest/v1/system_logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        level: level,
        message: message,
        details: details,
        source: 'KB_TRACKING',
        created_at: new Date().toISOString()
      })
    }).catch(function(e) {
      console.log('[TRACKING] Failed to log:', e);
    });
  }
  
  function getVisitorId() {
    var id = localStorage.getItem('ausclear_visitor_id');
    if (!id) {
      id = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('ausclear_visitor_id', id);
      logToSystem('INFO', 'New visitor ID created', { visitor_id: id });
    }
    return id;
  }
  
  function trackVisitor() {
    var visitorId = getVisitorId();
    logToSystem('INFO', 'KB tracking script started', { visitor_id: visitorId, page: window.location.pathname });
    
    fetch('https://ipapi.co/json/')
      .then(function(res) { 
        logToSystem('INFO', 'IP geolocation requested', { visitor_id: visitorId });
        return res.json(); 
      })
      .then(function(location) {
        logToSystem('INFO', 'IP geolocation received', { 
          visitor_id: visitorId,
          city: location.city,
          state: location.region,
          country: location.country_name
        });
        
        var data = {
          visitor_id: visitorId,
          session_id: 'session_' + Date.now(),
          current_page: window.location.pathname,
          page_title: document.title,
          location_city: location.city || null,
          location_state: location.region || null,
          location_country: location.country_name || null,
          location_country_code: location.country_code || null,
          device_type: /Mobile|Android|iPhone/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          browser: navigator.userAgent.split(' ').slice(-1)[0].split('/')[0],
          os: navigator.platform,
          referrer: document.referrer || null,
          is_new_visitor: !localStorage.getItem('ausclear_has_visited'),
          is_returning: !!localStorage.getItem('ausclear_has_visited'),
          updated_at: new Date().toISOString()
        };
        
        logToSystem('INFO', 'Sending visitor data to Supabase', { visitor_id: visitorId });
        
        fetch(SUPABASE_URL + '/rest/v1/active_visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(data)
        }).then(function(response) {
          if (response.ok) {
            logToSystem('SUCCESS', 'Visitor tracked successfully', { visitor_id: visitorId });
            localStorage.setItem('ausclear_has_visited', 'true');
          } else {
            logToSystem('ERROR', 'Failed to track visitor', { 
              visitor_id: visitorId,
              status: response.status,
              statusText: response.statusText
            });
          }
        }).catch(function(err) {
          logToSystem('ERROR', 'Tracking request failed', { 
            visitor_id: visitorId,
            error: err.message
          });
        });
      })
      .catch(function(err) {
        logToSystem('ERROR', 'IP geolocation failed', { 
          visitor_id: visitorId,
          error: err.message
        });
      });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackVisitor);
  } else {
    trackVisitor();
  }
})();
            `
          }}
        />
        
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <AnthonyAIWidget />
      </body>
    </html>
  )
}
