import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Article = {
  id: string
  title: string
  excerpt: string
  slug: string
  category: string
}

// Sanitise content - remove ALL garbage
function sanitiseContent(content: string): string {
  if (!content) return ''
  
  let cleaned = content
  
  // Remove HTML comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '')
  
  // Remove script tags  
  cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, '')
  
  // Remove style tags (but keep inline styles)
  cleaned = cleaned.replace(/<style[\s\S]*?<\/style>/gi, '')
  
  // Remove meta tags
  cleaned = cleaned.replace(/<meta[\s\S]*?>/gi, '')
  
  // Remove CSS text patterns
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '') // Remove CSS comments
  cleaned = cleaned.replace(/\.[a-z\-]+\s*\{[^}]+\}/gi, '') // Remove CSS rules
  cleaned = cleaned.replace(/\*\s*\{[\s\S]*?\}/gi, '') // Remove universal selector CSS
  
  cleaned = cleaned.trim()
  return cleaned
}

// Remove embedded TOC sidebar - SURGICAL pattern based on actual Zoho HTML structure
function removeEmbeddedSections(content: string): string {
  if (!content) return ''
  
  let cleaned = content
  
  // Remove the ENTIRE <aside class="sidebar"> section (this contains "On This Page" TOC)
  // This is the exact pattern from Zoho articles
  cleaned = cleaned.replace(/<aside\s+class="sidebar">[\s\S]*?<\/aside>/gi, '')
  
  // Remove smooth scroll script at the very end
  cleaned = cleaned.replace(/<script>[\s\S]*?<\/script>\s*$/gi, '')
  
  // Remove the layout wrapper divs that create two-column grid
  // Remove: <div class="container"> and <div class="layout">
  cleaned = cleaned.replace(/<div\s+class="container">\s*<div\s+class="layout">/gi, '')
  
  // Remove closing </div></div> at the end (for layout and container)
  cleaned = cleaned.replace(/<\/div>\s*<\/div>\s*$/gi, '')
  
  return cleaned
}

export default async function HomePage() {
  // Fetch latest articles (most recent 3)
  const { data: latestData } = await supabase
    .from('kb_documents')
    .select('id, title, content, slug, category, created_at')
    .eq('is_active', true)
    .eq('archived', false)
    .order('created_at', { ascending: false })
    .limit(3)

  // Generate excerpt from content and ensure slug exists
  const latestArticles = (latestData || []).map((article: any) => {
    let cleanContent = sanitiseContent(article.content || '')
    cleanContent = removeEmbeddedSections(cleanContent || '')
    
    // Extract excerpt from first paragraph
    let excerpt = ''
    const paragraphMatch = cleanContent.match(/<p[^>]*>(.*?)<\/p>/i)
    if (paragraphMatch) {
      excerpt = paragraphMatch[1].replace(/<[^>]*>/g, '').trim().substring(0, 150) + '...'
    }
    
    return {
      id: article.id,
      title: article.title,
      excerpt: excerpt || cleanContent.substring(0, 150).replace(/<[^>]*>/g, '').trim() + '...',
      slug: article.slug || article.id,
      category: article.category
    }
  })

  // Fetch most popular articles (most recent 6, since we don't have view_count)
  const { data: popularData } = await supabase
    .from('kb_documents')
    .select('id, title, content, slug, category, created_at')
    .eq('is_active', true)
    .eq('archived', false)
    .order('created_at', { ascending: false })
    .range(3, 5) // Get articles 4-6 to avoid duplicates with latest

  const popularArticles = (popularData || []).map((article: any) => {
    let cleanContent = sanitiseContent(article.content || '')
    cleanContent = removeEmbeddedSections(cleanContent || '')
    
    // Extract excerpt from first paragraph
    let excerpt = ''
    const paragraphMatch = cleanContent.match(/<p[^>]*>(.*?)<\/p>/i)
    if (paragraphMatch) {
      excerpt = paragraphMatch[1].replace(/<[^>]*>/g, '').trim().substring(0, 150) + '...'
    }
    
    return {
      id: article.id,
      title: article.title,
      excerpt: excerpt || cleanContent.substring(0, 150).replace(/<[^>]*>/g, '').trim() + '...',
      slug: article.slug || article.id,
      category: article.category
    }
  })
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="container-custom">
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            Security Clearance Knowledge Base
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '2.5rem', opacity: 0.95 }}>
            Expert guidance for Australian security clearances
          </p>
          <div className="search-container">
            <input type="text" className="search-bar" placeholder="Search our knowledge base..." />
          </div>
        </div>
      </div>

      {/* Latest Articles Section */}
      {latestArticles && latestArticles.length > 0 && (
        <div style={{ background: 'white', padding: '4rem 2rem' }}>
          <div className="container-custom">
            <div className="section-title">
              <h2>Latest Articles</h2>
              <p>Stay updated with our newest content</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {latestArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="article-card"
                  style={{
                    background: 'white',
                    borderLeft: '4px solid var(--gold)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    display: 'block'
                  }}
                >
                  <h3 style={{
                    color: 'var(--navy)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    lineHeight: 1.4,
                    transition: 'color 0.3s ease'
                  }}>
                    {article.title}
                  </h3>
                  <p style={{
                    color: 'var(--text-grey)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '1rem'
                  }}>
                    {article.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--navy)',
                    fontWeight: 600
                  }}>
                    <span>Read more</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Most Popular Articles Section */}
      {popularArticles && popularArticles.length > 0 && (
        <div style={{ background: 'var(--light-grey)', padding: '4rem 2rem' }}>
          <div className="container-custom">
            <div className="section-title">
              <h2>Most Popular Articles</h2>
              <p>Our most viewed and helpful content</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginTop: '2rem'
            }}>
              {popularArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  style={{
                    display: 'block',
                    background: 'white',
                    borderRadius: '8px',
                    padding: '2rem',
                    textDecoration: 'none',
                    border: '1px solid var(--mid-grey)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease'
                  }}
                  className="article-card-hover"
                >
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--gold)',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {article.category}
                  </div>
                  <h3 style={{
                    color: 'var(--navy)',
                    fontSize: '1.3rem',
                    marginBottom: '1rem',
                    fontWeight: 600,
                    lineHeight: 1.4
                  }}>
                    {article.title}
                  </h3>
                  <p style={{
                    color: 'var(--text-grey)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '1rem'
                  }}>
                    {article.excerpt}
                  </p>
                  <div style={{
                    color: 'var(--navy)',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}>
                    Read more →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Categories Preview Section */}
      <div style={{ background: 'white', padding: '4rem 2rem' }}>
        <div className="container-custom">
          <div className="section-title">
            <h2>Explore by Topic</h2>
            <p>Find the information you need, organised by category</p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link 
              href="/categories" 
              className="inline-block bg-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Browse All Categories →
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, #003a70 100%)',
        padding: '4rem 2rem',
        color: 'white'
      }}>
        <div className="container-custom" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            Need Personalised Assistance?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.9 }}>
            Our team is ready to help you navigate your security clearance journey
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-introduction" className="btn btn-secondary btn-large">
              Request Introduction
            </Link>
            <Link href="/contact" className="btn btn-outline btn-large">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


