'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, MessageSquare, Send, X } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';

// Empty state data for production
const categories: any[] = [];

export default function NewThreadPage() {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-6xl mb-4">💬</div>
            <h1 className="text-2xl font-bold mb-4">Join Buildrs to create threads</h1>
            <p className="text-gray-400 mb-6">
              Share your thoughts and start discussions with the community.
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          feature="forum creation"
        />
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to forums page
      router.push('/forums');
    } catch (err) {
      setError('Failed to create thread. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/forums" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-lg transition-colors">
            <X size={20} />
            <span>Cancel</span>
          </Link>
          <h1 className="text-3xl font-bold">Create New Thread</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Form */}
        <div className="bg-black border border-gray-700 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Thread Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                <option value="general">General Discussion</option>
                <option value="help">Help & Support</option>
                <option value="showcase">Project Showcase</option>
                <option value="jobs">Job Opportunities</option>
                <option value="events">Events & Meetups</option>
              </select>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                placeholder="Share your thoughts, questions, or ideas..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !content.trim() || !selectedCategory}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Create Thread
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Guidelines */}
        <div className="mt-8 bg-black border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Community Guidelines</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>• Be respectful and constructive in your discussions</li>
            <li>• Use clear, descriptive titles for better discoverability</li>
            <li>• Share code snippets when relevant to help others</li>
            <li>• Tag your posts appropriately for better organization</li>
            <li>• Avoid spam, self-promotion, or off-topic content</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 