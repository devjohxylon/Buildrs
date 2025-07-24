'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, User, Calendar, MapPin, Code, Star } from 'lucide-react';

// Production data - replace with actual API calls
const matches: any[] = [];

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState<typeof matches[0] | null>(null);

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      {/* Header */}
      <div className="bg-black">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link
                href="/swipe/interface"
                className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to Discovery
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Your Matches</h1>
                <p className="text-gray-400">Connect with developers who share your interests</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Heart size={16} className="text-white" />
              <span className="text-gray-400">{matches.length} matches</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Matches List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Recent Matches</h2>
            {matches.map((match) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-black rounded-lg border border-gray-700 p-4 cursor-pointer transition-all ${
                  selectedMatch?.id === match.id ? 'ring-2 ring-white' : 'hover:bg-gray-900'
                }`}
                onClick={() => setSelectedMatch(match)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={match.avatar}
                    alt={match.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{match.name}</h3>
                      <div className="flex items-center gap-1 text-white">
                        <Star size={14} />
                        <span className="text-sm">{match.matchScore}%</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{match.role}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{match.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>Matched {new Date(match.matchDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Match Details */}
          <div className="lg:sticky lg:top-8">
            {selectedMatch ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black rounded-lg border border-gray-700 p-6"
              >
                <div className="text-center mb-6">
                  <img
                    src={selectedMatch.avatar}
                    alt={selectedMatch.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-bold mb-2">{selectedMatch.name}</h2>
                  <p className="text-gray-400 mb-4">{selectedMatch.role}</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{selectedMatch.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>Last active {selectedMatch.lastActive}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-white mb-4">
                    <Star size={16} />
                    <span className="font-semibold">{selectedMatch.matchScore}% Match</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">About</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{selectedMatch.bio}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMatch.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-700 text-white rounded-lg text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <MessageCircle size={16} />
                      Send Message
                    </button>
                    <button className="flex-1 bg-black hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg border border-gray-700 transition-colors flex items-center justify-center gap-2">
                      <User size={16} />
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-black rounded-lg border border-gray-700 p-6 text-center">
                <Heart size={48} className="text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Match</h3>
                <p className="text-gray-400 text-sm">
                  Choose a developer from the list to view their details and start a conversation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 