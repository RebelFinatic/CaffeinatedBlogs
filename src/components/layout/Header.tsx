import Link from 'next/link';

export function Header() {
  return (
    <header className="py-6 bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-3xl font-bold font-headline text-primary hover:text-accent transition-colors">
          Dark Scroll AI
        </Link>
      </div>
    </header>
  );
}
