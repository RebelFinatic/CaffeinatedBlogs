import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CaffeinatedBlogs - AI Powered Insights',
    template: '%s | CaffeinatedBlogs',
  },
  description: 'A blog of caffeinated developers, powered by AI. Explore articles on technology, programming, and AI innovations.',
  applicationName: 'CaffeinatedBlogs',
  authors: [{ name: 'CaffeinatedBlogs Team' }],
  keywords: ['AI', 'blog', 'technology', 'programming', 'development', 'insights', 'caffeine'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'CaffeinatedBlogs',
    title: 'CaffeinatedBlogs - AI Powered Insights',
    description: 'A blog of caffeinated developers, powered by AI. Explore articles on technology, programming, and AI innovations.',
    images: [
      {
        url: '/og-image.png', // Replace with your actual default OG image
        width: 1200,
        height: 630,
        alt: 'CaffeinatedBlogs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CaffeinatedBlogs - AI Powered Insights',
    description: 'A blog of caffeinated developers, powered by AI. Explore articles on technology, programming, and AI innovations.',
    images: [`${SITE_URL}/og-image.png`], // Replace with your actual default OG image
    // creator: '@yourtwitterhandle', // Add your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // icons: { // Add your favicon here
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7952B3' }, // Corresponds to --primary HSL(266 39% 51%)
    { media: '(prefers-color-scheme: dark)', color: '#7952B3' },
  ],
  colorScheme: 'dark light', // Supports both dark and light system themes
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <div className="flex-grow animate-in fade-in-0 duration-500 ease-out">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
