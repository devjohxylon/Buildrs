'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Terminal, Github, ArrowRight, User, Lock } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await login();
      // The redirect will be handled by NextAuth
    } catch (err) {
      setError('Failed to authenticate with GitHub. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center lg:ml-64">
      <div className="w-full max-w-md mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Login</h1>
          <p className="text-gray-400">Access your developer profile</p>
        </div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black rounded-lg border border-gray-700 overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-700">
            <div className="flex items-center gap-3">
              <Terminal size={16} className="text-white" />
              <span className="text-white font-medium">Authentication Terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg mb-6">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Welcome Message */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-white mb-2">Welcome to Buildrs</h2>
              <p className="text-gray-400 text-sm">
                Connect with your GitHub account to access your developer profile and start collaborating.
              </p>
            </div>

            {/* GitHub Login Button */}
            <button
              onClick={handleGitHubLogin}
              disabled={isLoading || authLoading}
              className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-800 text-white font-medium py-4 px-6 rounded-lg border border-gray-700 transition-colors flex items-center justify-center gap-3 mb-6"
            >
              {isLoading || authLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting to GitHub...</span>
                </>
              ) : (
                <>
                  <Github size={20} />
                  <span>Continue with GitHub</span>
                </>
              )}
            </button>

            {/* Benefits */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-white font-medium text-sm">Import Your Profile</h3>
                  <p className="text-gray-400 text-xs">Automatically sync your GitHub profile, repositories, and skills</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-white font-medium text-sm">Find Collaborators</h3>
                  <p className="text-gray-400 text-xs">Connect with developers who share your interests and skills</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-white font-medium text-sm">Build Together</h3>
                  <p className="text-gray-400 text-xs">Start projects and collaborate on amazing ideas</p>
                </div>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-xs text-center">
                By continuing, you agree to our{' '}
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
        </motion.div>

        {/* Command Prompt */}
        <div className="mt-8 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 text-white text-sm">
            <span className="text-gray-500">user@buildrs:~/auth$</span>
            <span className="text-gray-400">login --provider=github</span>
            <span className="text-white animate-pulse">|</span>
          </div>
        </div>
      </div>
    </div>
  );
} 