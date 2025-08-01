'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SwipeInterface from '@/components/SwipeInterface';
import { ArrowLeft, Lock, Code, Users, Zap, Coffee, Github } from 'lucide-react';

export default function DevPreviewPage() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Dev Preview Interface (Blurred Background) */}
      <div className={`${!showPreview ? 'filter blur-sm pointer-events-none' : ''} transition-all duration-500`}>
        <SwipeInterface mode="mixed" />
      </div>

      {/* Coming Soon Overlay */}
      {!showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-6"
        >
          <div className="max-w-2xl w-full">
            <div className="terminal p-12 text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Lock size={64} className="text-yellow-400 mx-auto mb-6" />
                
                <h1 className="text-4xl font-bold title-text mb-4">
                  DEV PREVIEW ACCESS
                </h1>
                
                <p className="text-gray-300 text-lg mb-8 terminal-text font-medium">
                  You're viewing an early development build of the Buildrs platform. 
                  This preview demonstrates core functionality but is not yet ready for production use.
                </p>

                <div className="space-y-4 mb-8 text-left">
                  <div className="flex items-center gap-3">
                    <Code size={20} className="text-green-400" />
                    <span className="text-gray-200 terminal-text font-medium">Core swipe engine implemented</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-green-400" />
                    <span className="text-gray-200 terminal-text font-medium">Profile and project mock data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap size={20} className="text-yellow-400" />
                    <span className="text-gray-400 terminal-text font-medium">Real-time matching (coming soon)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Coffee size={20} className="text-yellow-400" />
                    <span className="text-gray-400 terminal-text font-medium">Chat and collaboration tools (in development)</span>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-4 mb-8">
                  <div className="text-yellow-400 text-sm font-bold terminal-text mb-2">
                    ⚠️ DEVELOPMENT BUILD
                  </div>
                  <div className="text-gray-300 text-sm terminal-text">
                    This is a non-functional preview. No data is saved, no real matches are made. 
                    Features are for demonstration purposes only.
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="btn btn-primary flex items-center gap-2 px-8 py-4"
                  >
                    <Code size={20} />
                    EXPLORE PREVIEW
                  </button>
                  
                  <Link href="/">
                    <button className="btn btn-secondary flex items-center gap-2 px-8 py-4">
                      <ArrowLeft size={20} />
                      BACK TO LANDING
                    </button>
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <p className="text-gray-400 text-sm terminal-text mb-4">
                    Want to contribute or follow development?
                  </p>
                  <a 
                    href="https://github.com/buildrs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors terminal-text text-sm font-medium"
                  >
                    <Github size={16} />
                    View on GitHub
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Dev Controls (when preview is active) */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="terminal p-4">
            <div className="text-yellow-400 text-xs font-bold terminal-text mb-2">
              DEV MODE ACTIVE
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="btn btn-secondary text-sm py-2 px-4"
            >
              EXIT PREVIEW
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
} 