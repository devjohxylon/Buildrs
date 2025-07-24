'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, X, MessageSquare, User, Code } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';

export default function SwipeInterfacePage() {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'profiles' | 'projects'>('all');

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
            <div className="text-6xl mb-4">💕</div>
            <h1 className="text-2xl font-bold mb-4">Join Buildrs to start swiping</h1>
            <p className="text-gray-400 mb-6">
              Discover amazing developers and projects through our swipe interface.
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
          feature="swipe interface"
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/swipe" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-lg transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Back to Swipe</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Swipe Interface</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the future of developer matching and project discovery.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('profiles')}
              className={`px-6 py-2 rounded-md transition-colors ${
                filter === 'profiles'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <User className="inline mr-2" size={16} />
              Profiles
            </button>
            <button
              onClick={() => setFilter('projects')}
              className={`px-6 py-2 rounded-md transition-colors ${
                filter === 'projects'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code className="inline mr-2" size={16} />
              Projects
            </button>
          </div>
        </div>

        {/* Swipe Area */}
        <div className="bg-black border border-gray-700 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold mb-4">No More Cards</h2>
          <p className="text-gray-400 mb-6">
            You've seen all available {filter === 'profiles' ? 'profiles' : filter === 'projects' ? 'projects' : 'items'}.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setFilter('all')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
            <Link
              href="/swipe"
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Back to Swipe
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-black border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">0</div>
            <div className="text-gray-400">Cards Swiped</div>
          </div>
          <div className="bg-black border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">0</div>
            <div className="text-gray-400">Matches</div>
          </div>
          <div className="bg-black border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">0</div>
            <div className="text-gray-400">Conversations</div>
          </div>
        </div>
      </div>
    </div>
  );
} 