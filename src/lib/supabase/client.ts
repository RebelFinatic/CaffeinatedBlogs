'use client';

import { createBrowserClient } from '@supabase/ssr'; // Changed from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/database.types';

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
