import { supabase } from '@/lib/supabase'
import { CATEGORIES, Article } from '@/types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import FeedbackButtons from '@/components/FeedbackButtons'

export const revalidate = 300 // Revalidate every 5 minutes

// Force rebuild - articleId prop is now optional in FeedbackButtons

type Props = {
  params: { slug: string }
}

// ONLY remove meta tags, scripts, HTML comments that show as text
// DO NOT remove style tags or any actual content
function sanitiseContent(content: string): string {
  if (!content) return ''
  
  let cleaned = content
  
  // Remove HTML comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '')
  
  // Remove script tags
  cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, '')
  
  // Remove meta tags
  cleaned = cleaned.replace(/<meta[\s\S]*?>/gi, '')
  
  // Trim whitespace
  cleaned = cleaned.trim()
  
  return cleaned
}

// Remove embedded TOC elements - CONSERVATIVE: only remove by specific class/element names
function removeEmbeddedSections(content: string): string {
  if (!content) return ''
  
  let cleaned = content
  
  // Remove ONLY specific structural TOC elements by class name
  // Do NOT remove based on heading content - that deletes actual articles!
  
  // Remove sidebar div that contains TOC (but NOT article content)
  cleaned = cleaned.replace(/<div\s+class="sidebar"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '')
  
  // Remove aside elements (Zoho uses <aside class="sidebar">)
  cleaned = cleaned.replace(/<aside\s+class="sidebar"[^>]*>[\s\S]*?<\/aside>/gi, '')
  
  // Remove standalone toc wrapper divs
  cleaned = cleaned.replace(/<div\s+class="toc-wrapper"[^>]*>[\s\S]*?<\/div>/gi, '')
  cleaned = cleaned.replace(/<div\s+class="toc"[^>]*>[\s\S]*?<\/div>/gi, '')
  
  // Remove toc-links divs (the horizontal link spam)
  cleaned = cleaned.replace(/<div\s+class="toc-links"[^>]*>[\s\S]*?<\/div>/gi, '')
  
  // Remove nav elements that are TOCs
  cleaned = cleaned.replace(/<nav\s+class="toc[^"]*"[^>]*>[\s\S]*?<\/nav>/gi, '')
  
  // Remove any smooth scroll scripts
  cleaned = cleaned.replace(/<script>[\s\S]*?smooth[\s\S]*?<\/script>/gi, '')
  
  // Remove layout wrapper divs (but carefully - don't remove article content divs)
  cleaned = cleaned.replace(/<div\s+class="container">\s*<div\s+class="layout">/gi, '<div class="article-content">')
  
  // Remove empty divs
  cleaned = cleaned.replace(/<div>\s*<\/div>/gi, '')
  
  return cleaned
}

// Extract H2 headings only for sidebar TOC
function extractTOCHeadings(htmlContent: string): Array<{ id: string; text: string }> {
  const headings: Array<{ id: string; text: string }> = []
  const headingRegex = /<h2(?:\s+id=["']([^"']+)["'])?[^>]*>(.*?)<\/h2>/gi
  let match
  
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const existingId = match[1]
    const textWithHtml = match[2]
    let text = textWithHtml.replace(/<[^>]*>/g, '').trim()
    
    // Decode HTML entities (&amp; -> &, etc.)
    text = text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
    
    const id = existingId || text.toLowerCase().replace(/[^\w]+/g, '-')
    
    headings.push({ id, text })
  }
  
  return headings
}

async function getArticle(slug: string): Promise<Article | null> {
  let { data, error } = await supabase
    .from('kb_documents')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .eq('archived', false)
    .single()

  if (error || !data) {
    const { data: dataById, error: errorById } = await supabase
      .from('kb_documents')
      .select('*')
      .eq('id', slug)
      .eq('is_active', true)
      .eq('archived', false)
      .single()
    
    if (errorById || !dataById) return null
    data = dataById
  }

  if (!data) return null

  const rawData: any = data

  // Sanitise content - ONLY remove meta/scripts/comments, NOTHING ELSE
  let cleanContent = sanitiseContent(rawData.content || '')
  
  // Remove embedded sidebar TOC (keeps article content intact)
  cleanContent = removeEmbeddedSections(cleanContent)
  
  // Add IDs to h2 headings for TOC anchors
  cleanContent = cleanContent.replace(/<h2(?![^>]*\sid=)([^>]*)>(.*?)<\/h2>/gi, (match, attrs, text) => {
    const id = text.replace(/<[^>]*>/g, '').trim().toLowerCase().replace(/[^\w]+/g, '-')
    return `<h2${attrs} id="${id}">${text}</h2>`
  })

  // Generate excerpt from first paragraph
  let excerpt = ''
  const paragraphMatch = cleanContent.match(/<p[^>]*>(.*?)<\/p>/i)
  if (paragraphMatch) {
    excerpt = paragraphMatch[1].replace(/<[^>]*>/g, '').trim().substring(0, 200) + '...'
  }

  const article: Article = {
    ...rawData,
    content: cleanContent,
    excerpt: excerpt || cleanContent.substring(0, 200).replace(/<[^>]*>/g, '').trim() + '...',
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
    const paragraphMatch = cleanContent.match(/<p[^>]*>(.*?)<\/p>/i)
    const excerpt = paragraphMatch 
      ? paragraphMatch[1].replace(/<[^>]*>/g, '').trim().substring(0, 150) + '...'
      : cleanContent.substring(0, 150).replace(/<[^>]*>/g, '').trim() + '...'
    
    return {
      id: article.id,
      title: article.title,
      slug: article.slug || article.id,
      excerpt,
      category: article.category
    }
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug)

  if (!article) {
    return { title: 'Article Not Found' }
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
  
  // Map Zoho category names to our category slugs
  const CATEGORY_MAPPING: Record<string, string> = {
    'Clearance Process': 'application-process',
    'Security Clearance': 'security-clearances',
    'AGSVA Fees': 'agsva-fees',
    'FAQs': 'faqs',
    'Policy and Regulations': 'policy-regulations',
    'Cyber Security': 'cyber-security',
    'Career Opportunities': 'careers-opportunities',
    'AusClear Insights': 'ausclear-insights',
    'Trends & Predictions': 'trends-predictions',
    'Summary Articles': 'summary-articles',
    'Application Process': 'application-process',
    'Security Awareness': 'security-awareness',
    'Disclaimer': 'disclaimer',
    'AusClear': 'ausclear'
  }
  
  // Try to find mapped category
  let categoryDisplay = category
  
  if (!categoryDisplay && article.category) {
    // Try mapping first
    const mappedSlug = CATEGORY_MAPPING[article.category]
    if (mappedSlug) {
      categoryDisplay = CATEGORIES.find((cat) => cat.slug === mappedSlug)
    }
  }
  
  // Final fallback: format the raw category value
  const finalCategoryDisplay = categoryDisplay ? {
    name: categoryDisplay.name,
    slug: categoryDisplay.slug,
    icon: categoryDisplay.icon
  } : {
    name: article.category?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Uncategorized',
    slug: article.category || 'uncategorized',
    icon: '📄'
  }
  const relatedArticles = await getRelatedArticles(article.category, article.id)

  const formattedDate = new Date(article.created_at).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  
  // Extract TOC (H2 headings only)
  const tocHeadings = extractTOCHeadings(article.content)

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="px-4 md:px-6 lg:px-8">
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
              <li>/</li>
              <li>
                <Link
                  href={`/categories/${finalCategoryDisplay.slug}`}
                  className="hover:text-gold transition-colours"
                >
                  {finalCategoryDisplay.name}
                </Link>
              </li>
              <li>/</li>
              <li className="text-navy font-medium truncate">{article.title}</li>
            </ol>
          </nav>

          {/* Two-column layout - full width on mobile, sidebar on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
            {/* Article Column */}
            <div className="min-w-0">{/* min-w-0 prevents grid blowout */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 md:p-8 lg:p-12 border-t-4 border-gold">
                  {/* Mobile TOC - Collapsible */}
                  {tocHeadings.length > 0 && (
                    <details className="lg:hidden mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <summary className="font-bold text-navy cursor-pointer flex items-center justify-between">
                        <span>📑 Table of Contents</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <nav className="mt-4 space-y-2 pl-2">
                        {tocHeadings.map((heading) => (
                          <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            className="block text-sm hover:text-gold transition-colours leading-relaxed font-medium text-gray-800 no-underline py-1"
                            style={{ textDecoration: 'none' }}
                          >
                            {heading.text}
                          </a>
                        ))}
                      </nav>
                    </details>
                  )}
                  
                  {/* Meta Information - Date only */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="text-sm text-gray-500">{formattedDate}</span>
                  </div>

                  {/* Article Content */}
                  <div
                    className="prose prose-lg max-w-none prose-headings:text-navy prose-a:text-gold hover:prose-a:text-navy prose-strong:text-navy"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  {/* Feedback Buttons */}
                  <FeedbackButtons articleId={article.id} />

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
            </div>

            {/* Sticky TOC Sidebar - H2 only, NO underlines */}
            {tocHeadings.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gold">
                    <h3 className="text-sm font-bold text-navy mb-4 uppercase tracking-wide">On This Page</h3>
                    <nav className="space-y-2">
                      {tocHeadings.map((heading) => (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          className="block text-sm hover:text-gold transition-colours leading-relaxed font-medium text-gray-800 no-underline"
                          style={{ textDecoration: 'none' }}
                        >
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>
            )}
          </div>

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
          <div className="mt-12 bg-navy text-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Personalised Assistance?</h2>
            <p className="text-gray-200 mb-6">
              Our team is ready to help you navigate your security clearance journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/request-introduction"
                className="bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all inline-block"
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
// Force Vercel sync: Wed Jan  7 02:46:58 UTC 2026
