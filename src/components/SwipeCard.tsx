'use client';

import React from 'react';
import { Heart, X, Star, MessageSquare, User, Code, MapPin, Clock, Users, GitBranch, Eye, ThumbsUp } from 'lucide-react';
import { SwipeCard as SwipeCardType } from '@/types';
import { FadeIn, SlideUp } from '@/lib/animations';

interface SwipeCardProps {
  card: SwipeCardType;
  onSwipe: (direction: 'left' | 'right') => void;
  onCardLeftScreen: (card: SwipeCardType) => void;
  onClick: () => void;
}

export default function SwipeCard({ card, onSwipe, onCardLeftScreen, onClick }: SwipeCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (direction === 'left' || direction === 'right') {
      onSwipe(direction);
    }
  };

  const data = card.data as any; // Assuming data is now directly passed or derived

  return (
    <TinderCard
      ref={cardRef}
      className="absolute inset-0"
      onSwipe={handleSwipe}
      onCardLeftScreen={() => onCardLeftScreen(card)}
      preventSwipe={['up', 'down']}
      swipeRequirementType="position"
      swipeThreshold={200}
    >
      <div
        className="w-full h-full bg-black rounded-2xl border border-gray-700/50 cursor-grab active:cursor-grabbing overflow-hidden relative group hover:scale-[1.01] transition-transform duration-150"
        onClick={onClick}
      >
        <ProfileCard profile={data} />

        {/* Simplified "Tap for details" indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
          <Eye size={12} className="text-gray-300" />
          <span className="text-xs text-gray-300 font-medium">Tap for details</span>
          <ChevronRight size={12} className="text-gray-400" />
        </div>
      </div>
    </TinderCard>
  );
}

function ProfileCard({ profile }: { profile: any }) { // Assuming profile is now directly passed
  const githubStats = profile.githubStats;
  
  return (
    <div className="flex flex-col h-full p-6 relative z-10">
      {/* Header - Fixed height */}
      <div className="flex items-start gap-4 mb-4 h-20">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg flex-shrink-0">
          {profile.name.charAt(0)}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-1 truncate">{profile.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            <Zap size={14} className="text-yellow-400 flex-shrink-0" />
            <p className="text-blue-400 font-semibold text-sm truncate">{profile.role}</p>
          </div>
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span className="truncate">{profile.location}</span>
            </div>
            {githubStats && (
              <div className="flex items-center gap-1">
                <Github size={12} className="text-purple-400" />
                <span className="text-purple-300">{githubStats.experienceLevel}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GitHub Stats - New section */}
      {githubStats && (
        <div className="mb-4 h-16">
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <div className="text-blue-400 font-bold text-sm">{githubStats.publicRepos}</div>
              <div className="text-gray-400 text-xs">Repos</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold text-sm">{githubStats.totalStars}</div>
              <div className="text-gray-400 text-xs">Stars</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-bold text-sm">{githubStats.followers}</div>
              <div className="text-gray-400 text-xs">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-orange-400 font-bold text-sm">{githubStats.contributionStats.currentStreak}</div>
              <div className="text-gray-400 text-xs">Streak</div>
            </div>
          </div>
        </div>
      )}

      {/* Bio - Fixed height with proper overflow */}
      <div className="mb-4 h-12">
        <p className="text-gray-300 leading-relaxed text-sm line-clamp-2">
          {profile.bio}
        </p>
      </div>

      {/* Top Languages - Enhanced */}
      {githubStats && githubStats.topLanguages.length > 0 && (
        <div className="mb-4 h-20">
          <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
            <Code size={14} className="text-emerald-400" />
            <span>Top Languages</span>
          </h4>
          <div className="space-y-1">
            {githubStats.topLanguages.slice(0, 3).map((lang, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-gray-300">{lang.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 bg-gray-800 rounded-full h-1">
                    <div 
                      className="bg-blue-400 h-1 rounded-full" 
                      style={{ width: `${Math.min(lang.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-400 w-8 text-right">{lang.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills - Fallback if no GitHub data */}
      {(!githubStats || githubStats.topLanguages.length === 0) && (
        <div className="mb-4 h-20">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
            <Code size={14} className="text-emerald-400" />
            <span>Top Skills</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {profile.skills.slice(0, 6).map((skill, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-black text-gray-200 rounded-lg text-xs font-medium border border-gray-600/50"
              >
                {skill}
              </span>
            ))}
            {profile.skills.length > 6 && (
              <span className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/30">
                +{profile.skills.length - 6}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Activity & Interests - Takes remaining space */}
      <div className="flex-1">
        {githubStats && (
          <div className="mb-3">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
              <Activity size={14} className="text-green-400" />
              <span>Activity</span>
            </h4>
            <div className="text-xs text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>Total contributions:</span>
                <span className="text-green-400">{githubStats.contributionStats.totalContributions}</span>
              </div>
              <div className="flex justify-between">
                <span>Average per day:</span>
                <span className="text-blue-400">{githubStats.contributionStats.averagePerDay}</span>
              </div>
            </div>
          </div>
        )}
        
        <div>
          <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
            <Star size={14} className="text-pink-400" />
            <span>Interests</span>
          </h4>
          <div className="flex flex-wrap gap-1">
            {profile.interests.slice(0, 4).map((interest, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-lg text-xs font-medium border border-pink-500/30"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

 