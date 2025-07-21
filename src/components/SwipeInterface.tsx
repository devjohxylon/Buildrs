'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';
import { mockProfiles, mockProjects } from '@/lib/mockData';
import { SwipeCard as SwipeCardType } from '@/types';
import { X, Heart, Zap, RotateCcw, Filter, Terminal, ArrowLeft, Activity } from 'lucide-react';

interface SwipeInterfaceProps {
  mode?: 'profiles' | 'projects' | 'mixed';
}

export default function SwipeInterface({ mode = 'mixed' }: SwipeInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const [matches, setMatches] = useState(0);
  const [lastDirection, setLastDirection] = useState<'left' | 'right' | null>(null);

  const cards: SwipeCardType[] = useMemo(() => {
    const profileCards = mockProfiles.map(profile => ({
      id: `profile-${profile.id}`,
      type: 'profile' as const,
      data: profile
    }));
    
    const projectCards = mockProjects.map(project => ({
      id: `project-${project.id}`,
      type: 'project' as const,
      data: project
    }));

    switch (mode) {
      case 'profiles':
        return profileCards;
      case 'projects':
        return projectCards;
      case 'mixed':
      default:
        const shuffled = [...profileCards, ...projectCards];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
  }, [mode]);

  const upcomingCards = cards.slice(currentIndex, currentIndex + 3);
  const canSwipe = currentIndex < cards.length;
  const progress = currentIndex / cards.length;

  const handleSwipe = (direction: 'left' | 'right', card: SwipeCardType) => {
    setLastDirection(direction);
    setSwipeCount(prev => prev + 1);
    
    if (direction === 'right') {
      setMatches(prev => prev + 1);
    }
    
    setTimeout(() => setLastDirection(null), 2000);
  };

  const handleCardLeftScreen = (card: SwipeCardType) => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    if (canSwipe && upcomingCards.length > 0) {
      handleSwipe(direction, upcomingCards[0]);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSwipeCount(0);
    setMatches(0);
    setLastDirection(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header with Terminal Stats */}
      <div className="border-b border-gray-800 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="terminal">
            <div className="terminal-content">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6">
                  <button className="btn btn-secondary text-lg py-3 px-6">
                    <ArrowLeft size={20} className="mr-2" />
                    BACK
                  </button>
                  <div className="text-gray-200 terminal-text text-lg font-semibold">
                    user@buildrs:~/matching$ ./process_queue.sh
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="status-dot status-online"></div>
                  <span className="text-green-400 text-base terminal-text font-bold">PROCESSING</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold terminal-text text-white">{swipeCount}</div>
                  <div className="text-gray-200 text-base terminal-text font-semibold">PROCESSED</div>
                </div>
                <div>
                  <div className="text-4xl font-bold terminal-text text-green-400">{matches}</div>
                  <div className="text-gray-200 text-base terminal-text font-semibold">MATCHES</div>
                </div>
                <div>
                  <div className="text-4xl font-bold terminal-text text-white">{cards.length - currentIndex}</div>
                  <div className="text-gray-200 text-base terminal-text font-semibold">REMAINING</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="text-gray-300 text-base text-center mt-2 terminal-text font-medium">
                  {Math.round(progress * 100)}% complete
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Swipe Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-7xl w-full">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Panel - Queue */}
            <div className="hidden lg:block">
              <div className="card h-[650px]">
                <div className="card-header">
                  <div className="flex items-center gap-3">
                    <Terminal size={18} />
                    <span className="terminal-text text-base font-bold text-white">QUEUE STATUS</span>
                  </div>
                </div>
                <div className="card-content h-full overflow-hidden">
                  <div className="text-gray-200 text-base mb-6 terminal-text font-semibold">Upcoming matches:</div>
                  <div className="space-y-4">
                    {upcomingCards.slice(1, 4).map((card, index) => (
                      <div key={card.id} className="border border-gray-800 rounded p-4 bg-gray-900/50">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                          <span className="text-gray-200 text-sm terminal-text font-semibold">
                            {card.type === 'profile' ? 'DEVELOPER' : 'PROJECT'}
                          </span>
                        </div>
                        <div className="text-white text-base font-bold truncate">
                          {card.type === 'profile' 
                            ? (card.data as any).name 
                            : (card.data as any).title
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Center Panel - Main Card */}
            <div className="flex flex-col items-center">
              <div className="relative w-96 h-[650px] mb-8">
                <AnimatePresence>
                  {canSwipe ? (
                    upcomingCards.map((card, index) => (
                      <motion.div
                        key={card.id}
                        initial={{ scale: 0.95 - index * 0.05, y: index * 15, opacity: 0.7 }}
                        animate={{ scale: 0.95 - index * 0.05, y: index * 15, opacity: 1 - index * 0.3 }}
                        className="absolute"
                        style={{ zIndex: upcomingCards.length - index }}
                      >
                        {index === 0 ? (
                          <SwipeCard
                            card={card}
                            onSwipe={handleSwipe}
                            onCardLeftScreen={handleCardLeftScreen}
                          />
                        ) : (
                          <div className="w-96 h-[650px] swipe-card pointer-events-none">
                            <div className="h-full card flex items-center justify-center">
                              <div className="text-gray-400 text-center">
                                <div className="text-4xl mb-4">
                                  {card.type === 'profile' ? '👤' : '🚀'}
                                </div>
                                <div className="text-lg terminal-text font-bold text-white">
                                  {card.type === 'profile' ? 'DEVELOPER' : 'PROJECT'}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-96 h-[650px] card flex flex-col items-center justify-center text-center"
                    >
                      <div className="text-8xl mb-8">✅</div>
                      <h2 className="text-4xl font-bold title-text mb-4 text-white">
                        Queue Complete
                      </h2>
                      <p className="text-gray-200 mb-8 terminal-text text-xl font-medium">
                        Processed {swipeCount} entries. Found {matches} potential matches.
                      </p>
                      <button
                        onClick={handleReset}
                        className="btn btn-primary flex items-center gap-3 text-xl"
                      >
                        <RotateCcw size={20} />
                        RESTART QUEUE
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              {canSwipe && (
                <div className="flex justify-center gap-8">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleButtonSwipe('left')}
                    className="action-btn reject"
                    title="Reject (R)"
                  >
                    <X size={28} />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="action-btn border-yellow-500 text-yellow-500 hover:bg-yellow-500"
                    title="Super Like (S)"
                  >
                    <Zap size={24} />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleButtonSwipe('right')}
                    className="action-btn like"
                    title="Match (M)"
                  >
                    <Heart size={28} />
                  </motion.button>
                </div>
              )}
            </div>

            {/* Right Panel - Activity Log */}
            <div className="hidden lg:block">
              <div className="card h-[650px]">
                <div className="card-header">
                  <div className="flex items-center gap-3">
                    <Activity size={18} />
                    <span className="terminal-text text-base font-bold text-white">ACTIVITY LOG</span>
                  </div>
                </div>
                <div className="card-content">
                  <div className="space-y-3 text-sm terminal-text">
                    <div className="text-gray-300 font-medium">[{new Date().toLocaleTimeString()}] Session started</div>
                    <div className="text-gray-300 font-medium">[{new Date().toLocaleTimeString()}] Loaded {cards.length} candidates</div>
                    {swipeCount > 0 && (
                      <div className="text-green-400 font-semibold">[{new Date().toLocaleTimeString()}] Processed {swipeCount} entries</div>
                    )}
                    {matches > 0 && (
                      <div className="text-blue-400 font-semibold">[{new Date().toLocaleTimeString()}] Found {matches} matches</div>
                    )}
                    <div className="text-gray-300 loading-dots font-medium">[{new Date().toLocaleTimeString()}] Waiting for input</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Action Feedback */}
      <AnimatePresence>
        {lastDirection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className={`terminal p-6 ${
              lastDirection === 'right'
                ? 'border-green-500 text-green-400' 
                : 'border-red-500 text-red-400'
            }`}>
              <div className="terminal-text text-lg font-bold">
                {lastDirection === 'right' ? '✓ MATCH_CONFIRMED' : '✗ ENTRY_REJECTED'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts */}
      <div className="border-t border-gray-800 p-4">
        <div className="max-w-5xl mx-auto flex justify-center gap-8 text-base terminal-text text-gray-200 font-medium">
          <span>R = REJECT</span>
          <span>M = MATCH</span>
          <span>S = SUPER</span>
          <span>ESC = BACK</span>
        </div>
      </div>
    </div>
  );
} 