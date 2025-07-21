'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SwipeInterface from '@/components/SwipeInterface';
import { Users, Briefcase, Shuffle, Terminal, Code } from 'lucide-react';

export default function SwipePage() {
  const [mode, setMode] = useState<'profiles' | 'projects' | 'mixed'>('mixed');
  const [showInterface, setShowInterface] = useState(false);

  const modes = [
    {
      key: 'profiles' as const,
      title: 'Find Developers',
      description: 'Connect with talented developers looking for projects',
      icon: Users,
      command: 'grep -r "talent" /dev/developers'
    },
    {
      key: 'projects' as const,
      title: 'Find Projects',
      description: 'Discover exciting projects that need your skills',
      icon: Briefcase,
      command: 'find /var/projects -name "*.opportunity"'
    },
    {
      key: 'mixed' as const,
      title: 'Mixed Mode',
      description: 'See both developers and projects in your feed',
      icon: Shuffle,
      command: 'cat /dev/random | grep -E "(dev|project)"'
    }
  ];

  if (showInterface) {
    return <SwipeInterface mode={mode} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="terminal mb-4">
            <div className="terminal-content">
              <div className="text-gray-400 terminal-text text-sm mb-2">
                user@buildrs:~$ ./configure_matching_engine.sh
              </div>
              <div className="text-green-500 text-sm">
                [INFO] Matching engine ready for configuration
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold title-text mb-2">
            CONFIGURE MATCHING ALGORITHM
          </h1>
          <p className="text-gray-400 terminal-text">
            Select your matching parameters to initialize the collaboration discovery system.
          </p>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="space-y-4">
            {modes.map((modeOption) => {
              const Icon = modeOption.icon;
              const isSelected = mode === modeOption.key;

              return (
                <motion.button
                  key={modeOption.key}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setMode(modeOption.key)}
                  className={`w-full text-left transition-all ${
                    isSelected ? 'border-white' : 'border-gray-700 hover:border-gray-500'
                  } card`}
                >
                  <div className="card-header">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <span className="terminal-text text-xs">
                        {modeOption.command}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 border rounded flex items-center justify-center ${
                        isSelected ? 'border-white bg-white text-black' : 'border-gray-600'
                      }`}>
                        <Icon size={20} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold title-text mb-1">
                          {modeOption.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {modeOption.description}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-white' : 'border-gray-600'
                        }`}>
                          {isSelected && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Initialize Button */}
          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowInterface(true)}
              className="btn btn-primary flex items-center gap-3 mx-auto px-8 py-4 text-lg"
            >
              <Terminal size={20} />
              INITIALIZE MATCHING ENGINE
              <Code size={20} />
            </motion.button>
            
            <div className="mt-4 text-gray-500 terminal-text text-sm">
              Press ENTER to start discovering collaborators
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="border-t border-gray-800 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between terminal-text text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="status-dot status-online"></div>
            SYSTEM STATUS: OPERATIONAL
          </div>
          <div>
            MODE: {mode.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
} 