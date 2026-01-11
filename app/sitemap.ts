import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  // Fetch ONLY KB articles with valid slugs
  const { data: articles, error } = await supabase
    .from('kb_documents')
    .select('slug, updated_at, category, title')
    .not('slug', 'is', null)
    .not('category', 'is', null)
    .order('updated_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching articles for sitemap:', error)
  }
  
  // PRIMARY domain (support.ausclear.au)
  const primaryDomain = 'https://support.ausclear.au'
  // LEGACY domain (blogs.ausclear.au) - will be phased out
  const legacyDomain = 'https://blogs.ausclear.au'
  
  // Static pages for PRIMARY domain
  const primaryStaticPages = [
    {
      url: primaryDomain,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${primaryDomain}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${primaryDomain}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${primaryDomain}/request-introduction`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]
  
  // Static pages for LEGACY domain
  const legacyStaticPages = [
    {
      url: legacyDomain,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${legacyDomain}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${legacyDomain}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${legacyDomain}/request-introduction`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]
  
  // Article pages - ONLY include articles with valid slugs
  const filteredArticles = articles?.filter(article => {
    return article.slug && 
           article.slug.trim() !== '' && 
           article.category &&
           article.title
  }) || []
  
  // PRIMARY domain articles
  const primaryArticlePages = filteredArticles.map((article) => ({
    url: `${primaryDomain}/article/${article.slug}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // LEGACY domain articles (lower priority)
  const legacyArticlePages = filteredArticles.map((article) => ({
    url: `${legacyDomain}/article/${article.slug}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
  
  return [...primaryStaticPages, ...primaryArticlePages, ...legacyStaticPages, ...legacyArticlePages]
}
