import Link from 'next/link'
import { Article } from '@/types'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.created_at).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-gold group"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
            {article.category}
          </span>
          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>

        <h3 className="text-xl font-semibold text-navy mb-3 group-hover:text-gold transition-colours">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-gold text-sm font-semibold uppercase tracking-wide group-hover:text-navy transition-colours">
            Read More →
          </span>
          {article.view_count > 0 && (
            <span className="text-xs text-gray-400">
              {article.view_count} {article.view_count === 1 ? 'view' : 'views'}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
