
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cog } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Application Settings',
   robots: {
    index: false, // Settings pages are usually not indexed
  },
};

export default async function SettingsPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth?message=Please log in to view settings.');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Cog className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl font-bold font-headline text-primary">
                  Settings
                </CardTitle>
              </div>
              <CardDescription>
                Manage your application preferences and account settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold font-headline mb-3 text-foreground">Account</h2>
                <div className="p-4 rounded-md border border-dashed">
                  <p className="text-center text-muted-foreground">
                    Account management options will be here (e.g., change password, delete account).
                  </p>
                </div>
              </section>
              <section>
                <h2 className="text-xl font-semibold font-headline mb-3 text-foreground">Preferences</h2>
                <div className="p-4 rounded-md border border-dashed">
                  <p className="text-center text-muted-foreground">
                    Theme preferences and other application settings will appear here.
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
