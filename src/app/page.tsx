import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { posts } from '@/lib/posts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'Latest Articles - CaffeinatedBlogs',
  description: 'Discover the latest articles from CaffeinatedBlogs on AI, web development, technology trends, and more insightful content.',
  openGraph: {
    title: 'Latest Articles - CaffeinatedBlogs',
    description: 'Discover the latest articles from CaffeinatedBlogs on AI, web development, technology trends, and more insightful content.',
    url: `${SITE_URL}/`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image-home.png`, // Replace with your actual home OG image
        width: 1200,
        height: 630,
        alt: 'CaffeinatedBlogs Homepage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Articles - CaffeinatedBlogs',
    description: 'Discover the latest articles from CaffeinatedBlogs on AI, web development, technology trends, and more insightful content.',
    images: [`${SITE_URL}/og-image-home.png`], // Replace with your actual home OG image
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CaffeinatedBlogs",
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "CaffeinatedBlogs",
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/logo.png` // Replace with your actual logo URL
    }
  }
};

const jsonLdBlog = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "CaffeinatedBlogs",
  "url": SITE_URL,
  "description": "Discover the latest articles from CaffeinatedBlogs on AI, web development, technology trends, and more insightful content.",
  "publisher": {
    "@type": "Organization",
    "name": "CaffeinatedBlogs",
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/logo.png` // Replace with your actual logo URL
    }
  }
};


export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold font-headline mb-10 text-center text-foreground">
          Latest Articles
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogPostCard 
              key={post.slug} 
              post={post} 
              priority={index < 3} // Prioritize loading for the first 3 images (adjust as needed)
            />
          ))}
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }}
      />
    </>
  );
}
