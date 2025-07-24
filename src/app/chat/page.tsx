'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatList from '@/components/ChatList';
import ChatInterface from '@/components/ChatInterface';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  const handleSelectMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
  };

  const handleBackToList = () => {
    setSelectedMatchId(null);
  };

  const handleBackToApp = () => {
    // This would typically navigate back to the main app
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <Link href="/swipe">
            <motion.button
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} className="text-white" />
            </motion.button>
          </Link>
          
          <div>
            <h1 className="text-white font-bold text-xl">Developer Chat</h1>
            <p className="text-gray-400 text-sm">Connect with your matches</p>
          </div>
        </div>
      </motion.div>

      {/* Chat Content */}
      <div className="h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {selectedMatchId ? (
            <motion.div
              key="chat-interface"
              className="h-full"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ChatInterface
                matchId={selectedMatchId}
                onBack={handleBackToList}
              />
            </motion.div>
          ) : (
            <motion.div
              key="chat-list"
              className="h-full"
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ChatList
                onSelectMatch={handleSelectMatch}
                onBack={handleBackToApp}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 