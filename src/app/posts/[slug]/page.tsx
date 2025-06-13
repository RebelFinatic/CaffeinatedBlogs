import { getPostBySlug, type Post } from '@/lib/posts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleSummary } from '@/components/blog/ArticleSummary';
import { generateArticleSummary } from '@/ai/flows/generate-article-summary';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const ogImageUrl = post.imageUrl.includes('placehold.co')
    ? `https://placehold.co/1200x630.png?text=${encodeURIComponent(post.title)}` // Use a 1200x630 placeholder for OG
    : post.imageUrl;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/posts/${post.slug}`,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: 'CaffeinatedBlogs',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
      // creator: '@authorTwitterHandle', // Consider adding author's Twitter handle if available
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const summaryData = await generateArticleSummary({ articleContent: post.content });

  const paragraphs = post.content.split('\\n').map(p => p.trim()).filter(p => p.length > 0);

  const ogImageUrl = post.imageUrl.includes('placehold.co')
  ? `https://placehold.co/1200x630.png?text=${encodeURIComponent(post.title)}`
  : post.imageUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/posts/${post.slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": ogImageUrl,
    "author": {
      "@type": "Person", // Or Organization if the blog uses a general author
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "CaffeinatedBlogs",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png` // Replace with your actual logo URL
      }
    },
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString() // Assuming no separate modified date for now
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold font-headline mb-4 text-foreground leading-tight">
              {post.title}
            </h1>
            <div className="text-muted-foreground text-sm mb-4">
              <span>Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} by {post.author}</span>
            </div>
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-6">
               <Image
                src={post.imageUrl.replace('600x400', '1200x600')} 
                alt={post.title}
                fill // Changed from layout="fill"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Added sizes prop
                style={{ objectFit: 'cover' }} // Changed from objectFit="cover"
                data-ai-hint={post.imageHint + " article"}
                priority 
              />
            </div>
          </header>

          <ArticleSummary summary={summaryData.summary} hasSufficientContext={summaryData.hasSufficientContext} />

          <div className="prose prose-invert max-w-none text-foreground/90 prose-headings:text-foreground prose-strong:text-foreground prose-a:text-accent hover:prose-a:text-primary">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-6 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
