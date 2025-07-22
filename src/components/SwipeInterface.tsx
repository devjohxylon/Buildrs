'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';
import { Profile, Project, SwipeCard as SwipeCardType } from '@/types';
import { 
  RotateCcw,
  Heart, 
  X,
  Settings
} from 'lucide-react';

interface SwipeInterfaceProps {
  initialCards?: SwipeCardType[];
}

export default function SwipeInterface({ initialCards = [] }: SwipeInterfaceProps) {
  const [cards, setCards] = useState<SwipeCardType[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<string>('');
  const [matches, setMatches] = useState<SwipeCardType[]>([]);
  const [rejected, setRejected] = useState<SwipeCardType[]>([]);
  const childRefs = useRef(new Map<string, HTMLDivElement>());

  // Sample data for demo
  const sampleCards: SwipeCardType[] = useMemo(() => [
    {
      id: '1',
      type: 'profile',
      data: {
        id: '1',
        name: 'Alex Chen',
        role: 'Full Stack Developer',
        location: 'San Francisco, CA',
        experience: '3 years',
        bio: 'Passionate about building scalable web applications and exploring new technologies. Currently interested in AI/ML integration.',
        skills: ['React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'AWS'],
        interests: ['Web Apps', 'AI/ML', 'Startups'],
        github: 'https://github.com/alexchen',
        linkedin: 'https://linkedin.com/in/alexchen',
        portfolio: 'https://alexchen.dev'
      } as Profile
    },
    {
      id: '2',
      type: 'project',
      data: {
        id: '2',
        title: 'EcoTracker',
        category: 'Environmental',
        description: 'A mobile app to track personal carbon footprint and suggest eco-friendly alternatives.',
        techStack: ['React Native', 'Firebase', 'Node.js', 'Express'],
        teamSize: '2-3',
        timeline: '3 months',
        lookingFor: ['Mobile Developer', 'UI/UX Designer'],
        repository: 'https://github.com/ecotracker/app',
        demo: 'https://ecotracker-demo.vercel.app'
      } as Project
    }
  ], []);

  // Use sample data if no initial cards provided
  const displayCards = cards.length > 0 ? cards : sampleCards;

  const handleSwipe = (direction: 'left' | 'right', swipedCard: SwipeCardType) => {
    setLastDirection(direction);
    
    if (direction === 'right') {
      setMatches(prev => [...prev, swipedCard]);
    } else {
      setRejected(prev => [...prev, swipedCard]);
    }
  };

  const handleCardLeftScreen = (card: SwipeCardType) => {
    const newCards = displayCards.filter(c => c.id !== card.id);
    setCards(newCards);
  };

  const swipe = async (direction: 'left' | 'right') => {
    if (currentIndex >= displayCards.length) return;
    
    const currentCard = displayCards[currentIndex];
    const cardRef = childRefs.current.get(currentCard.id);
    
    if (cardRef) {
      // Trigger swipe animation
      handleSwipe(direction, currentCard);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const undoSwipe = () => {
    if (currentIndex === 0) return;
    
    const lastCard = displayCards[currentIndex - 1];
    setCurrentIndex(prev => prev - 1);
    
    // Remove from matches/rejected
    setMatches(prev => prev.filter(card => card.id !== lastCard.id));
    setRejected(prev => prev.filter(card => card.id !== lastCard.id));
  };

  const currentCard = displayCards[currentIndex];
  const hasCards = currentIndex < displayCards.length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold">Buildrs</div>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-32 flex items-center justify-center min-h-screen">
        <div className="relative w-96 h-[650px]">
          {hasCards ? (
            <AnimatePresence mode="wait">
              <div key={currentCard.id} className="absolute inset-0">
                <SwipeCard
                  card={currentCard}
                  onSwipe={handleSwipe}
                  onCardLeftScreen={handleCardLeftScreen}
                />
              </div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700"
            >
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-2">All caught up!</h2>
                <p className="text-gray-400">Check back later for more profiles and projects.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-8 left-0 right-0">
        <div className="max-w-md mx-auto px-6">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={undoSwipe}
              disabled={currentIndex === 0}
              className="w-14 h-14 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 rounded-full flex items-center justify-center transition-colors"
            >
              <RotateCcw size={24} />
            </button>
            
            <button
              onClick={() => swipe('left')}
              disabled={!hasCards}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 disabled:bg-gray-800 disabled:opacity-50 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={28} />
            </button>
            
            <button
              onClick={() => swipe('right')}
              disabled={!hasCards}
              className="w-16 h-16 bg-green-500 hover:bg-green-600 disabled:bg-gray-800 disabled:opacity-50 rounded-full flex items-center justify-center transition-colors"
            >
              <Heart size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="fixed top-20 left-4 z-40">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-gray-800">
          <div className="text-xs text-gray-400 space-y-1">
            <div>Matches: {matches.length}</div>
            <div>Passed: {rejected.length}</div>
            <div>Remaining: {Math.max(0, displayCards.length - currentIndex)}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 