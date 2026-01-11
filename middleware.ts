import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip maintenance check for static files and API routes only
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return NextResponse.next()
  }

  try {
    // Check maintenance mode from Supabase
    const { data, error } = await supabase
      .from('maintenance_mode')
      .select('is_enabled')
      .eq('id', 1)
      .single()

    const isMaintenanceEnabled = !error && data?.is_enabled === true

    // If on maintenance page but maintenance is DISABLED, redirect to home
    if (pathname === '/maintenance' && !isMaintenanceEnabled) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // If NOT on maintenance page but maintenance is ENABLED, redirect to maintenance
    if (pathname !== '/maintenance' && isMaintenanceEnabled) {
      return NextResponse.redirect(new URL('/maintenance', request.url))
    }
  } catch (err) {
    console.error('🔧 Maintenance check error:', err)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
