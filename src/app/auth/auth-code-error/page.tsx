import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline text-destructive">
            Authentication Error
          </CardTitle>
          <CardDescription>
            There was an issue verifying your authentication token.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            The link may have expired or already been used. Please try signing in or signing up again.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <Button asChild className="w-full">
            <Link href="/auth">Go to Login/Signup</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
