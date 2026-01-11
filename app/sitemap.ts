import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  // Fetch all published KB articles
  const { data: articles, error } = await supabase
    .from('kb_documents')
    .select('slug, updated_at')
    .order('updated_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching articles for sitemap:', error)
  }
  
  const baseUrl = 'https://blogs.ausclear.au'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/request-introduction`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]
  
  // Article pages
  const articlePages = articles?.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []
  
  return [...staticPages, ...articlePages]
}
