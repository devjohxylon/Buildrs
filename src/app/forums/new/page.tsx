'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Tag, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';

// Empty state data for production
const categories: any[] = [];

export default function NewThreadPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    tags: [] as string[],
    isPinned: false,
    isLocked: false
  });
  const [newTag, setNewTag] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  // If not authenticated, show login modal
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-6xl mb-4">Login Required</div>
            <h1 className="text-2xl font-bold mb-4">Join Buildrs to create threads</h1>
            <p className="text-gray-400 mb-6">
              Share your knowledge and participate in discussions.
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
          feature="forums"
        />
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a new thread ID
    const newThreadId = `thread-${Date.now()}`;
    
    // In a real app, you'd save to the database here
    console.log('Creating new thread:', { ...formData, id: newThreadId });
    
    // Redirect to the new thread
    router.push(`/forums/${newThreadId}`);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      {/* Header */}
      <div className="bg-black border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Create New Thread</h1>
              <p className="text-gray-400">Start a new discussion in the community</p>
            </div>
            <Link 
              href="/community?tab=forums"
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Forums
            </Link>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Thread Title */}
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Thread Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  Thread Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a descriptive title for your thread..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Thread Content */}
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Thread Content</h3>
            <div>
              <label className="block text-white font-medium mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your question, topic, or discussion in detail..."
                rows={8}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                required
              />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Tags</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add tags to help others find your thread..."
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Tag size={16} />
                  Add
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-300 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Thread Options */}
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Thread Options</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPinned}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="text-white font-medium">Pin Thread</div>
                  <div className="text-gray-400 text-sm">Keep this thread at the top of the forum</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isLocked}
                  onChange={(e) => setFormData(prev => ({ ...prev, isLocked: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="text-white font-medium">Lock Thread</div>
                  <div className="text-gray-400 text-sm">Prevent new replies to this thread</div>
                </div>
              </label>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium mb-2">Community Guidelines</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Be respectful and constructive in your discussions</li>
                  <li>• Use descriptive titles and provide clear context</li>
                  <li>• Search for existing threads before creating new ones</li>
                  <li>• Tag your threads appropriately for better discoverability</li>
                  <li>• Follow the community code of conduct</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link
              href="/community?tab=forums"
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.category || !formData.description}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
        </motion.form>
      </div>
    </div>
  );
} 