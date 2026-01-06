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
  { name: 'Getting Started', slug: 'getting-started', description: 'Learn the basics of security clearances', icon: '🚀' },
  { name: 'Clearance Types', slug: 'clearance-types', description: 'Understand different clearance levels', icon: '🔐' },
  { name: 'Application Process', slug: 'application-process', description: 'Step-by-step application guidance', icon: '📋' },
  { name: 'Documentation', slug: 'documentation', description: 'Required documents and forms', icon: '📄' },
  { name: 'Eligibility', slug: 'eligibility', description: 'Check if you qualify', icon: '✅' },
  { name: 'Timelines', slug: 'timelines', description: 'Processing times and expectations', icon: '⏱️' },
  { name: 'Security Assessments', slug: 'security-assessments', description: 'What to expect during assessment', icon: '🔍' },
  { name: 'Maintenance & Renewal', slug: 'maintenance-renewal', description: 'Keeping your clearance active', icon: '🔄' },
  { name: 'Common Issues', slug: 'common-issues', description: 'Troubleshooting and solutions', icon: '⚠️' },
  { name: 'Corporate Sponsors', slug: 'corporate-sponsors', description: 'Information for employers', icon: '🏢' },
  { name: 'International Applicants', slug: 'international-applicants', description: 'Guidance for non-citizens', icon: '🌏' },
  { name: 'Career Guidance', slug: 'career-guidance', description: 'Leveraging your clearance', icon: '💼' },
  { name: 'FAQ', slug: 'faq', description: 'Frequently asked questions', icon: '❓' },
]
