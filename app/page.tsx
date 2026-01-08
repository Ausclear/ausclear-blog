import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Article = {
  id: string
  title: string
  excerpt: string
  slug: string
  category: string
}

async function getLatestArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('kb_documents')
    .select('*')
    .eq('is_active', true)
    .eq('archived', false)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching latest articles:', error)
    return []
  }

  return (data || []).map((article: any) => ({
    ...article,
    slug: article.slug || article.id,
    excerpt: article.excerpt || ''
  })) as Article[]
}

export default async function HomePage() {
  const latestArticles = await getLatestArticles()

  return (
    <>
      {/* Hero Section with Search */}
      <div style={{
        background: 'linear-gradient(135deg, #002147 0%, #003a70 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '20px' }}>
            Security Clearance Knowledge Base
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '40px', opacity: 0.95 }}>
            Expert guidance for Australian security clearances
          </p>
          
          {/* Search Form */}
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form action="/search" method="GET">
              <input 
                type="text"
                name="q"
                placeholder="Search our knowledge base..." 
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  fontSize: '18px',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  boxSizing: 'border-box',
                  color: '#000000',
                  backgroundColor: '#ffffff'
                }}
              />
            </form>
          </div>
        </div>
      </div>

      {/* Latest Articles */}
      {latestArticles && latestArticles.length > 0 && (
        <div style={{ background: 'white', padding: '80px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#002147', marginBottom: '10px' }}>
                Latest Articles
              </h2>
              <p style={{ fontSize: '18px', color: '#64748b' }}>
                Stay updated with our newest content
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {latestArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  style={{
                    background: 'white',
                    borderLeft: '4px solid #f1c40f',
                    borderRadius: '8px',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    display: 'block'
                  }}
                >
                  <h3 style={{
                    color: '#002147',
                    fontSize: '20px',
                    fontWeight: 700,
                    marginBottom: '12px',
                    lineHeight: 1.4
                  }}>
                    {article.title}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    fontSize: '15px',
                    lineHeight: 1.6,
                    marginBottom: '15px'
                  }}>
                    {article.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: '#002147',
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

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #002147 0%, #003a70 100%)',
        padding: '80px 20px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '20px' }}>
            Need Help with Your Security Clearance?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
            Our team can guide you through the entire clearance process
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#002147',
              padding: '16px 40px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '18px'
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  )
}
