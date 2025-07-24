'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('github', { callbackUrl: '/' });
    } catch (error) {
      console.error('GitHub login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-lg transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Back to Buildrs</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your Buildrs account</p>
        </div>

        <div className="bg-black border border-gray-700 rounded-lg p-6">
          <div className="space-y-4">
            <button
              onClick={handleGitHubLogin}
              disabled={isLoading}
              className="w-full bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-3"
            >
              <Github size={20} />
              {isLoading ? 'Signing in...' : 'Continue with GitHub'}
            </button>

            <div className="text-center">
              <p className="text-gray-400 text-sm">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 