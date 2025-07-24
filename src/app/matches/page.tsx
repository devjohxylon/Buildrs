'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Heart, Users } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';

export default function MatchesPage() {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'developers' | 'projects'>('developers');

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
            <h1 className="text-2xl font-bold mb-4">Join Buildrs to see your matches</h1>
            <p className="text-gray-400 mb-6">
              Connect with developers and discover amazing projects.
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
          feature="matches"
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-lg transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Back to Buildrs</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Your Matches</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover developers and projects that match your interests and skills.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('developers')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'developers'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users className="inline mr-2" size={16} />
              Developers
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className="inline mr-2" size={16} />
              Projects
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold mb-4">No Matches Yet</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Start swiping to discover amazing {activeTab === 'developers' ? 'developers' : 'projects'} that match your interests.
          </p>
          <Link
            href="/swipe"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Heart size={16} />
            Start Swiping
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-black border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">0</div>
            <div className="text-gray-400">Total Matches</div>
          </div>
          <div className="bg-black border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">0</div>
            <div className="text-gray-400">Conversations</div>
          </div>
          <div className="bg-black border border-gray-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">0</div>
            <div className="text-gray-400">Collaborations</div>
          </div>
        </div>
      </div>
    </div>
  );
} 