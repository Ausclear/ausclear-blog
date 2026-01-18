import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const IPINFO_TOKEN = Deno.env.get('IPINFO_TOKEN')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

// Comprehensive Australian ISP list
const ISP_PATTERNS = [
  // Big 3
  { pattern: 'telstra', name: 'Telstra' },
  { pattern: 'optus', name: 'Optus' },
  { pattern: 'vodafone', name: 'Vodafone' },
  // TPG Group
  { pattern: 'tpg', name: 'TPG' },
  { pattern: 'iinet', name: 'iiNet' },
  { pattern: 'internode', name: 'Internode' },
  { pattern: 'aapt', name: 'AAPT' },
  // Vocus Group
  { pattern: 'vocus', name: 'Vocus' },
  { pattern: 'dodo', name: 'Dodo' },
  { pattern: 'commander', name: 'Commander' },
  { pattern: 'engin', name: 'Engin' },
  { pattern: 'ipstar', name: 'Ipstar' },
  // Major NBN Providers
  { pattern: 'aussie broadband', name: 'Aussie Broadband' },
  { pattern: 'superloop', name: 'Superloop' },
  { pattern: 'belong', name: 'Belong' },
  { pattern: 'tangerine', name: 'Tangerine' },
  { pattern: 'exetel', name: 'Exetel' },
  { pattern: 'southern phone', name: 'Southern Phone' },
  { pattern: 'spintel', name: 'SpinTel' },
  { pattern: 'flip', name: 'Flip' },
  { pattern: 'mate commun', name: 'Mate' },
  { pattern: 'leaptel', name: 'Leaptel' },
  { pattern: 'activ8me', name: 'Activ8me' },
  { pattern: 'activ8', name: 'Activ8me' },
  { pattern: 'skymesh', name: 'Skymesh' },
  { pattern: 'harbour isp', name: 'Harbour ISP' },
  { pattern: 'myrepublic', name: 'MyRepublic' },
  { pattern: 'more telecom', name: 'More Telecom' },
  { pattern: 'foxtel', name: 'Foxtel' },
  { pattern: 'kogan', name: 'Kogan' },
  { pattern: 'origin', name: 'Origin' },
  { pattern: 'bendigo telco', name: 'Bendigo Telco' },
  { pattern: 'westnet', name: 'Westnet' },
  { pattern: 'amaysim', name: 'Amaysim' },
  { pattern: 'boost', name: 'Boost' },
  { pattern: 'circles.life', name: 'Circles.Life' },
  { pattern: 'felix', name: 'Felix' },
  { pattern: 'moose', name: 'Moose Mobile' },
  { pattern: 'numobile', name: 'Numobile' },
  { pattern: 'woolworths', name: 'Woolworths Mobile' },
  { pattern: 'aldi mobile', name: 'ALDI Mobile' },
  { pattern: 'coles mobile', name: 'Coles Mobile' },
  // Regional/Rural
  { pattern: 'uniti', name: 'Uniti' },
  { pattern: 'opticomm', name: 'OptiComm' },
  { pattern: 'lightning broadband', name: 'Lightning Broadband' },
  { pattern: 'occom', name: 'OCCOM' },
  { pattern: 'pentanet', name: 'Pentanet' },
  { pattern: 'node1', name: 'Node1' },
  { pattern: 'swoop', name: 'Swoop' },
  { pattern: 'clear networks', name: 'Clear Networks' },
  { pattern: 'telecube', name: 'Telecube' },
  { pattern: 'over the wire', name: 'Over The Wire' },
  { pattern: 'spirit telecom', name: 'Spirit Telecom' },
  { pattern: 'launtel', name: 'Launtel' },
  // Business/Wholesale
  { pattern: 'aapt', name: 'AAPT' },
  { pattern: 'macquarie telecom', name: 'Macquarie Telecom' },
  { pattern: 'pivotel', name: 'Pivotel' },
  { pattern: 'symbio', name: 'Symbio' },
  { pattern: 'nextgen', name: 'Nextgen' },
  // International carriers seen in AU
  { pattern: 'm247', name: 'M247' },
  { pattern: 'cloudflare', name: 'Cloudflare' },
  { pattern: 'akamai', name: 'Akamai' },
  { pattern: 'nbn co', name: 'NBN Co' },
  // Mobile carriers
  { pattern: 'lycamobile', name: 'Lycamobile' },
  { pattern: 'lebara', name: 'Lebara' },
  { pattern: 'gomo', name: 'GOMO' },
  // Satellite
  { pattern: 'starlink', name: 'Starlink' },
  { pattern: 'nbn satellite', name: 'NBN Satellite' },
  { pattern: 'skymuster', name: 'SkyMuster' },
  // Legacy/Other
  { pattern: 'primus', name: 'Primus' },
  { pattern: 'eftel', name: 'Eftel' },
  { pattern: 'adam internet', name: 'Adam Internet' },
  { pattern: 'netspace', name: 'Netspace' },
  { pattern: 'chariot', name: 'Chariot' },
  { pattern: 'people telecom', name: 'People Telecom' },
  { pattern: 'gotalk', name: 'GoTalk' },
  { pattern: 'clubtelco', name: 'ClubTelco' },
  { pattern: 'yomojo', name: 'Yomojo' },
  { pattern: 'telechoice', name: 'TeleChoice' },
  { pattern: 'think mobile', name: 'Think Mobile' },
  { pattern: 'catch connect', name: 'Catch Connect' },
  { pattern: 'southern cross', name: 'Southern Cross' },
  // Data centres often misclassified
  { pattern: 'equinix', name: 'Equinix' },
  { pattern: 'megaport', name: 'Megaport' },
  { pattern: 'nextdc', name: 'NextDC' },
  { pattern: 'datacom', name: 'Datacom' },
  { pattern: 'microplex', name: 'Microplex' },
]

const DEFENCE_PATTERNS = [
  'bae systems', 'lockheed', 'thales', 'raytheon', 'boeing defense', 
  'northrop', 'leidos', 'rheinmetall', 'saab', 'airbus defence',
  'general dynamics', 'l3harris', 'austal', 'cae', 'cubic'
]

const GOV_PATTERNS = [
  '.gov.au', '.mil.au', 'department of defence', 'australian government',
  'ato.gov', 'centrelink', 'services australia', 'defence.gov',
  'dese.gov', 'asd.gov', 'asio', 'asis', 'afp.gov'
]

const HOSTING_PATTERNS = [
  'amazon', 'aws', 'google cloud', 'gcp', 'azure', 'microsoft cloud',
  'digitalocean', 'vultr', 'linode', 'hetzner', 'ovh', 'hostinger',
  'godaddy', 'bluehost', 'dreamhost', 'rackspace', 'alibaba cloud',
  'oracle cloud', 'ibm cloud', 'tencent cloud'
]

function classify(org: string) {
  const s = org.toLowerCase()
  for (const p of DEFENCE_PATTERNS) if (s.includes(p)) return 'defence'
  for (const p of GOV_PATTERNS) if (s.includes(p)) return 'government'
  for (const p of HOSTING_PATTERNS) if (s.includes(p)) return 'hosting'
  for (const isp of ISP_PATTERNS) if (s.includes(isp.pattern)) return 'isp'
  return 'unknown'
}

function getISP(org: string) {
  const s = org.toLowerCase()
  for (const isp of ISP_PATTERNS) if (s.includes(isp.pattern)) return isp.name
  // Fallback: extract name from ASN format "AS1234 Company Name"
  const match = org.match(/^AS\d+\s+(.+)$/)
  return match ? match[1] : null
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  }

  try {
    const bodyText = await req.text()
    console.log('Received body:', bodyText)
    
    if (!bodyText) {
      return new Response(JSON.stringify({ error: 'Empty body' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }
    
    const { ip, visitor_id } = JSON.parse(bodyText)
    console.log('Parsed:', ip, visitor_id)
    
    if (!ip || !visitor_id) {
      return new Response(JSON.stringify({ error: 'Missing ip or visitor_id' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }
    
    if (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.') || ip === '127.0.0.1') {
      return new Response(JSON.stringify({ skipped: true, reason: 'private_ip' }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }
    
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)
    
    // Check cache first
    const { data: cached } = await supabase
      .from('ip_enrichment_cache')
      .select('*')
      .eq('ip_address', ip)
      .single()
    
    let updateData: any
    
    if (cached) {
      console.log('Using cached data for:', ip)
      updateData = {
        company_name: cached.company_name,
        company_domain: cached.company_domain,
        company_type: cached.company_type,
        ip_org: cached.ip_org,
        isp_name: cached.isp_name,
        connection_type: cached.connection_type,
        is_mobile: cached.is_mobile,
        is_vpn: cached.is_vpn,
        is_hosting: cached.is_hosting,
        location_city: cached.location_city || null,
        location_state: cached.location_state || null,
        location_country: cached.location_country || null,
        ip_enriched_at: new Date().toISOString()
      }
    } else {
      // Call IPinfo
      console.log('Calling IPinfo for:', ip)
      const ipinfoRes = await fetch(`https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`)
      const ipData = await ipinfoRes.json()
      console.log('IPinfo response:', JSON.stringify(ipData))
      
      const org = ipData.org || ''
      const companyType = classify(org)
      const ispName = getISP(org)
      const isMobile = org.toLowerCase().includes('mobile') || !!ipData.carrier
      const isHosting = companyType === 'hosting'
      const connectionType = isHosting ? 'hosting' : isMobile ? 'mobile' : (companyType === 'isp' ? 'residential' : 'business')
      
      // CRITICAL FIX: Extract location data from IPinfo response
      const locationCity = ipData.city || null
      const locationState = ipData.region || null
      const locationCountry = ipData.country || null
      
      console.log('Extracted location:', { locationCity, locationState, locationCountry })
      
      updateData = {
        company_name: ipData.company?.name || ipData.asn?.name || null,
        company_domain: ipData.company?.domain || null,
        company_type: companyType,
        ip_org: org,
        isp_name: ispName,
        connection_type: connectionType,
        is_mobile: isMobile,
        is_vpn: ipData.privacy?.vpn || false,
        is_hosting: isHosting,
        location_city: locationCity,
        location_state: locationState,
        location_country: locationCountry,
        ip_enriched_at: new Date().toISOString()
      }
      
      // Save to cache
      await supabase
        .from('ip_enrichment_cache')
        .upsert({
          ip_address: ip,
          ...updateData,
          enriched_at: updateData.ip_enriched_at
        }, { onConflict: 'ip_address' })
      
      console.log('Saved to cache:', ip)
    }
    
    // Try active_visitors first
    console.log('Updating active_visitors:', visitor_id)
    const { data: activeResult, error: activeError } = await supabase
      .from('active_visitors')
      .update(updateData)
      .eq('visitor_id', visitor_id)
      .select('id')
    
    if (activeError) {
      console.error('active_visitors error:', activeError)
    }
    
    const activeUpdated = activeResult && activeResult.length > 0
    console.log('active_visitors rows updated:', activeResult?.length || 0)
    
    // If not found in active_visitors, try visitor_history
    if (!activeUpdated) {
      console.log('Not in active_visitors, trying visitor_history:', visitor_id)
      
      const { data: historyResult, error: historyError } = await supabase
        .from('visitor_history')
        .update(updateData)
        .eq('visitor_id', visitor_id)
        .is('ip_enriched_at', null)
        .select('id')
      
      if (historyError) {
        console.error('visitor_history error:', historyError)
      }
      
      console.log('visitor_history rows updated:', historyResult?.length || 0)
      
      if (historyResult && historyResult.length > 0) {
        console.log('Success - updated visitor_history!')
        return new Response(JSON.stringify({ success: true, location: 'history', ...updateData }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        })
      }
      
      // Also try by IP address in history
      console.log('Trying visitor_history by IP:', ip)
      const { data: historyByIp, error: historyByIpError } = await supabase
        .from('visitor_history')
        .update(updateData)
        .eq('ip_address', ip)
        .is('ip_enriched_at', null)
        .select('id')
      
      if (historyByIpError) {
        console.error('visitor_history by IP error:', historyByIpError)
      }
      
      console.log('visitor_history by IP rows updated:', historyByIp?.length || 0)
      
      return new Response(JSON.stringify({ 
        success: true, 
        location: historyByIp?.length ? 'history_by_ip' : 'cache_only',
        rows_updated: historyByIp?.length || 0,
        ...updateData 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      })
    }
    
    console.log('Success - updated active_visitors!')
    return new Response(JSON.stringify({ success: true, location: 'active', ...updateData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
    
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: String(err) }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
})
