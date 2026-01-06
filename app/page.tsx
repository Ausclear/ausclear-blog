import { supabase } from '@/lib/supabase'
import { CATEGORIES, Article } from '@/types'
import ArticleCard from '@/components/ArticleCard'
import CategoryCard from '@/components/CategoryCard'
import Link from 'next/link'

export const revalidate = 3600 // Revalidate every hour

async function getFeaturedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('kb_documents')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }

  return (data as Article[]) || []
}

export default async function HomePage() {
  const articles = await getFeaturedArticles()
  const featuredCategories = CATEGORIES.slice(0, 6)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-blue-900 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              AusClear Knowledge Base
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Your comprehensive resource for Australian security clearance information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colours inline-block"
              >
                Search Articles
              </Link>
              <Link
                href="/categories"
                className="bg-white text-navy px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colours inline-block"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-navy">Latest Articles</h2>
            <Link
              href="/search"
              className="text-gold hover:text-navy transition-colours font-medium"
            >
              View All →
            </Link>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">
                No articles available yet. Check back soon!
              </p>
              <p className="text-sm text-gray-500">
                We're working on populating the knowledge base with valuable content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Explore by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find information organised by topic to help you navigate your security clearance journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/categories"
              className="inline-block bg-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colours"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-navy to-blue-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Personalised Assistance?</h2>
            <p className="text-xl text-gray-200 mb-8">
              Our team is here to help you with your security clearance journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/request-introduction"
                className="bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colours inline-block"
              >
                Request Introduction
              </Link>
              <Link
                href="/contact"
                className="bg-white text-navy px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colours inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
