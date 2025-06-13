"use client"; 

import type { Metadata } from 'next';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Note: Metadata in client components is not directly supported for SEO in the same way as server components.
// However, setting a title via document.title can be done. For full SEO, error pages are often static or server-rendered.
// For this setup, we'll keep it simple.
// export const metadata: Metadata = {
//   title: 'Error | CaffeinatedBlogs',
//   description: 'An error occurred while trying to load this page.',
// };

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    document.title = 'Error | CaffeinatedBlogs';
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold font-headline mb-4 text-destructive">Oops! Something went wrong.</h1>
        <p className="text-lg text-muted-foreground mb-2">
          We encountered an unexpected issue. Please try again.
        </p>
        {error?.message && (
          <p className="text-sm text-muted-foreground/80 mb-6">Error: {error.message}</p>
        )}
        <Button
          onClick={() => reset()}
          variant="default"
          size="lg"
        >
          Try again
        </Button>
      </main>
      <Footer />
    </div>
  );
}
