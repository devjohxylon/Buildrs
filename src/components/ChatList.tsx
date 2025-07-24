'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from './LoginModal';
import {
  Search,
  Filter,
  MoreVertical,
  MessageCircle,
  Users,
  Clock,
  Star,
  Github,
  MapPin,
  Code,
  Activity,
  Heart,
  Trash2
} from 'lucide-react';

interface ChatMatch {
  id: string;
  matchedAt: Date;
  otherUser: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    githubUsername?: string;
    isOnline: boolean;
    lastSeen?: Date;
    location: string;
    skills: string[];
    githubStats?: {
      publicRepos: number;
      totalStars: number;
      followers: number;
      experienceLevel: string;
    };
  };
  lastMessage?: {
    content: string;
    timestamp: Date;
    senderId: string;
  };
  unreadCount: number;
  compatibility: number;
}

interface ChatListProps {
  onSelectMatch: (matchId: string) => void;
  onBack: () => void;
}

export default function ChatList({ onSelectMatch, onBack }: ChatListProps) {
  const { user, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Production data - replace with actual API calls
  const [matches, setMatches] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'online' | 'recent'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showMenuFor, setShowMenuFor] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [showUnmatchModal, setShowUnmatchModal] = useState<string | null>(null);

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.otherUser.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.otherUser.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'online' && match.otherUser.isOnline) ||
                         (filter === 'recent' && match.lastMessage && 
                          Date.now() - match.lastMessage.timestamp.getTime() < 24 * 60 * 60 * 1000);
    
    return matchesSearch && matchesFilter;
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const handleDeleteChat = (matchId: string) => {
    setMatches(prev => prev.filter(match => match.id !== matchId));
    setShowDeleteModal(null);
    console.log(`Deleted chat: ${matchId}`);
  };

  const handleUnmatch = (matchId: string) => {
    setMatches(prev => prev.filter(match => match.id !== matchId));
    setShowUnmatchModal(null);
    console.log(`Unmatched: ${matchId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading matches...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login modal
  if (!isAuthenticated) {
    return (
      <>
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-6xl mb-4">Login Required</div>
            <h1 className="text-2xl font-bold mb-4">Join Buildrs to start chatting</h1>
            <p className="text-gray-400 mb-6">
              Connect with your matches and collaborate on projects.
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
          feature="chat"
        />
      </>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={20} className="text-white" />
          </motion.button>
          
          <div>
            <h2 className="text-white font-bold text-lg">Messages</h2>
            <p className="text-gray-400 text-sm">{matches.length} matches</p>
          </div>
        </div>

        <motion.button
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MoreVertical size={20} className="text-gray-400" />
        </motion.button>
      </motion.div>

      {/* Search and Filter */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search matches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All', icon: Users },
            { key: 'online', label: 'Online', icon: Activity },
            { key: 'recent', label: 'Recent', icon: Clock }
          ].map(({ key, label, icon: Icon }) => (
            <motion.button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={14} />
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Matches List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filteredMatches.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center h-full text-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <MessageCircle size={48} className="text-gray-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">No matches found</h3>
              <p className="text-gray-400 text-sm">
                {searchQuery ? 'Try adjusting your search terms' : 'Start swiping to find developers to chat with!'}
              </p>
            </motion.div>
          ) : (
            filteredMatches.map((match, index) => (
              <motion.div
                key={match.id}
                className="border-b border-gray-700/30 last:border-b-0 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center">
                  <motion.button
                    onClick={() => onSelectMatch(match.id)}
                    className="flex-1 p-4 hover:bg-gray-800/50 transition-colors text-left"
                    whileHover={{ backgroundColor: 'rgba(31, 41, 55, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                          {match.otherUser.name.charAt(0)}
                        </div>
                        {match.otherUser.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-semibold truncate">{match.otherUser.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium ${getCompatibilityColor(match.compatibility)}`}>
                              {match.compatibility}%
                            </span>
                            <span className="text-gray-500 text-xs">
                              {match.lastMessage ? formatTime(match.lastMessage.timestamp) : formatTime(match.matchedAt)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-400 text-sm font-medium">{match.otherUser.role}</span>
                          <span className="text-gray-500">•</span>
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-gray-500" />
                            <span className="text-gray-500 text-sm">{match.otherUser.location}</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex items-center gap-1 mb-2">
                          <Code size={12} className="text-gray-500" />
                          <div className="flex gap-1">
                            {match.otherUser.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="text-gray-400 text-xs bg-gray-800 px-2 py-0.5 rounded">
                                {skill}
                              </span>
                            ))}
                            {match.otherUser.skills.length > 3 && (
                              <span className="text-gray-500 text-xs">+{match.otherUser.skills.length - 3}</span>
                            )}
                          </div>
                        </div>

                        {/* Last Message */}
                        {match.lastMessage && (
                          <div className="flex items-center justify-between">
                            <p className="text-gray-400 text-sm truncate flex-1">
                              {match.lastMessage.senderId === user?.id ? 'You: ' : ''}
                              {match.lastMessage.content}
                            </p>
                            {match.unreadCount > 0 && (
                              <div className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                {match.unreadCount}
                              </div>
                            )}
                          </div>
                        )}

                        {/* GitHub Stats */}
                        {match.otherUser.githubStats && (
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Github size={12} />
                              <span>{match.otherUser.githubStats.publicRepos} repos</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={12} />
                              <span>{match.otherUser.githubStats.totalStars} stars</span>
                            </div>
                            <span className="capitalize">{match.otherUser.githubStats.experienceLevel}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>

                  {/* Menu Button */}
                  <div className="relative">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenuFor(showMenuFor === match.id ? null : match.id);
                      }}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors mr-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MoreVertical size={16} className="text-gray-400" />
                    </motion.button>

                    {/* Menu Dropdown */}
                    <AnimatePresence>
                      {showMenuFor === match.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 top-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 min-w-32"
                        >
                          <div className="p-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowUnmatchModal(match.id);
                                setShowMenuFor(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-800 rounded transition-colors"
                            >
                              <Heart size={14} className="text-red-400" />
                              <span className="text-white text-sm">Unmatch</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowDeleteModal(match.id);
                                setShowMenuFor(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-800 rounded transition-colors"
                            >
                              <Trash2 size={14} className="text-red-400" />
                              <span className="text-white text-sm">Delete Chat</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Delete Chat Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <Trash2 size={24} className="text-red-400" />
                <h3 className="text-white text-lg font-semibold">Delete Chat</h3>
              </div>
              
              <p className="text-gray-300 mb-4">
                Are you sure you want to delete this chat? This action cannot be undone and all messages will be permanently removed.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteChat(showDeleteModal)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete Chat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unmatch Modal */}
      <AnimatePresence>
        {showUnmatchModal && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart size={24} className="text-red-400" />
                <h3 className="text-white text-lg font-semibold">Unmatch</h3>
              </div>
              
              <p className="text-gray-300 mb-4">
                Are you sure you want to unmatch? This will remove the match and you won't be able to chat anymore.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUnmatchModal(null)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUnmatch(showUnmatchModal)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Unmatch
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 