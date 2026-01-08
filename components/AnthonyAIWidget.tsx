'use client'

import { useEffect } from 'react'

export default function AnthonyAIWidget() {
  useEffect(() => {
    // Load the widget HTML via iframe
    const loadWidget = async () => {
      try {
        const response = await fetch('/anthony-widget.html')
        const html = await response.text()
        
        // Create container for widget
        const container = document.createElement('div')
        container.id = 'anthony-widget-container'
        container.innerHTML = html
        
        // Extract and append styles
        const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/)
        if (styleMatch) {
          const style = document.createElement('style')
          style.textContent = styleMatch[1]
          document.head.appendChild(style)
        }
        
        // Extract and append body content (launcher + window)
        const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/)
        if (bodyMatch) {
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = bodyMatch[1]
          
          // Find launcher and window
          const launcher = tempDiv.querySelector('.ac-launcher')
          const window_el = tempDiv.querySelector('.ac-window')
          
          if (launcher) document.body.appendChild(launcher.cloneNode(true))
          if (window_el) document.body.appendChild(window_el.cloneNode(true))
          
          // Extract and execute scripts
          const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/)
          if (scriptMatch) {
            const script = document.createElement('script')
            script.textContent = scriptMatch[1]
            document.body.appendChild(script)
          }
        }
      } catch (error) {
        console.error('Failed to load Anthony AI widget:', error)
      }
    }

    loadWidget()

    // Cleanup on unmount
    return () => {
      const launcher = document.getElementById('launcher')
      const window_el = document.getElementById('window')
      if (launcher) launcher.remove()
      if (window_el) window_el.remove()
    }
  }, [])

  return null
}
