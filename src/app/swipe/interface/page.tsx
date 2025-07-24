'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, Heart, Users } from 'lucide-react';
import SwipeInterface from '@/components/SwipeInterface';

export default function SwipeInterfacePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white lg:ml-64 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4"
          >
            <Terminal size={48} className="text-white mx-auto mb-4" />
            <div className="text-white font-mono text-lg">
              Initializing Developer Discovery...
            </div>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5 }}
            className="h-1 bg-white rounded"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      {/* Header */}
      <div className="bg-black">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/swipe"
                className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to Discovery
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Developer Discovery</h1>
                <p className="text-gray-400 text-sm">
                  Swipe through developer profiles
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/matches">
                <button className="flex items-center gap-2 text-sm bg-green-400/10 hover:bg-green-400/20 text-green-400 px-3 py-2 rounded-lg transition-colors">
                  <Heart size={16} />
                  <span>View matches</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Interface */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <SwipeInterface />
      </div>
    </div>
  );
} 