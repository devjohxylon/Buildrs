'use client';

import { X, Github } from 'lucide-react';
import { signIn } from 'next-auth/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

export default function LoginModal({ isOpen, onClose, feature }: LoginModalProps) {
  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: '/' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-black border border-gray-700 rounded-lg p-8 max-w-md w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome to Buildrs</h2>
          {feature && (
            <p className="text-gray-400">
              Sign in with GitHub to access {feature}
            </p>
          )}
          <p className="text-gray-400 mt-2">
            Connect your GitHub profile to get started
          </p>
        </div>

        {/* GitHub OAuth */}
        <button
          onClick={handleGitHubSignIn}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-3"
        >
          <Github size={24} />
          Continue with GitHub
        </button>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-blue-400 hover:text-blue-300">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 