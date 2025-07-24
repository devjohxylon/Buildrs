import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation, { DesktopNavigation } from '@/components/Navigation';
import { Providers } from '@/components/Providers';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Buildrs - Developer Collaboration Platform',
  description: 'Connect, collaborate, and build amazing projects with developers worldwide.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        <ErrorBoundary>
          <Providers>
            <main className="min-h-screen lg:ml-64">
              <DesktopNavigation />
              {children}
              <Navigation />
            </main>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
