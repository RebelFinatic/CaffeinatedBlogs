import { getPostBySlug, type Post } from '@/lib/posts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleSummary } from '@/components/blog/ArticleSummary';
import { generateArticleSummary } from '@/ai/flows/generate-article-summary';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const summaryData = await generateArticleSummary({ articleContent: post.content });

  // Split content into paragraphs for rendering
  const paragraphs = post.content.split('\\n').map(p => p.trim()).filter(p => p.length > 0);

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
              <span>Published on {post.date} by {post.author}</span>
            </div>
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-6">
               <Image
                src={post.imageUrl.replace('600x400', '1200x600')} // Use a larger placeholder for article page
                alt={post.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={post.imageHint + " article"}
                priority // Prioritize loading of the main article image
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
    </>
  );
}

// Add Tailwind prose styles for dark mode
// Add to globals.css or a specific component if preferred.
// For simplicity, here's an inline style for prose-invert if needed,
// but Tailwind's prose classes with `dark:` variants usually work with `html.dark`.
// Since we always apply `dark`, `prose-invert` should work.
// Check if prose colors need to be adjusted based on current foreground/accent.
// Default prose-invert colors from @tailwindcss/typography:
// prose-invert:
//   --tw-prose-body: theme('colors.zinc.400');
//   --tw-prose-headings: theme('colors.zinc.100');
//   --tw-prose-links: theme('colors.zinc.100');
//   --tw-prose-bold: theme('colors.zinc.100');

// We want to use our theme colors.
// prose-headings:text-foreground, prose-strong:text-foreground
// prose-a:text-accent, hover:prose-a:text-primary (primary is darker, maybe accent/90)
// text-foreground/90 for body
