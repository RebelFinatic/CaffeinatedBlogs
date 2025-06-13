'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Invalid email address.' });
const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long.' });

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type FormState = {
  message: string;
  error?: boolean;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = createSupabaseServerClient();
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      error: true,
      issues: validatedFields.error.flatten().fieldErrors.email || validatedFields.error.flatten().fieldErrors.password,

    };
  }

  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { message: error.message, error: true };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = createSupabaseServerClient();
  const validatedFields = signupSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
     return {
      message: 'Invalid form data.',
      error: true,
      issues: validatedFields.error.flatten().fieldErrors.email || validatedFields.error.flatten().fieldErrors.password,
    };
  }
  
  const { email, password } = validatedFields.data;
  const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL!).origin;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { message: error.message, error: true };
  }

  return {
    message: 'Check your email to confirm your account and complete the signup process.',
    error: false,
  };
}

export async function logout(): Promise<void> {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}
