export interface Article {
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  author: string | null
  published: boolean
  view_count: number
  meta_title: string | null
  meta_description: string | null
  tags: string[] | null
}

export interface Category {
  name: string
  slug: string
  description: string
  icon: string
  articleCount?: number
}

export const CATEGORIES: Category[] = [
  { name: 'AusClear Insights', slug: 'ausclear-insights', description: 'Expert insights and industry updates', icon: '📘' },
  { name: 'Security Clearances', slug: 'security-clearances', description: 'Comprehensive clearance information', icon: '🔒' },
  { name: 'AusClear', slug: 'ausclear', description: 'About our services and approach', icon: '🏢' },
  { name: 'AGSVA Fees', slug: 'agsva-fees', description: 'Costs and pricing information', icon: '💰' },
  { name: 'FAQs', slug: 'faqs', description: 'Frequently asked questions', icon: '❓' },
  { name: 'Summary Articles', slug: 'summary-articles', description: 'Quick reference summaries', icon: '📄' },
  { name: 'Application Process', slug: 'application-process', description: 'Step-by-step application guides', icon: '📝' },
  { name: 'Cyber Security', slug: 'cyber-security', description: 'Security awareness and best practices', icon: '🛡️' },
  { name: 'Policy and Regulations', slug: 'policy-regulations', description: 'Government policies and compliance', icon: '⚖️' },
  { name: 'Trends & Predictions', slug: 'trends-predictions', description: 'Industry trends and future outlook', icon: '📈' },
  { name: 'Careers & Opportunities', slug: 'careers-opportunities', description: 'Career opportunities for cleared personnel', icon: '💼' },
  { name: 'Security Awareness', slug: 'security-awareness', description: 'Security culture and awareness', icon: '👁️' },
  { name: 'Disclaimer', slug: 'disclaimer', description: 'Important legal information', icon: '⚠️' },
]
