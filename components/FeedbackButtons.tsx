'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface FeedbackButtonsProps {
  initialHelpfulCount?: number
  initialNotHelpfulCount?: number
}

export default function FeedbackButtons({ 
  initialHelpfulCount = 0, 
  initialNotHelpfulCount = 0 
}: FeedbackButtonsProps = {}) {
  const pathname = usePathname()
  const articleId = pathname?.split('/').pop() || 'unknown'
  
  const [helpfulCount, setHelpfulCount] = useState(initialHelpfulCount)
  const [notHelpfulCount, setNotHelpfulCount] = useState(initialNotHelpfulCount)
  const [userVoted, setUserVoted] = useState<'yes' | 'no' | null>(null)

  const handleFeedback = async (type: 'yes' | 'no') => {
    if (userVoted) return
    
    setUserVoted(type)
    
    if (type === 'yes') {
      setHelpfulCount(prev => prev + 1)
    } else {
      setNotHelpfulCount(prev => prev + 1)
    }

    // TODO: Send to API when feedback table is created in Supabase
    console.log(`Feedback: ${type} for article ${articleId}`)
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <p className="text-sm font-semibold text-gray-700 mb-4">
        Was this article helpful?
        {userVoted && <span className="text-green-600 ml-2">✓ Thanks for your feedback!</span>}
      </p>
      <div className="flex gap-4">
        <button 
          onClick={() => handleFeedback('yes')}
          disabled={userVoted !== null}
          title={`${helpfulCount} people found this helpful`}
          className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg transition-colors ${
            userVoted === 'yes' 
              ? 'bg-green-100 border-green-600 cursor-default' 
              : userVoted 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-green-50 hover:border-green-600 cursor-pointer'
          }`}
        >
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span className="text-sm font-medium">Yes ({helpfulCount})</span>
        </button>
        <button 
          onClick={() => handleFeedback('no')}
          disabled={userVoted !== null}
          title={`${notHelpfulCount} people did not find this helpful`}
          className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg transition-colors ${
            userVoted === 'no' 
              ? 'bg-red-100 border-red-600 cursor-default' 
              : userVoted 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-red-50 hover:border-red-600 cursor-pointer'
          }`}
        >
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
          </svg>
          <span className="text-sm font-medium">No ({notHelpfulCount})</span>
        </button>
      </div>
    </div>
  )
}
