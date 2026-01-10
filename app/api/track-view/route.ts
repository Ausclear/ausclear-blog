import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { articleId } = await request.json()

    if (!articleId) {
      return NextResponse.json({ error: 'Article ID required' }, { status: 400 })
    }

    // Increment view count directly with UPDATE
    const { error } = await supabase
      .from('kb_documents')
      .update({ 
        view_count: supabase.raw('COALESCE(view_count, 0) + 1'),
        updated_at: new Date().toISOString()
      })
      .eq('id', articleId)

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
