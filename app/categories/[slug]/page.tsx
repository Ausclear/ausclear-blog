import { supabase } from '@/lib/supabase'
import { CATEGORIES, Article } from '@/types'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600

type Props = {
  params: { slug: string }
}

// Sanitise content by ONLY removing garbage that appears as plain text
function sanitiseContent(content: string): string {
  if (!content) return ''
  
  let cleaned = content
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '')
  cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, '')
  cleaned = cleaned.replace(/<meta[\s\S]*?>/gi, '')
  cleaned = cleaned.replace(/\*\s*\{[\s\S]*?\}\s*body\s*\{[\s\S]*?\}/i, '')
  cleaned = cleaned.trim()
  
  return cleaned
}

// Remove the TOC that's embedded in the article HTML
function removeEmbeddedTOC(content: string): string {
  if (!content) return ''
  
  let cleaned = content
  cleaned = cleaned.replace(/<div[^>]*class="[^"]*table-of-contents[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
  cleaned = cleaned.replace(/<(?:div|section)[^>]*>[\s\S]*?(?:on this page|table of contents)[\s\S]*?<\/(?:div|section)>/gi, '')
  cleaned = cleaned.replace(/<nav[^>]*>[\s\S]*?(?:on this page|table of contents)[\s\S]*?<\/nav>/gi, '')
  
  return cleaned
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = CATEGORIES.find((cat) => cat.slug === params.slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: category.name,
    description: category.description,
  }
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }))
}

async function getCategoryArticles(categorySlug: string): Promise<Article[]> {
  // Find the category name from the slug
  const category = CATEGORIES.find((cat) => cat.slug === categorySlug)
  if (!category) return []
  
  const { data, error } = await supabase
    .from('kb_documents')
    .select('*')
    .eq('category', category.name) // Filter by category NAME, not slug
    .eq('is_active', true)
    .eq('archived', false)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }

  // Map to add excerpt and ensure slug exists
  return (data || []).map((article: any) => {
    let cleanContent = sanitiseContent(article.content || '')
    cleanContent = removeEmbeddedTOC(cleanContent)
    
    // Extract excerpt from first paragraph
    let excerpt = ''
    const paragraphMatch = cleanContent.match(/<p[^>]*>(.*?)<\/p>/i)
    if (paragraphMatch) {
      excerpt = paragraphMatch[1].replace(/<[^>]*>/g, '').trim().substring(0, 150) + '...'
    }
    
    return {
      ...article,
      content: cleanContent,
      excerpt: excerpt || cleanContent.substring(0, 150).replace(/<[^>]*>/g, '').trim() + '...',
      slug: article.slug || article.id
    }
  }) as Article[]
}

export default async function CategoryPage({ params }: Props) {
  const category = CATEGORIES.find((cat) => cat.slug === params.slug)

  if (!category) {
    notFound()
  }

  const articles = await getCategoryArticles(params.slug)

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-gold transition-colours">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/categories" className="hover:text-gold transition-colours">
                Categories
              </Link>
            </li>
            <li>/</li>
            <li className="text-navy font-medium">{category.name}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-t-4 border-gold">
          <div className="flex items-start gap-4">
            <div className="text-5xl">{category.icon}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">
                {category.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {category.description}
              </p>
              <p className="text-sm text-gray-500 mt-3">
                {articles.length} {articles.length === 1 ? 'article' : 'articles'} in this category
              </p>
            </div>
          </div>
        </div>

        {/* Articles List */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              No articles in this category yet.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              We're working on adding more content. Check back soon!
            </p>
            <Link
              href="/categories"
              className="inline-block bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colours"
            >
              Browse Other Categories
            </Link>
          </div>
        )}

        {/* Back to Categories */}
        <div className="mt-12 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center text-gold hover:text-navy transition-colours font-medium"
          >
            ← Back to All Categories
          </Link>
        </div>
      </div>
    </div>
  )
}
