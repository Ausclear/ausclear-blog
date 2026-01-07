import { supabase } from '@/lib/supabase'
import { CATEGORIES, Article } from '@/types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 3600

type Props = {
  params: { slug: string }
}

// Sanitise content by removing meta tags, scripts, comments, and CSS that appear as TEXT
function sanitiseContent(content: string): string {
  if (!content) return ''
  
  let cleaned = content
  
  // Remove HTML comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '')
  
  // Remove script tags and their content  
  cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, '')
  
  // Remove meta tags
  cleaned = cleaned.replace(/<meta[\s\S]*?>/gi, '')
  
  // Remove the CSS garbage that appears as plain text (NOT in <style> tags)
  // This pattern matches: "* { margin: 0; ... } body { font-family: ... }" etc
  cleaned = cleaned.replace(/\*\s*\{[\s\S]*?\}\s*body\s*\{[\s\S]*?\}/i, '')
  
  // Trim whitespace
  cleaned = cleaned.trim()
  
  // IMPORTANT: We DO NOT remove <style> tags - they contain article formatting
  return cleaned
}

async function getArticle(slug: string): Promise<Article | null> {
  // Try to find by slug first
  let { data, error } = await supabase
    .from('kb_documents')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .eq('archived', false)
    .single()

  // If not found by slug, try by ID
  if (error || !data) {
    const { data: dataById, error: errorById } = await supabase
      .from('kb_documents')
      .select('*')
      .eq('id', slug)
      .eq('is_active', true)
      .eq('archived', false)
      .single()
    
    if (errorById || !dataById) {
      return null
    }
    data = dataById
  }

  if (!data) {
    return null
  }

  const rawData: any = data

  // Sanitise the content
  const cleanContent = sanitiseContent(rawData.content || '')

  const article: Article = {
    ...rawData,
    content: cleanContent,
    excerpt: cleanContent ? cleanContent.substring(0, 200).replace(/<[^>]*>/g, '').trim() + '...' : '',
    slug: rawData.slug || rawData.id,
    view_count: 0,
    author: null,
    meta_title: rawData.meta_title || null,
    meta_description: rawData.meta_description || null
  }

  return article
}

type RelatedArticle = Pick<Article, 'id' | 'title' | 'slug' | 'excerpt' | 'category'>

async function getRelatedArticles(categorySlug: string, currentArticleId: string): Promise<RelatedArticle[]> {
  const { data } = await supabase
    .from('kb_documents')
    .select('id, title, slug, content, category')
    .eq('category', categorySlug)
    .eq('is_active', true)
    .eq('archived', false)
    .neq('id', currentArticleId)
    .limit(3)

  if (!data) return []

  return data.map((article: any) => {
    const cleanContent = sanitiseContent(article.content || '')
    return {
      id: article.id,
      title: article.title,
      slug: article.slug || article.id,
      excerpt: cleanContent ? cleanContent.substring(0, 150).replace(/<[^>]*>/g, '').trim() + '...' : '',
      category: article.category
    }
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.excerpt,
    keywords: article.tags || [],
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt,
      type: 'article',
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      authors: article.author ? [article.author] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  const category = CATEGORIES.find((cat) => cat.slug === article.category)
  const relatedArticles = await getRelatedArticles(article.category, article.id)

  const formattedDate = new Date(article.created_at).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8">
            <ol className="flex items-center space-x-2 text-gray-600 flex-wrap">
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
              {category && (
                <>
                  <li>/</li>
                  <li>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="hover:text-gold transition-colours"
                    >
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-navy font-medium truncate">{article.title}</li>
            </ol>
          </nav>

          {/* Article */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 md:p-12 border-t-4 border-gold">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {category && (
                  <Link
                    href={`/categories/${category.slug}`}
                    className="inline-flex items-center gap-2 text-sm bg-navy text-white px-4 py-2 rounded-full hover:bg-blue-900 transition-colours"
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                )}
                <span className="text-sm text-gray-500">{formattedDate}</span>
              </div>

              {/* Content - renders with native Zoho TOC */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-navy prose-a:text-gold hover:prose-a:text-navy prose-strong:text-navy"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Feedback Buttons */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-4">Was this article helpful?</p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colours">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span className="text-sm font-medium">Yes</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colours">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                    <span className="text-sm font-medium">No</span>
                  </button>
                </div>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-navy mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/articles/${related.slug}`}
                    className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-gold group"
                  >
                    <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colours">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{related.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-navy to-blue-900 text-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-gray-200 mb-6">
              Our team is here to assist you with your security clearance journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/request-introduction"
                className="bg-navy text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all inline-block"
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
      </div>
    </div>
  )
}
