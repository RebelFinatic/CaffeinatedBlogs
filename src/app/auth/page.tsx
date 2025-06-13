'use client';

import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login, signup, type FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const emailSchema = z.string().email({ message: 'Invalid email address.' });
const passwordSchema = z.string().min(8, { message: 'Password must be at least 8 characters long.' });

const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type FormData = z.infer<typeof formSchema>;

const initialFormState: FormState = { message: '', error: false };

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginState, loginAction] = useFormState(login, initialFormState);
  const [signupState, signupAction] = useFormState(signup, initialFormState);

  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/');
      }
    };
    checkUser();
  }, [router, supabase]);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (isLoginMode) {
      loginAction(formData);
    } else {
      signupAction(formData);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    reset(); // Reset form fields and errors when toggling mode
    // Reset server action states
    loginState.message = '';
    loginState.error = false;
    signupState.message = '';
    signupState.error = false;
  };
  
  const currentActionState = isLoginMode ? loginState : signupState;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className="absolute top-4 left-4">
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline text-primary">
            {isLoginMode ? 'Welcome Back!' : 'Create Account'}
          </CardTitle>
          <CardDescription>
            {isLoginMode ? 'Sign in to continue to CaffeinatedBlogs' : 'Join CaffeinatedBlogs today'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  className="pl-10"
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="pl-10"
                  aria-invalid={errors.password ? "true" : "false"}
                />
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            
            {currentActionState?.message && (
              <Alert variant={currentActionState.error ? 'destructive' : 'default'} className="mt-4">
                <AlertTitle>{currentActionState.error ? 'Error' : 'Notification'}</AlertTitle>
                <AlertDescription>
                  {currentActionState.message}
                  {currentActionState.issues && (
                    <ul className="list-disc pl-5 mt-1">
                      {currentActionState.issues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  )}
                  </AlertDescription>
              </Alert>
            )}

            <SubmitButton isLoginMode={isLoginMode} />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">
            {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
            <Button variant="link" onClick={toggleMode} className="font-semibold text-accent">
              {isLoginMode ? 'Sign Up' : 'Log In'}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

function SubmitButton({ isLoginMode }: { isLoginMode: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <span className="animate-spin mr-2">⏳</span>
      ) : isLoginMode ? (
        <LogIn className="mr-2 h-5 w-5" />
      ) : (
        <UserPlus className="mr-2 h-5 w-5" />
      )}
      {pending ? 'Processing...' : isLoginMode ? 'Log In' : 'Sign Up'}
    </Button>
  );
}
