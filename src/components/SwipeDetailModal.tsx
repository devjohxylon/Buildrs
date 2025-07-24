'use client';

import React from 'react';
import { X, User, Code, MapPin, Clock, Users, GitBranch, Eye, ThumbsUp, MessageSquare, Heart, Star } from 'lucide-react';
import { FadeIn, SlideUp } from '@/lib/animations';
import { SwipeCard as SwipeCardType } from '@/types';

interface SwipeDetailModalProps {
  card: SwipeCardType;
  onClose: () => void;
  onLike: () => void;
  onPass: () => void;
}

export default function SwipeDetailModal({ card, onClose, onLike, onPass }: SwipeDetailModalProps) {
  const data = card.data as unknown as any; // Assuming data structure is now directly available

  const handleLike = () => {
    onLike();
    onClose();
  };

  const handlePass = () => {
    onPass();
    onClose();
  };

  const getRandomCodeSnippet = () => {
    const snippets = [
      "const buildAwesome = async () => {\\n  const team = await findCollaborators();\\n  return team.createMagic();\\n};",
      "function deployToProduction() {\\n  console.log('🚀 Launching...');\\n  return 'Success!';\\n}",
      "class DeveloperProfile {\\n  constructor(skills) {\\n    this.passion = 'infinite';\\n    this.skills = skills;\\n  }\\n}",
      "const collaboration = {\\n  type: 'open-source',\\n  status: 'active',\\n  impact: 'global'\\n};"
    ];
    return snippets[Math.floor(Math.random() * snippets.length)];
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 30,
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 30,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4"
      onClick={onClose}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="relative bg-black rounded-3xl border border-gray-700/50 w-full max-w-4xl h-[90vh] max-h-[800px] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 bg-black/80 hover:bg-gray-900/80 rounded-full z-20 backdrop-blur-sm border border-gray-600/50 transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} className="text-white" />
        </motion.button>

        {/* Header */}
        <motion.div 
          className="flex-shrink-0 p-8 border-b border-gray-700/50 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-6">
            <motion.div 
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                {data.name.charAt(0)}
              </div>
              <motion.div 
                className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-3 border-gray-900 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            </motion.div>
            
            <div className="flex-1">
              <motion.h1 
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {data.name}
              </motion.h1>
              <motion.div 
                className="flex items-center gap-3 mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Zap size={20} className="text-yellow-400" />
                <p className="text-blue-400 text-xl font-semibold">
                  {data.role}
                </p>
                {data.githubStats && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    data.githubStats.experienceLevel === 'expert' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    data.githubStats.experienceLevel === 'advanced' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    data.githubStats.experienceLevel === 'intermediate' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  }`}>
                    {data.githubStats.experienceLevel}
                  </span>
                )}
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{data.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{data.experience}</span>
                </div>
                {data.availability && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Available: {data.availability}</span>
                  </div>
                )}
                {data.githubStats && (
                  <div className="flex items-center gap-2">
                    <Github size={16} className="text-purple-400" />
                    <span>Member since {new Date(data.githubStats.memberSince).getFullYear()}</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto relative z-10">
          {/* GitHub Stats Section */}
          {data.githubStats && (
            <motion.div 
              className="p-6 border-b border-gray-700/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Github size={20} className="text-purple-400" />
                <h2 className="text-xl font-bold text-white">GitHub Statistics</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <motion.div 
                  className="bg-black/50 rounded-lg p-4 border border-gray-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="text-2xl font-bold text-blue-400">{data.githubStats.publicRepos}</div>
                  <div className="text-gray-400 text-sm">Public Repos</div>
                </motion.div>
                <motion.div 
                  className="bg-black/50 rounded-lg p-4 border border-gray-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75 }}
                >
                  <div className="text-2xl font-bold text-yellow-400">{data.githubStats.totalStars}</div>
                  <div className="text-gray-400 text-sm">Total Stars</div>
                </motion.div>
                <motion.div 
                  className="bg-black/50 rounded-lg p-4 border border-gray-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-2xl font-bold text-green-400">{data.githubStats.followers}</div>
                  <div className="text-gray-400 text-sm">Followers</div>
                </motion.div>
                <motion.div 
                  className="bg-black/50 rounded-lg p-4 border border-gray-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.85 }}
                >
                  <div className="text-2xl font-bold text-orange-400">{data.githubStats.contributionStats.currentStreak}</div>
                  <div className="text-gray-400 text-sm">Current Streak</div>
                </motion.div>
              </div>

              {/* Top Languages */}
              <div className="mb-4">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Code size={16} className="text-emerald-400" />
                  <span>Top Programming Languages</span>
                </h3>
                <div className="space-y-3">
                  {data.githubStats.topLanguages.slice(0, 5).map((lang: any, index: number) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                    >
                      <span className="text-gray-300 font-medium">{lang.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-800 rounded-full h-2">
                          <motion.div 
                            className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full" 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(lang.percentage, 100)}%` }}
                            transition={{ delay: 1.1 + index * 0.05, duration: 0.8 }}
                          />
                        </div>
                        <span className="text-gray-400 text-sm w-10 text-right">{lang.percentage}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contribution Activity */}
              <div>
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Activity size={16} className="text-green-400" />
                  <span>Contribution Activity</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <motion.div 
                    className="flex justify-between p-2 bg-black/30 rounded"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <span className="text-gray-400">Total contributions:</span>
                    <span className="text-green-400 font-medium">{data.githubStats.contributionStats.totalContributions}</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between p-2 bg-black/30 rounded"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.25 }}
                  >
                    <span className="text-gray-400">Longest streak:</span>
                    <span className="text-orange-400 font-medium">{data.githubStats.contributionStats.longestStreak} days</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between p-2 bg-black/30 rounded"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    <span className="text-gray-400">Average per day:</span>
                    <span className="text-blue-400 font-medium">{data.githubStats.contributionStats.averagePerDay}</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}



          {/* Code snippet */}
          <motion.div 
            className="p-6 bg-black border-b border-gray-700/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Terminal size={16} className="text-green-400" />
              <span className="text-green-400 text-sm font-mono">~/developer-profile.js</span>
              <motion.div 
                className="flex gap-1 ml-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </motion.div>
            </div>
            <motion.pre 
              className="text-green-400 font-mono text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <code>{getRandomCodeSnippet()}</code>
            </motion.pre>
          </motion.div>

          {/* Bio */}
          <motion.div 
            className="p-6 border-b border-gray-700/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle size={18} className="text-purple-400" />
              <h3 className="text-white font-bold text-lg">
                About Me
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {data.bio}
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div 
            className="p-6 border-b border-gray-700/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-3 text-lg">
              <Code size={20} className="text-emerald-400" />
              <span>Technical Skills</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {data.skills?.map((skill: string, index: number) => (
                <motion.span 
                  key={index} 
                  className="px-4 py-2 bg-black text-gray-200 rounded-xl text-sm font-semibold border border-gray-600/50 shadow-lg hover:scale-105 transition-transform"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 + index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div 
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-3 text-lg">
              <Star size={20} className="text-pink-400" />
              <span>Interests</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {data.interests?.map((item: string, index: number) => (
                <motion.span 
                  key={index} 
                  className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-xl text-sm font-semibold border border-pink-500/30 shadow-lg hover:scale-105 transition-transform"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(236, 72, 153, 0.2)"
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action buttons */}
        <motion.div 
          className="flex-shrink-0 p-6 border-t border-gray-700/50 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center justify-center gap-8">
            <motion.button
              onClick={handlePass}
              className="group relative w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              title="Pass"
            >
              <X size={32} className="text-white" />
              <motion.div 
                className="absolute inset-0 rounded-full bg-red-400/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={handleLike}
              className="group relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              title="Like"
            >
              <Heart size={32} className="text-white" />
              <motion.div 
                className="absolute inset-0 rounded-full bg-green-400/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
          
          <motion.p 
            className="text-center text-gray-400 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            Make your choice and discover new opportunities
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 