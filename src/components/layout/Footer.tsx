export function Footer() {
  return (
    <footer className="py-8 mt-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Dark Scroll AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
