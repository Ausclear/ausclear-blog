# AusClear Knowledge Base

A comprehensive Next.js knowledge base for Australian security clearance information.

## Features

- 📚 **Knowledge Base Articles** - Fetch and display articles from Supabase
- 🏷️ **13 Categories** - Organised content covering all aspects of security clearances
- 🔍 **Search Functionality** - Full-text search across all articles
- 📱 **Responsive Design** - Mobile-friendly interface with navy (#002147) and gold (#B8860B) colours
- 💬 **Anthony AI Chat Widget** - Integrated AI assistant for instant help
- 📧 **Contact Forms** - Request introduction and general contact forms
- 🔐 **SEO Optimised** - Comprehensive meta tags and Open Graph support
- 🇦🇺 **British English** - Localised for Australian audience

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ausclear-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_ANTHONY_AI_WIDGET_ID=your_widget_id
   ```

4. **Set up Supabase Database**

   Create a `kb_documents` table in your Supabase project:
   ```sql
   CREATE TABLE kb_documents (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     title TEXT NOT NULL,
     slug TEXT UNIQUE NOT NULL,
     content TEXT NOT NULL,
     excerpt TEXT NOT NULL,
     category TEXT NOT NULL,
     author TEXT,
     published BOOLEAN DEFAULT false,
     view_count INTEGER DEFAULT 0,
     meta_title TEXT,
     meta_description TEXT,
     tags TEXT[]
   );

   -- Create index for better search performance
   CREATE INDEX idx_kb_documents_published ON kb_documents(published);
   CREATE INDEX idx_kb_documents_category ON kb_documents(category);
   CREATE INDEX idx_kb_documents_slug ON kb_documents(slug);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ausclear-blog/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API routes
│   ├── articles/[slug]/     # Individual article pages
│   ├── categories/          # Category pages
│   │   └── [slug]/         # Category detail pages
│   ├── contact/            # Contact form page
│   ├── request-introduction/ # Request introduction page
│   ├── search/             # Search page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/              # React components
│   ├── AnthonyAIWidget.tsx
│   ├── ArticleCard.tsx
│   ├── CategoryCard.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── RequestIntroductionForm.tsx
│   └── SearchBar.tsx
├── lib/                     # Utility functions
│   └── supabase.ts         # Supabase client
├── types/                   # TypeScript types
│   ├── index.ts            # Main types and categories
│   └── supabase.ts         # Database types
├── html-mockups/            # Original HTML designs
├── .env.local              # Environment variables (not in git)
├── .env.example            # Example environment file
└── package.json
```

## Categories

The knowledge base includes 13 categories:

1. 🚀 Getting Started
2. 🔐 Clearance Types
3. 📋 Application Process
4. 📄 Documentation
5. ✅ Eligibility
6. ⏱️ Timelines
7. 🔍 Security Assessments
8. 🔄 Maintenance & Renewal
9. ⚠️ Common Issues
10. 🏢 Corporate Sponsors
11. 🌏 International Applicants
12. 💼 Career Guidance
13. ❓ FAQ

## Adding Content

### Creating Articles

You can add articles directly to your Supabase database or use the Supabase dashboard:

```sql
INSERT INTO kb_documents (
  title,
  slug,
  content,
  excerpt,
  category,
  published,
  meta_title,
  meta_description,
  tags
) VALUES (
  'Your Article Title',
  'your-article-slug',
  '<p>Your article content in HTML</p>',
  'Brief excerpt of the article',
  'getting-started',
  true,
  'SEO Title',
  'SEO Description',
  ARRAY['tag1', 'tag2']
);
```

### Category Slugs

Use these category slugs when creating articles:
- `getting-started`
- `clearance-types`
- `application-process`
- `documentation`
- `eligibility`
- `timelines`
- `security-assessments`
- `maintenance-renewal`
- `common-issues`
- `corporate-sponsors`
- `international-applicants`
- `career-guidance`
- `faq`

## Customisation

### Colours

The site uses AusClear brand colours defined in `tailwind.config.ts`:
- **Navy:** `#002147`
- **Gold:** `#B8860B`

### Anthony AI Widget

To enable the Anthony AI chat widget:
1. Set `NEXT_PUBLIC_ANTHONY_AI_WIDGET_ID` in your `.env.local`
2. Update the widget script URL in `components/AnthonyAIWidget.tsx`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Ensure these are set in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_ANTHONY_AI_WIDGET_ID`

## SEO Features

- Dynamic meta tags per page
- Open Graph tags for social sharing
- Sitemap generation (coming soon)
- Robots.txt configuration
- Structured data (coming soon)

## Performance

- Server-side rendering with Next.js 14
- Incremental Static Regeneration (revalidate: 3600)
- Optimised images with Next.js Image component
- Code splitting and lazy loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a private project for AusClear. For questions or issues, contact the development team.

## License

Proprietary - AusClear 2025

## Support

For technical support or questions:
- Email: support@ausclear.au
- Knowledge Base: https://support.ausclear.au

---

**Secure. Vetted. Ready.**

*AusClear - Elevate Your Career*
