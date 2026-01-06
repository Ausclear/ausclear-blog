import { supabase } from '@/lib/supabase'
import { CATEGORIES, Article } from '@/types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 3600

type Props = {
  params: { slug: string }
}

async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('kb_documents')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) {
    return null
  }

  // TODO: Increment view count once Supabase types are properly configured
  // This requires update permissions on the kb_documents table

  return data as Article
}

type RelatedArticle = Pick<Article, 'id' | 'title' | 'slug' | 'excerpt' | 'category'>

async function getRelatedArticles(categorySlug: string, currentArticleId: string): Promise<RelatedArticle[]> {
  const { data } = await supabase
    .from('kb_documents')
    .select('id, title, slug, excerpt, category')
    .eq('category', categorySlug)
    .eq('published', true)
    .neq('id', currentArticleId)
    .limit(3)

  return (data as RelatedArticle[]) || []
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
        <div className="max-w-4xl mx-auto">
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

          {/* Article Header */}
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
                {article.view_count > 0 && (
                  <span className="text-sm text-gray-500">
                    {article.view_count} {article.view_count === 1 ? 'view' : 'views'}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {article.excerpt}
                </p>
              )}

              {/* Author */}
              {article.author && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
                  <span className="font-medium">By {article.author}</span>
                </div>
              )}

              {/* Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-navy prose-a:text-gold hover:prose-a:text-navy prose-strong:text-navy"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

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
      </div>
    </div>
  )
}
