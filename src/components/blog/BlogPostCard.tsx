import type { Post } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface BlogPostCardProps {
  post: Post;
  priority?: boolean; // Add priority prop
}

export function BlogPostCard({ post, priority = false }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      <Link href={`/posts/${post.slug}`} className="block" aria-label={`Read more about ${post.title}`}>
        <div className="relative w-full h-48 sm:h-56">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill // Changed from layout="fill"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Added sizes prop
            style={{ objectFit: 'cover' }} // Changed from objectFit="cover"
            data-ai-hint={post.imageHint}
            priority={priority} // Use the priority prop
          />
        </div>
      </Link>
      <CardHeader>
        <Link href={`/posts/${post.slug}`} className="block hover:text-primary transition-colors">
          <CardTitle className="text-xl lg:text-2xl font-headline">{post.title}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto pt-4">
        <div className="text-sm text-muted-foreground">
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span> by <span>{post.author}</span>
        </div>
        <Button asChild variant="ghost" size="sm" className="text-accent hover:text-accent hover:bg-accent/10">
          <Link href={`/posts/${post.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
