import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer style={{
        background: 'var(--header-navy)',
        color: 'var(--white)',
        marginTop: '4rem',
        borderTop: '4px solid var(--gold)'
      }}>
        <div className="container-custom" style={{ padding: '3rem 2rem 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                Clearance First Support
              </h3>
              <p style={{
                color: '#9CA3AF',
                lineHeight: 1.6,
                fontSize: '0.95rem'
              }}>
                Your comprehensive resource for Australian security clearance information. Professional guidance every step of the way.
              </p>
            </div>
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Home
                  </Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/categories" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Browse Categories
                  </Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/search" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Search Articles
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                Get Help
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/contact" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Contact Us
                  </Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/request-introduction" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Request Introduction
                  </Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="mailto:support@ausclear.com.au" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.95rem' }}>
                    support@ausclear.com.au
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <p style={{
              color: '#9CA3AF',
              fontSize: '0.9rem',
              margin: 0
            }}>
              <strong style={{ color: 'var(--gold)' }}>Clearance First</strong> is Powered by AusClear &middot; &copy; {currentYear} AusClear. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="/privacy" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Privacy Policy
              </a>
              <a href="/terms" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.9rem' }}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      <script dangerouslySetInnerHTML={{ __html: `
(function() {
  'use strict';
  
  const SUPABASE_URL = 'https://qraxdkzmteogkbfatvir.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyYXhka3ptdGVvZ2tiZmF0dmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1OTk5MjEsImV4cCI6MjA3OTE3NTkyMX0.WqCGjBEiLgmqbaGmc8Z87CeqY-l_DBR3Gj9VQ4sujks';
  
  // HEARTBEAT INTERVAL - 5 seconds
  const HEARTBEAT_INTERVAL = 5000;
  
  // IDLE TIMEOUT - stop heartbeats after 5 MINUTES of no interaction (reading counts as idle)
  const IDLE_TIMEOUT = 300000;
  
  // Track last REAL user interaction
  let lastInteraction = Date.now();
  
  // Track SCROLL DEPTH (max percentage scrolled)
  let maxScrollDepth = 0;
  
  function updateScrollDepth() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        sessionStorage.setItem('max_scroll_depth', maxScrollDepth.toString());
      }
    }
  }
  
  // Load previous scroll depth from session
  maxScrollDepth = parseInt(sessionStorage.getItem('max_scroll_depth') || '0');
  
  ['mousemove', 'click', 'keypress', 'touchstart'].forEach(eventType => {
    document.addEventListener(eventType, () => {
      lastInteraction = Date.now();
    }, { passive: true });
  });
  
  // Separate scroll listener that updates both interaction AND scroll depth
  window.addEventListener('scroll', () => {
    lastInteraction = Date.now();
    updateScrollDepth();
  }, { passive: true });
  
  // Also update scroll depth on page load in case already scrolled
  setTimeout(updateScrollDepth, 1000);
  
  // FIX LOCALSTORAGE VIA URL PARAMETER
  // Add ?fix_visitor=true to any page to restore returning visitor status
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('fix_visitor') === 'true') {
    localStorage.setItem('ausclear_has_visited', 'true');
    localStorage.setItem('ausclear_visit_count', '5');
    alert('Fixed! You are now a returning visitor. Refresh the page.');
    return;
  }
  
  // DEBUG MODE - add ?debug=true to URL to see scores
  const debugMode = urlParams.get('debug') === 'true';
  
  let heartbeatTimer = null;
  
  function getVisitorId() {
    let id = localStorage.getItem('ausclear_visitor_id');
    if (!id) {
      id = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('ausclear_visitor_id', id);
    }
    return id;
  }
  
  function getSessionId() {
    let id = sessionStorage.getItem('ausclear_session_id');
    if (!id) {
      id = 'session_' + Date.now();
      sessionStorage.setItem('ausclear_session_id', id);
      sessionStorage.setItem('session_start', new Date().toISOString());
    }
    return id;
  }
  
  // Track INITIAL returning status (set once, doesn't change during session)
  let initialReturningStatus = null;
  
  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'Tablet';
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'Mobile';
    return 'Desktop';
  }
  
  function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }
  
  function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'MacOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  }
  
  function isHighIntent(path) {
    const highIntentPages = ['/contact', '/baseline', '/nv1', '/nv2'];
    return highIntentPages.some(page => path.toLowerCase().includes(page.toLowerCase()));
  }
  
  async function getLocationData() {
    let locationData = { city: 'Unknown', state: 'Unknown', country: 'Unknown' };
    let ipAddress = null;
    
    const cachedLocation = sessionStorage.getItem('location_data');
    const cachedIp = sessionStorage.getItem('ip_address');
    
    if (cachedLocation && cachedIp) {
      locationData = JSON.parse(cachedLocation);
      ipAddress = cachedIp;
    } else {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (ipResponse.ok) {
          const ipData = await ipResponse.json();
          ipAddress = ipData.ip;
          sessionStorage.setItem('ip_address', ipAddress);
        }
      } catch (e) {}
      
      try {
        const locationResponse = await fetch('https://ipapi.co/json/');
        if (locationResponse.ok) {
          const location = await locationResponse.json();
          locationData = {
            city: location.city || 'Unknown',
            state: location.region || 'Unknown',
            country: location.country_name || 'Unknown'
          };
          sessionStorage.setItem('location_data', JSON.stringify(locationData));
        }
      } catch (e) {}
    }
    
    return { locationData, ipAddress };
  }
  
  async function sendHeartbeat() {
    // Check if user is idle - no interaction for 60 seconds = don't send heartbeat
    const idleTime = Date.now() - lastInteraction;
    if (idleTime > IDLE_TIMEOUT) {
      return; // User is idle, don't send heartbeat
    }
    
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const currentPath = window.location.pathname;
    
    // Update page journey
    let pageJourney = JSON.parse(sessionStorage.getItem('page_journey') || '[]');
    if (!pageJourney.includes(window.location.href)) {
      pageJourney.push(window.location.href);
    }
    sessionStorage.setItem('page_journey', JSON.stringify(pageJourney));
    
    let pagesViewed = JSON.parse(sessionStorage.getItem('pages_viewed') || '[]');
    const pageExists = pagesViewed.find(p => p.url === window.location.href);
    if (!pageExists) {
      pagesViewed.push({ url: window.location.href, title: document.title, timestamp: new Date().toISOString() });
    }
    sessionStorage.setItem('pages_viewed', JSON.stringify(pagesViewed));
    
    // First visit date
    let firstVisitDate = localStorage.getItem('ausclear_first_visit');
    if (!firstVisitDate) {
      firstVisitDate = new Date().toISOString();
      localStorage.setItem('ausclear_first_visit', firstVisitDate);
    }
    
    // Check returning status BEFORE building data
    const hasVisitedBefore = localStorage.getItem('ausclear_has_visited') === 'true';
    const visitCount = parseInt(localStorage.getItem('ausclear_visit_count') || '0');
    
    // Store initial status on first heartbeat (for accurate debug display)
    if (initialReturningStatus === null) {
      initialReturningStatus = hasVisitedBefore;
    }
    
    const { locationData, ipAddress } = await getLocationData();
    
    // Calculate time on site from session start
    const sessionStart = sessionStorage.getItem('session_start') || new Date().toISOString();
    const timeOnSite = Math.floor((Date.now() - new Date(sessionStart).getTime()) / 1000);
    
    // Check high intent
    const currentHighIntent = isHighIntent(currentPath);
    
    // DEBUG: Show floating panel if debug mode enabled
    if (debugMode) {
      let debugPanel = document.getElementById('ausclear-debug');
      if (!debugPanel) {
        debugPanel = document.createElement('div');
        debugPanel.id = 'ausclear-debug';
        debugPanel.style.cssText = 'position:fixed;bottom:10px;right:10px;background:#000;color:#0f0;padding:15px;border-radius:8px;font-family:monospace;font-size:12px;z-index:99999;min-width:200px;';
        document.body.appendChild(debugPanel);
      }
      debugPanel.innerHTML = '<b>TRACKING DEBUG</b><br>Pages: ' + pagesViewed.length + '<br>Time: ' + timeOnSite + 's<br>Scroll: ' + maxScrollDepth + '%<br>Returning: ' + (initialReturningStatus ? 'YES' : 'NO') + '<br>High Intent: ' + (currentHighIntent ? 'YES' : 'NO') + '<br><i>Scores calculated by DB</i>';
    }
    
    // NOTE: lead_score, opportunity_score, priority_score are calculated
    // by the database trigger - we just send raw behavioural data
    const data = {
      visitor_id: visitorId,
      session_id: sessionId,
      current_page: window.location.href,
      page_title: document.title,
      is_high_intent: currentHighIntent,
      pages_viewed: pagesViewed,
      page_journey: pageJourney,
      time_on_site: timeOnSite,
      time_on_current_page: maxScrollDepth, // Using this field for scroll depth %
      session_start: sessionStart,
      last_activity: new Date().toISOString(),
      first_visit_date: firstVisitDate,
      last_visit_date: new Date().toISOString(),
      location_city: locationData.city,
      location_state: locationData.state,
      location_country: locationData.country,
      ip_address: ipAddress,
      device_type: getDeviceType(),
      browser: getBrowser(),
      os: getOS(),
      referrer: document.referrer || 'Direct',
      referrer_type: document.referrer ? 'External' : 'Direct',
      search_terms: '',
      is_new_visitor: !hasVisitedBefore,
      is_returning: hasVisitedBefore,
      previous_visit_count: visitCount,
      has_chatted: false,
      last_chat_at: null,
      is_watched: false,
      watched_by: null,
      admin_notes: '',
      priority_score: 0,
      opportunity_score: 0,
      lead_score: 0,
      exit_url: '',
      updated_at: new Date().toISOString()
    };
    
    try {
      // Check if visitor exists in active_visitors
      const checkResponse = await fetch(
        SUPABASE_URL + '/rest/v1/active_visitors?visitor_id=eq.' + visitorId + '&select=id',
        {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
          }
        }
      );
      
      const existing = await checkResponse.json();
      
      if (existing && existing.length > 0) {
        // UPDATE existing visitor (same session, just updating activity)
        
        if (!sessionStorage.getItem('visit_counted')) {
          sessionStorage.setItem('visit_counted', 'true');
        }
        
        // DON'T change is_new_visitor, is_returning, or previous_visit_count on updates
        // These are set at INSERT and should not change during session
        delete data.is_new_visitor;
        delete data.is_returning;
        delete data.previous_visit_count;
        
        await fetch(
          SUPABASE_URL + '/rest/v1/active_visitors?visitor_id=eq.' + visitorId,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify(data)
          }
        );
      } else {
        // INSERT new visitor
        data.created_at = new Date().toISOString();
        
        // Keep the is_new_visitor and is_returning values set from localStorage check above
        // They're already set correctly: is_new_visitor = !hasVisitedBefore, is_returning = hasVisitedBefore
        // previous_visit_count is already set correctly from visitCount (line 238)
        
        sessionStorage.setItem('visit_counted', 'true');
        
        await fetch(
          SUPABASE_URL + '/rest/v1/active_visitors',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify(data)
          }
        );
        
        // Mark as visited for future sessions (AFTER insert, so THIS session stays as "new")
        // Increment visit count for NEXT session
        localStorage.setItem('ausclear_has_visited', 'true');
        localStorage.setItem('ausclear_visit_count', (visitCount + 1).toString());
        
        // Trigger IP enrichment via Supabase Edge Function (once per session)
        if (!sessionStorage.getItem('ip_enriched') && ipAddress) {
          sessionStorage.setItem('ip_enriched', 'true');
          try {
            fetch(SUPABASE_URL + '/functions/v1/rapid-responder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
              },
              body: JSON.stringify({ ip: ipAddress, visitor_id: visitorId })
            });
          } catch (e) {
            // Silent fail - enrichment is optional
          }
        }
      }
    } catch (error) {
      // Silent fail
    }
  }
  
  // Start tracking
  heartbeatTimer = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
  sendHeartbeat();

})();
      ` }} />
    </>
  )
}


