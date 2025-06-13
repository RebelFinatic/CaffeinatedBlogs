import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold font-headline mb-4 text-primary">404</h1>
        <h2 className="text-3xl font-semibold mb-6 text-foreground">Post Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, we couldn&apos;t find the blog post you&apos;re looking for.
        </p>
        <Button asChild size="lg">
          <Link href="/">Go back to Homepage</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
