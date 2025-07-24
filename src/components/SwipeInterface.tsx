'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Heart, X, Star, MessageSquare, User, Code, MapPin, Clock, Users, GitBranch, Eye, ThumbsUp } from 'lucide-react';
import { SwipeCard, Profile, Project } from '@/types';
import { FadeIn, SlideUp, AnimatePresence, AnimatedButton, AnimatedCard } from '@/lib/animations';
import { debounce } from '@/lib/performance';
import { useAuth } from './AuthProvider';
import LoginModal from './LoginModal';

interface SwipeInterfaceProps {
  onSwipe?: (cardId: string, direction: 'left' | 'right') => void;
  onMatch?: (card: SwipeCard) => void;
  mode?: 'all' | 'profiles' | 'projects' | 'mixed';
}

export default function SwipeInterface({ onSwipe, onMatch, mode = 'all' }: SwipeInterfaceProps) {
  const { user, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState<SwipeCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedCard, setMatchedCard] = useState<SwipeCard | null>(null);
  const [filter, setFilter] = useState<'all' | 'profiles' | 'projects'>(mode === 'mixed' ? 'all' : mode);

  // Memoize filtered cards for performance
  const filteredCards = useMemo(() => {
    if (filter === 'all') return cards;
    return cards.filter(card => card.type === filter.slice(0, -1)); // Remove 's' from 'profiles'/'projects'
  }, [cards, filter]);

  // Load cards with debounced loading
  const loadCards = useCallback(
    debounce(async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setCards([]); // Replace with actual API call to fetch cards
      } catch (error) {
        console.error('Failed to load cards:', error);
      } finally {
        setIsLoading(false);
      }
    }, 100),
    []
  );

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (currentCardIndex >= filteredCards.length) return;

    const currentCard = filteredCards[currentCardIndex];
    setSwipeDirection(direction);

    // Simulate match (20% chance)
    if (direction === 'right' && Math.random() < 0.2) {
      setMatchedCard(currentCard);
      setShowMatch(true);
      onMatch?.(currentCard);
    }

    onSwipe?.(currentCard.id, direction);

    // Move to next card after animation
    setTimeout(() => {
      setCurrentCardIndex(prev => prev + 1);
      setSwipeDirection(null);
    }, 300);
  }, [currentCardIndex, filteredCards, onSwipe, onMatch]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      handleSwipe('left');
    } else if (event.key === 'ArrowRight') {
      handleSwipe('right');
    }
  }, [handleSwipe]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

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
            <h1 className="text-2xl font-bold mb-4">Join Buildrs to start swiping</h1>
            <p className="text-gray-400 mb-6">
              Connect with developers and discover amazing projects.
            </p>
            <AnimatedButton
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Get Started
            </AnimatedButton>
          </div>
        </div>
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)}
          feature="swipe"
        />
      </>
    );
  }

  const currentCard = filteredCards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / filteredCards.length) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading cards...</p>
        </div>
      </div>
    );
  }

  if (currentCardIndex >= filteredCards.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">No Cards</div>
          <h1 className="text-2xl font-bold mb-4">No profiles or projects available</h1>
          <p className="text-gray-400 mb-6">
            Check back later for new developers and projects to discover.
          </p>
          <AnimatedButton
            onClick={() => {
              setCurrentCardIndex(0);
              loadCards();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Refresh
          </AnimatedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-700/50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Discover</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                {currentCardIndex + 1} of {filteredCards.length}
              </span>
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
            {[
              { id: 'all', label: 'All', icon: Eye },
              { id: 'profiles', label: 'Developers', icon: User },
              { id: 'projects', label: 'Projects', icon: Code }
            ].map(({ id, label, icon: Icon }) => (
              <AnimatedButton
                key={id}
                onClick={() => setFilter(id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  filter === id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </AnimatedButton>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card Display */}
          <div className="lg:col-span-2">
            {currentCard && (
              <AnimatedCard
                className={`bg-gray-900 border border-gray-700 rounded-xl p-6 transition-all duration-300 ${
                  swipeDirection === 'left' ? 'transform -translate-x-full opacity-0' :
                  swipeDirection === 'right' ? 'transform translate-x-full opacity-0' : ''
                }`}
              >
                {currentCard && (
                  <div className="space-y-6">
                    {/* Card Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                          {currentCard.type === 'profile' ? (
                            <User size={24} className="text-gray-400" />
                          ) : (
                            <Code size={24} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold">
                            {currentCard.type === 'profile' 
                              ? (currentCard.data as Profile).name
                              : (currentCard.data as Project).title
                            }
                          </h2>
                          <p className="text-gray-400">
                            {currentCard.type === 'profile' 
                              ? (currentCard.data as Profile).experienceLevel
                              : (currentCard.data as Project).difficulty
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-400" />
                        <span className="text-sm text-gray-400">4.8</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div>
                      <p className="text-gray-300 mb-4">
                        {currentCard.type === 'profile' 
                          ? (currentCard.data as Profile).bio
                          : (currentCard.data as Project).description
                        }
                      </p>

                      {/* Skills/Tech Stack */}
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">
                          {currentCard.type === 'profile' ? 'Skills' : 'Tech Stack'}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {(currentCard.type === 'profile' 
                            ? (currentCard.data as Profile).skills
                            : (currentCard.data as Project).techStack
                          ).slice(0, 5).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin size={14} />
                          <span>
                            {currentCard.type === 'profile' 
                              ? (currentCard.data as Profile).location || 'Remote'
                              : 'Remote'
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock size={14} />
                          <span>
                            {currentCard.type === 'profile' 
                              ? (currentCard.data as Profile).availability
                              : (currentCard.data as Project).estimatedDuration
                            }
                          </span>
                        </div>
                        {currentCard.type === 'project' && (
                          <>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Users size={14} />
                              <span>
                                {(currentCard.data as Project).currentCollaborators}/
                                {(currentCard.data as Project).maxCollaborators} members
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <GitBranch size={14} />
                              <span>{(currentCard.data as Project).status}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </AnimatedCard>
            )}
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <AnimatedButton
                    onClick={() => handleSwipe('left')}
                    className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <X size={20} />
                    Pass
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => handleSwipe('right')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Heart size={20} />
                    Like
                  </AnimatedButton>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Cards Viewed</span>
                    <span className="font-semibold">{currentCardIndex}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Matches</span>
                    <span className="font-semibold text-green-400">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Remaining</span>
                    <span className="font-semibold">{filteredCards.length - currentCardIndex - 1}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match Modal */}
      {showMatch && matchedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <FadeIn className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">Match!</div>
            <h2 className="text-2xl font-bold mb-2">It's a Match!</h2>
            <p className="text-gray-400 mb-6">
              You and {matchedCard.type === 'profile' 
                ? (matchedCard.data as Profile).name
                : (matchedCard.data as Project).title
              } are a great fit!
            </p>
            <div className="flex gap-3">
              <AnimatedButton
                onClick={() => setShowMatch(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Continue Swiping
              </AnimatedButton>
              <AnimatedButton
                onClick={() => {
                  setShowMatch(false);
                  // Navigate to chat or profile
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                Message
              </AnimatedButton>
            </div>
          </FadeIn>
        </div>
      )}
    </div>
  );
} 