'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Article } from '@/types'

interface RelatedArticlesProps {
  articles: Article[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  if (articles.length === 0) return null

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-navy">Related Articles</h2>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded transition-colors ${view === 'grid' ? 'bg-gold text-navy' : 'text-gray-600 hover:text-navy'}`}
            title="Grid view"
            aria-label="Grid view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded transition-colors ${view === 'list' ? 'bg-gold text-navy' : 'text-gray-600 hover:text-navy'}`}
            title="List view"
            aria-label="List view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((related) => (
            <Link
              key={related.id}
              href={`/articles/${related.slug}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-gold group"
            >
              <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors">
                {related.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">{related.excerpt}</p>
            </Link>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
          {articles.map((related) => (
            <Link
              key={related.id}
              href={`/articles/${related.slug}`}
              className="block p-6 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-gold rounded-full"></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{related.excerpt}</p>
                </div>
                <svg className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
