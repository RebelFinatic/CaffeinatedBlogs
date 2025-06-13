import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Required for Supabase server actions to work correctly with redirects
  // This is a temporary workaround for a Next.js issue with Server Actions and redirects
  // experimental: {
  //   serverActions: {
  //     allowedOrigins: ['localhost:9002', process.env.NEXT_PUBLIC_SITE_URL || ''],
  //   },
  // },
};

export default nextConfig;
