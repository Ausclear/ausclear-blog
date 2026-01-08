'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function AnthonyAIWidget() {
  useEffect(() => {
    // Load the widget HTML
    const loadWidget = async () => {
      try {
        const response = await fetch('/anthony-widget.html')
        const html = await response.text()
        
        // Extract styles
        const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/)
        if (styleMatch) {
          const style = document.createElement('style')
          style.textContent = styleMatch[1]
          document.head.appendChild(style)
        }
        
        // Extract body HTML and append launcher + window
        const bodyMatch = html.match(/<body>([\s\S]*?)<script/i)
        if (bodyMatch) {
          const div = document.createElement('div')
          div.innerHTML = bodyMatch[1]
          
          const launcher = div.querySelector('.ac-launcher')
          const window_el = div.querySelector('.ac-window')
          
          if (launcher) document.body.appendChild(launcher)
          if (window_el) document.body.appendChild(window_el)
        }
        
        // Extract and execute main script
        const scriptMatches = html.match(/<script>([\s\S]*?)<\/script>/g)
        if (scriptMatches) {
          // Get the last script (main widget script)
          const mainScriptMatch = scriptMatches[scriptMatches.length - 1].match(/<script>([\s\S]*?)<\/script>/)
          if (mainScriptMatch) {
            // Execute script in global context
            const scriptFunc = new Function(mainScriptMatch[1])
            scriptFunc()
          }
        }
      } catch (error) {
        console.error('Failed to load widget:', error)
      }
    }

    // Wait for Supabase to load first
    const checkAndLoad = setInterval(() => {
      if (window.supabase) {
        clearInterval(checkAndLoad)
        loadWidget()
      }
    }, 100)

    // Cleanup
    return () => {
      clearInterval(checkAndLoad)
      const launcher = document.getElementById('launcher')
      const window_el = document.getElementById('window')
      if (launcher) launcher.remove()
      if (window_el) window_el.remove()
    }
  }, [])

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
        strategy="beforeInteractive"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
    </>
  )
}
