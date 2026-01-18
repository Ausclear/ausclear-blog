// supabase/functions/visitor-heartbeat/index.ts
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

type Json = Record<string, unknown>

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

function jsonResponse(body: Json, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'content-type, authorization, apikey',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
  })
}

function getClientIp(req: Request): string | null {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) {
    const first = xff.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  const cf = req.headers.get('cf-connecting-ip')
  if (cf) return cf.trim()
  return null
}

function isString(v: unknown): v is string {
  return typeof v === 'string'
}

function isBool(v: unknown): v is boolean {
  return typeof v === 'boolean'
}

function isNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v)
}

function clampArray<T>(arr: T[], max: number): T[] {
  if (arr.length <= max) return arr
  return arr.slice(arr.length - max)
}

function sanitisePayload(input: any) {
  if (!input || typeof input !== 'object') throw new Error('Invalid JSON')
  if (!isString(input.visitor_id) || input.visitor_id.length < 5) throw new Error('visitor_id required')
  if (!isString(input.session_id) || input.session_id.length < 5) throw new Error('session_id required')

  const current_page = isString(input.current_page) ? input.current_page.slice(0, 2048) : ''
  const page_title = isString(input.page_title) ? input.page_title.slice(0, 512) : ''
  const referrer = isString(input.referrer) ? input.referrer.slice(0, 2048) : 'Direct'
  const referrer_type = isString(input.referrer_type) ? input.referrer_type.slice(0, 32) : 'Direct'

  const device_type = isString(input.device_type) ? input.device_type.slice(0, 32) : 'Unknown'
  const browser = isString(input.browser) ? input.browser.slice(0, 64) : 'Unknown'
  const os = isString(input.os) ? input.os.slice(0, 64) : 'Unknown'

  const session_start = isString(input.session_start) ? input.session_start : new Date().toISOString()
  const last_activity = isString(input.last_activity) ? input.last_activity : new Date().toISOString()
  const first_visit_date = isString(input.first_visit_date) ? input.first_visit_date : null
  const last_visit_date = isString(input.last_visit_date) ? input.last_visit_date : new Date().toISOString()

  const is_high_intent = isBool(input.is_high_intent) ? input.is_high_intent : false
  const is_new_visitor = isBool(input.is_new_visitor) ? input.is_new_visitor : false
  const is_returning = isBool(input.is_returning) ? input.is_returning : false

  const time_on_site = isNumber(input.time_on_site) ? Math.max(0, Math.min(60 * 60 * 24, Math.floor(input.time_on_site))) : 0
  const scroll_depth_pct = isNumber(input.scroll_depth_pct) ? Math.max(0, Math.min(100, Math.floor(input.scroll_depth_pct))) : 0

  let pages_viewed = Array.isArray(input.pages_viewed) ? input.pages_viewed : []
  let page_journey = Array.isArray(input.page_journey) ? input.page_journey : []
  pages_viewed = clampArray(pages_viewed, 50)
  page_journey = clampArray(page_journey, 50)

  const utm_source = isString(input.utm_source) ? input.utm_source.slice(0, 128) : ''
  const utm_medium = isString(input.utm_medium) ? input.utm_medium.slice(0, 128) : ''
  const utm_campaign = isString(input.utm_campaign) ? input.utm_campaign.slice(0, 128) : ''
  const utm_content = isString(input.utm_content) ? input.utm_content.slice(0, 128) : ''
  const utm_term = isString(input.utm_term) ? input.utm_term.slice(0, 128) : ''

  const previous_visit_count = isNumber(input.previous_visit_count) ? Math.max(0, Math.min(9999, Math.floor(input.previous_visit_count))) : 0

  const has_chatted = isBool(input.has_chatted) ? input.has_chatted : false
  const last_chat_at = isString(input.last_chat_at) ? input.last_chat_at : null
  const is_watched = isBool(input.is_watched) ? input.is_watched : false
  const watched_by = isString(input.watched_by) ? input.watched_by.slice(0, 128) : null
  const admin_notes = isString(input.admin_notes) ? input.admin_notes.slice(0, 4000) : ''
  const exit_url = isString(input.exit_url) ? input.exit_url.slice(0, 2048) : ''

  const location_city = isString(input.location_city) ? input.location_city.slice(0, 128) : null
  const location_state = isString(input.location_state) ? input.location_state.slice(0, 128) : null
  const location_country = isString(input.location_country) ? input.location_country.slice(0, 128) : null

  return {
    visitor_id: input.visitor_id,
    session_id: input.session_id,
    current_page,
    page_title,
    is_high_intent,
    pages_viewed,
    page_journey,
    time_on_site,
    time_on_current_page: scroll_depth_pct,
    session_start,
    last_activity,
    first_visit_date,
    last_visit_date,
    location_city,
    location_state,
    location_country,
    referrer,
    referrer_type,
    device_type,
    browser,
    os,
    is_new_visitor,
    is_returning,
    previous_visit_count,
    has_chatted,
    last_chat_at,
    is_watched,
    watched_by,
    admin_notes,
    exit_url,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    updated_at: new Date().toISOString()
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return jsonResponse({ ok: true }, 200)
  if (req.method !== 'POST') return jsonResponse({ ok: false, error: 'Method not allowed' }, 405)

  try {
    const raw = await req.json()
    const data = sanitisePayload(raw)

    const ip = getClientIp(req)

    const upsertPayload: any = { ...data }
    if (ip) upsertPayload.ip_address = ip

    const { data: existing, error: checkErr } = await supabase
      .from('active_visitors')
      .select('visitor_id')
      .eq('visitor_id', data.visitor_id)
      .limit(1)

    if (checkErr) {
      console.error('DB check failed:', checkErr)
      return jsonResponse({ ok: false, error: 'DB check failed', details: checkErr.message }, 500)
    }

    if (existing && existing.length > 0) {
      const { error: updErr } = await supabase
        .from('active_visitors')
        .update(upsertPayload)
        .eq('visitor_id', data.visitor_id)

      if (updErr) {
        console.error('Update failed:', updErr)
        return jsonResponse({ ok: false, error: 'Update failed', details: updErr.message }, 500)
      }

      return jsonResponse({ ok: true, mode: 'update' }, 200)
    } else {
      const insertPayload = { ...upsertPayload, created_at: new Date().toISOString() }

      const { error: insErr } = await supabase
        .from('active_visitors')
        .insert(insertPayload)

      if (insErr) {
        console.error('Insert failed:', insErr)
        return jsonResponse({ ok: false, error: 'Insert failed', details: insErr.message, code: insErr.code }, 500)
      }

      // CRITICAL FIX: Call enrich-ip to populate location after first insert
      if (ip && !ip.startsWith('192.168.') && !ip.startsWith('10.') && !ip.startsWith('172.') && ip !== '127.0.0.1') {
        try {
          console.log('Triggering enrich-ip for:', ip, data.visitor_id)
          fetch(`${SUPABASE_URL}/functions/v1/enrich-ip`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
            },
            body: JSON.stringify({ ip, visitor_id: data.visitor_id })
          }).catch(e => {
            console.error('enrich-ip call failed:', e)
          })
        } catch (e) {
          console.error('enrich-ip trigger error:', e)
        }
      }

      return jsonResponse({ ok: true, mode: 'insert' }, 200)
    }
  } catch (e) {
    console.error('Request error:', e)
    return jsonResponse({ ok: false, error: (e as Error).message || 'Bad request' }, 400)
  }
})
