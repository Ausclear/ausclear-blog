import Link from 'next/link'
import { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-gold group"
    >
      <div className="text-4xl mb-4">{category.icon}</div>
      <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-gold transition-colours">
        {category.name}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-3">
        {category.description}
      </p>
      {category.articleCount !== undefined && (
        <p className="text-xs text-gray-500">
          {category.articleCount} {category.articleCount === 1 ? 'article' : 'articles'}
        </p>
      )}
    </Link>
  )
}
