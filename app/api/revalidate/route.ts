import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

// Manual revalidation API - call this after updating articles in Supabase
// Usage: POST to /api/revalidate with { path: '/articles/some-slug' } or { revalidateAll: true }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, slug, revalidateAll, secret } = body

    // Optional: Add secret key protection
    // if (secret !== process.env.REVALIDATE_SECRET) {
    //   return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    // }

    if (revalidateAll) {
      // Revalidate all main pages
      revalidatePath('/', 'layout')
      revalidatePath('/articles/[slug]', 'page')
      revalidatePath('/categories/[slug]', 'page')
      revalidatePath('/search', 'page')
      
      return NextResponse.json({ 
        revalidated: true, 
        message: 'All pages revalidated',
        timestamp: new Date().toISOString()
      })
    }

    if (slug) {
      // Revalidate specific article
      revalidatePath(`/articles/${slug}`)
      return NextResponse.json({ 
        revalidated: true, 
        path: `/articles/${slug}`,
        timestamp: new Date().toISOString()
      })
    }

    if (path) {
      // Revalidate specific path
      revalidatePath(path)
      return NextResponse.json({ 
        revalidated: true, 
        path,
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json(
      { error: 'Please provide "slug", "path", or "revalidateAll: true"' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
}

// GET endpoint for easy browser testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path')
  const slug = searchParams.get('slug')
  const revalidateAll = searchParams.get('revalidateAll') === 'true'

  try {
    if (revalidateAll) {
      revalidatePath('/', 'layout')
      revalidatePath('/articles/[slug]', 'page')
      revalidatePath('/categories/[slug]', 'page')
      revalidatePath('/search', 'page')
      
      return NextResponse.json({ 
        revalidated: true, 
        message: 'All pages revalidated',
        timestamp: new Date().toISOString()
      })
    }

    if (slug) {
      revalidatePath(`/articles/${slug}`)
      return NextResponse.json({ 
        revalidated: true, 
        path: `/articles/${slug}`,
        timestamp: new Date().toISOString()
      })
    }

    if (path) {
      revalidatePath(path)
      return NextResponse.json({ 
        revalidated: true, 
        path,
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json(
      { 
        error: 'Please provide "slug", "path", or "revalidateAll=true" query parameter',
        examples: [
          '/api/revalidate?slug=guide-to-nv2-security-clearance',
          '/api/revalidate?path=/categories/application-process',
          '/api/revalidate?revalidateAll=true'
        ]
      },
      { status: 400 }
    )
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
}
