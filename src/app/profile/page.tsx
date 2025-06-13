
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, UserCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Your Profile',
  robots: {
    index: false, // Typically, profile pages are not indexed
  },
};

export default async function ProfilePage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth?message=Please log in to view your profile.');
  }

  const userEmailInitial = user.email ? user.email.charAt(0).toUpperCase() : '?';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24 text-3xl">
                  {/* <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} /> */}
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userEmailInitial}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-3xl font-bold font-headline text-primary">
                {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User Profile'}
              </CardTitle>
              <CardDescription>
                Manage your personal information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3 p-4 rounded-md border bg-secondary/30">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email Address</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              
              {/* Placeholder for more profile information */}
              <div className="p-4 rounded-md border border-dashed">
                <p className="text-center text-muted-foreground">
                  More profile settings and information will be available here soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
