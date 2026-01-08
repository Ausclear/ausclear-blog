'use client'

import SearchBar from './SearchBar'

interface SearchSectionProps {
  initialQuery: string
  resultCount: number
}

export default function SearchSection({ initialQuery, resultCount }: SearchSectionProps) {
  return (
    <div className="max-w-3xl mx-auto mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6 text-center">
        Search Knowledge Base
      </h1>
      <SearchBar initialQuery={initialQuery} />
      {initialQuery && (
        <p className="text-gray-600 mt-4 text-center">
          {resultCount > 0
            ? `Found ${resultCount} ${resultCount === 1 ? 'result' : 'results'} for "${initialQuery}"`
            : `No results found for "${initialQuery}"`}
        </p>
      )}
    </div>
  )
}
