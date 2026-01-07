'use client'

import { useState } from 'react'

export default function FeedbackButtons() {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null)

  const handleFeedback = (type: 'yes' | 'no') => {
    setFeedback(type)
    // TODO: Send to analytics/database
    console.log(`User feedback: ${type}`)
  }

  if (feedback) {
    return (
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm font-semibold text-green-600">
          ✓ Thank you for your feedback!
        </p>
      </div>
    )
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <p className="text-sm font-semibold text-gray-700 mb-4">Was this article helpful?</p>
      <div className="flex gap-4">
        <button 
          onClick={() => handleFeedback('yes')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-600 transition-colours cursor-pointer"
        >
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span className="text-sm font-medium">Yes</span>
        </button>
        <button 
          onClick={() => handleFeedback('no')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-600 transition-colours cursor-pointer"
        >
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
          </svg>
          <span className="text-sm font-medium">No</span>
        </button>
      </div>
    </div>
  )
}
