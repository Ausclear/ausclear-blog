import { supabase } from '@/lib/supabase'
import ArticleCard from '@/components/ArticleCard'
import SearchBar from '@/components/SearchBar'
import { Metadata } from 'next'
import { CATEGORIES, Article } from '@/types'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search through our knowledge base articles to find the information you need.',
}

export const revalidate = 0 // Don't cache search results

type Props = {
  searchParams: { q?: string }
}

// Sanitise content by removing HTML comments and script tags
function sanitiseContent(content: string): string {
  if (!content) return ''
  
  let cleaned = content
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '')
  cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, '')
  cleaned = cleaned.replace(/<meta[\s\S]*?>/gi, '')
  cleaned = cleaned.trim()
  
  return cleaned
}

async function searchArticles(query: string): Promise<Article[]> {
  if (!query || query.trim().length < 2) {
    return []
  }

  const searchTerm = `%${query}%`

  const { data, error } = await supabase
    .from('kb_documents')
    .select('*')
    .eq('is_active', true)
    .eq('archived', false)
    .or(`title.ilike.${searchTerm},content.ilike.${searchTerm}`)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error searching articles:', error)
    return []
  }

  // Map to add excerpt and ensure slug exists
  return (data || []).map((article: any) => {
    const cleanContent = sanitiseContent(article.content || '')
    return {
      ...article,
      content: cleanContent,
      excerpt: cleanContent ? cleanContent.substring(0, 150).replace(/<[^>]*>/g, '') + '...' : '',
      slug: article.slug || article.id
    }
  }) as Article[]
}

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q || ''
  const results = query.trim() ? await searchArticles(query) : []

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Search Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6 text-center">
            Search Knowledge Base
          </h1>
          <SearchBar initialQuery={query} />
          {query && (
            <p className="text-gray-600 mt-4 text-center">
              {results.length > 0
                ? `Found ${results.length} ${results.length === 1 ? 'result' : 'results'} for "${query}"`
                : `No results found for "${query}"`}
            </p>
          )}
        </div>

        {/* Search Results */}
        {query.trim() ? (
          results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center max-w-2xl mx-auto">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-navy mb-4">No Results Found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any articles matching your search. Try different keywords or browse by category.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/categories"
                  className="bg-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colours inline-block"
                >
                  Browse Categories
                </a>
                <a
                  href="/contact"
                  className="bg-navy text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all inline-block"
                >
                  Contact Us
                </a>
              </div>
            </div>
          )
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Popular Categories */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-navy mb-6">Popular Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {CATEGORIES.map((category) => (
                  <a
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colours group"
                  >
                    <span className="text-3xl mb-2">{category.icon}</span>
                    <span className="text-sm text-center text-gray-700 group-hover:text-navy transition-colours">
                      {category.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Search Tips */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy mb-3">Search Tips</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Use specific keywords related to your query</li>
                <li>• Try different variations or synonyms</li>
                <li>• Browse categories if you're not sure what to search for</li>
                <li>• Contact us if you can't find what you're looking for</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
