
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/auth/actions'; // Server action for logout
import { LogIn, LogOut } from 'lucide-react';

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (_event === 'INITIAL_SESSION') {
           setLoading(false);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await logout(); // Call the server action
    // setUser(null) is handled by onAuthStateChange
  };

  return (
    <header className="py-6 bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold font-headline text-primary hover:text-accent transition-colors"
        >
          CaffeinatedBlogs
        </Link>
        <nav>
          {loading ? (
            <div className="h-10 w-24 bg-muted rounded-md animate-pulse"></div>
          ) : user ? (
            <form action={handleLogout}>
              <Button variant="ghost" type="submit">
                <LogOut className="mr-2 h-5 w-5" /> Logout
              </Button>
            </form>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/auth">
                <LogIn className="mr-2 h-5 w-5" /> Login / Sign Up
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
