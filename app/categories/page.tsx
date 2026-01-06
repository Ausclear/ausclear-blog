import { supabase } from '@/lib/supabase'
import { CATEGORIES, Category } from '@/types'
import CategoryCard from '@/components/CategoryCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all knowledge base categories to find information about Australian security clearances.',
}

export const revalidate = 3600

async function getCategoriesWithCounts() {
  const categoriesWithCounts: Category[] = []

  for (const category of CATEGORIES) {
    try {
      const { count } = await supabase
        .from('kb_documents')
        .select('*', { count: 'exact', head: true })
        .eq('category', category.slug)
        .eq('published', true)

      categoriesWithCounts.push({
        ...category,
        articleCount: count || 0,
      })
    } catch (error) {
      // If Supabase is not configured, just add the category with count 0
      categoriesWithCounts.push({
        ...category,
        articleCount: 0,
      })
    }
  }

  return categoriesWithCounts
}

export default async function CategoriesPage() {
  const categories = await getCategoriesWithCounts()

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Knowledge Base Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of articles organised by topic.
            Find everything you need to know about Australian security clearances.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-navy mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-600 mb-6">
            Use our search feature or contact our team for personalised assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/search"
              className="bg-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colours inline-block"
            >
              Search Articles
            </a>
            <a
              href="/contact"
              className="bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colours inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
