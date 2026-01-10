import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { articleId } = await request.json()

    if (!articleId) {
      return NextResponse.json({ error: 'Article ID required' }, { status: 400 })
    }

    // Increment view count
    const { error } = await supabase.rpc('increment_article_views', {
      article_id: articleId
    })

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
