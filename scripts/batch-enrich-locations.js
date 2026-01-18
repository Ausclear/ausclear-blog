// batch-enrich-locations.js
// Run this with: node batch-enrich-locations.js
// Calls enrich-ip Edge Function for all visitors with missing location data

const SUPABASE_URL = 'https://qraxdkzmteogkbfatvir.supabase.co';
const SERVICE_ROLE_KEY = 'YOUR_SERVICE_ROLE_KEY_HERE'; // Get from Supabase Dashboard → Settings → API

async function batchEnrich() {
  console.log('Fetching visitors with missing location data...');
  
  // Get all visitors with missing location
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/active_visitors?select=visitor_id,ip_address,location_city,location_state,location_country&or=(location_city.is.null,location_city.eq.Unknown)&ip_address=not.is.null&limit=1000`,
    {
      headers: {
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
      }
    }
  );
  
  const visitors = await response.json();
  console.log(`Found ${visitors.length} visitors needing enrichment`);
  
  // Filter out private IPs
  const validVisitors = visitors.filter(v => {
    const ip = v.ip_address;
    return ip && 
           !ip.startsWith('192.168.') && 
           !ip.startsWith('10.') && 
           !ip.startsWith('172.') && 
           ip !== '127.0.0.1';
  });
  
  console.log(`${validVisitors.length} have valid public IPs`);
  
  let successCount = 0;
  let failCount = 0;
  
  // Process in batches to avoid rate limits
  for (let i = 0; i < validVisitors.length; i++) {
    const visitor = validVisitors[i];
    
    try {
      console.log(`[${i + 1}/${validVisitors.length}] Enriching ${visitor.visitor_id} (${visitor.ip_address})...`);
      
      const enrichResponse = await fetch(
        `${SUPABASE_URL}/functions/v1/enrich-ip`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
          },
          body: JSON.stringify({
            ip: visitor.ip_address,
            visitor_id: visitor.visitor_id
          })
        }
      );
      
      if (enrichResponse.ok) {
        const result = await enrichResponse.json();
        console.log(`  ✓ Success: ${result.location_city}, ${result.location_state}, ${result.location_country}`);
        successCount++;
      } else {
        const error = await enrichResponse.text();
        console.log(`  ✗ Failed: ${error}`);
        failCount++;
      }
      
      // Rate limit: 1 request per 100ms (IPinfo free tier = 50k/month = ~1600/day = 1 per second)
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
      failCount++;
    }
  }
  
  console.log('\n=== BATCH ENRICHMENT COMPLETE ===');
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Total: ${validVisitors.length}`);
}

batchEnrich().catch(console.error);
