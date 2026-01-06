'use client'

import { useEffect } from 'react'

export default function AnthonyAIWidget() {
  useEffect(() => {
    // Check if the widget ID is configured
    const widgetId = process.env.NEXT_PUBLIC_ANTHONY_AI_WIDGET_ID

    if (!widgetId || widgetId === 'your_widget_id_here') {
      console.warn('Anthony AI Widget ID not configured. Please set NEXT_PUBLIC_ANTHONY_AI_WIDGET_ID in your .env.local file.')
      return
    }

    // Load the Anthony AI chat widget script
    // This is a placeholder - replace with actual Anthony AI widget script
    const script = document.createElement('script')
    script.src = `https://anthony-ai.example.com/widget.js` // Replace with actual widget URL
    script.async = true
    script.dataset.widgetId = widgetId

    // Widget configuration
    script.onload = () => {
      // Initialize the widget with custom configuration
      if (typeof window !== 'undefined' && (window as any).AnthonyAI) {
        (window as any).AnthonyAI.init({
          widgetId: widgetId,
          theme: {
            primaryColor: '#002147', // Navy
            accentColor: '#B8860B', // Gold
          },
          position: 'bottom-right',
          welcomeMessage: 'Hi! I\'m Anthony, your AusClear assistant. How can I help you today?',
        })
      }
    }

    document.body.appendChild(script)

    // Cleanup
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // This component doesn't render anything visible
  // The widget is injected via the script
  return null
}
