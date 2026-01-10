import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: NextRequest) {
  try {
    const { articleId } = await request.json()

    if (!articleId) {
      return NextResponse.json({ error: 'Article ID required' }, { status: 400 })
    }

    // Use service role client to bypass RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Use RPC with proper typing
    const { error } = await supabase.rpc('increment_article_views', { 
      article_id: articleId 
    } as any)

    if (error) {
      console.error('Error incrementing view count:', error)
      return NextResponse.json({ error: 'Failed to track view' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in track-view API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
