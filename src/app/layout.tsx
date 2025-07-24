import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { DesktopNavigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Buildrs - Where Developers Connect & Build',
  description: 'The next generation platform for developer collaboration, project discovery, and team building.',
  keywords: 'developers, collaboration, projects, matching, github, coding',
  authors: [{ name: 'Buildrs Team' }],
  creator: 'Buildrs',
  publisher: 'Buildrs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://buildrs.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Buildrs - Where Developers Connect & Build',
    description: 'The next generation platform for developer collaboration, project discovery, and team building.',
    url: 'https://buildrs.net',
    siteName: 'Buildrs',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Buildrs - Developer Collaboration Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buildrs - Where Developers Connect & Build',
    description: 'The next generation platform for developer collaboration, project discovery, and team building.',
    images: ['/og-image.png'],
    creator: '@buildrs',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <Providers>
          <DesktopNavigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
