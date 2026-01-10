import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { secret, paths } = await request.json()

    // Verify secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate multiple paths if provided, otherwise revalidate homepage
    const pathsToRevalidate = paths || ['/']
    
    for (const path of pathsToRevalidate) {
      revalidatePath(path)
    }

    return NextResponse.json({ 
      revalidated: true, 
      paths: pathsToRevalidate,
      now: Date.now() 
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 })
  }
}
