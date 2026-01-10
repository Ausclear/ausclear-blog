'use client'

import { useEffect } from 'react'

interface ViewTrackerProps {
  articleId: string
}

export default function ViewTracker({ articleId }: ViewTrackerProps) {
  useEffect(() => {
    // Track view after component mounts
    const trackView = async () => {
      try {
        await fetch('/api/track-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ articleId }),
        })
      } catch (error) {
        console.error('Failed to track view:', error)
      }
    }

    trackView()
  }, [articleId])

  return null // This component doesn't render anything
}
