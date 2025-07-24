'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Terminal, CheckCircle, Clock, Star, Rocket, Zap, Code, Users, ArrowLeft } from 'lucide-react';

const ROADMAP_SEQUENCE = `Buildrs Roadmap v0.1.0-alpha

[ OK ] Loading roadmap data...
[ OK ] Current status: ALPHA DEVELOPMENT
[ OK ] Frontend: 90% | Backend: 20%
[ INFO ] Next milestone: BETA LAUNCH

Welcome to the Buildrs Development Roadmap!`

export default function RoadmapPage() {
  const [terminalText, setTerminalText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const typeText = useCallback(async (text: string, speed: number = 80) => {
    setIsTyping(true);
    setTerminalText('');
    for (let i = 0; i <= text.length; i++) {
      setTerminalText(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    setIsTyping(false);
  }, []);

  // Start typing animation on mount
  useEffect(() => {
    typeText(ROADMAP_SEQUENCE, 40);
  }, [typeText]);

  const phases = [
    {
      name: 'Q1 2025 - ALPHA',
      status: 'IN PROGRESS',
      progress: 90,
      color: 'green',
      features: [
        { text: 'Landing page & brand identity', done: true },
        { text: 'Terminal UI design system', done: true },
        { text: 'Next.js frontend framework', done: true },
        { text: 'Responsive design & animations', done: true },
        { text: 'Navigation & routing', done: true },
        { text: 'Docs & features pages', done: true },
        { text: 'Authentication UI', done: true },
        { text: 'Swipe interface UI', done: true },
        { text: 'Community page', done: true },
        { text: 'Performance optimizations', done: true },
        { text: 'Mobile responsiveness', done: true },
        { text: 'Backend API structure', done: false },
        { text: 'GitHub OAuth integration', done: false },
        { text: 'User authentication system', done: false }
      ]
    },
    {
      name: 'Q2 2025 - BETA',
      status: 'PLANNED',
      progress: 0,
      color: 'blue',
      features: [
        { text: 'Real user authentication', done: false },
        { text: 'User profiles & settings', done: false },
        { text: 'Swipe functionality', done: false },
        { text: 'Matching algorithm', done: false },
        { text: 'Basic chat system', done: false },
        { text: 'Project creation', done: false },
        { text: 'GitHub integration', done: false }
      ]
    },
    {
      name: 'Q3 2025 - LAUNCH',
      status: 'PLANNED',
      progress: 0,
      color: 'purple',
      features: [
        { text: 'Real-time messaging', done: false },
        { text: 'Project collaboration tools', done: false },
        { text: 'Developer forums', done: false },
        { text: 'Mobile app (React Native)', done: false },
        { text: 'Advanced matching', done: false }
      ]
    },
    {
      name: 'Q4 2025 - SCALE',
      status: 'PLANNED',
      progress: 0,
      color: 'orange',
      features: [
        { text: 'Team management', done: false },
        { text: 'Enterprise features', done: false },
        { text: 'Advanced analytics', done: false },
        { text: 'API marketplace', done: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      {/* Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-lg transition-colors mb-4">
              <ArrowLeft size={20} />
              <span>Back to Buildrs</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Roadmap</h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              What we've built and what's coming next
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Animated Terminal */}
        <div className="mb-12">
          <div className="bg-black border-2 border-gray-600 rounded-lg p-6 font-mono text-sm sm:text-base h-40 sm:h-48 lg:h-56 overflow-hidden relative">
            <div className="absolute top-4 left-4 text-gray-500 text-xs">● ● ●</div>
            <div className="h-full overflow-y-auto pt-8">
              <div className="text-white whitespace-pre-line break-words leading-relaxed">
                {terminalText}
              </div>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-black rounded-lg border border-green-500 text-center">
              <Terminal className="text-3xl text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-green-400 mb-1">ALPHA</div>
              <div className="text-gray-400 text-sm">Current Phase</div>
            </div>
            <div className="p-6 bg-black rounded-lg border border-blue-500 text-center">
              <Users className="text-3xl text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-400 mb-1">90%</div>
              <div className="text-gray-400 text-sm">Frontend Complete</div>
            </div>
            <div className="p-6 bg-black rounded-lg border border-purple-500 text-center">
              <Rocket className="text-3xl text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-purple-400 mb-1">Q2 2025</div>
              <div className="text-gray-400 text-sm">Beta Launch</div>
            </div>
          </div>
        </div>

        {/* Development Phases */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Development Phases</h2>
          
          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={index} className="bg-black rounded-lg border border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full bg-${phase.color}-400`}></div>
                    <h3 className="text-xl font-bold text-white">{phase.name}</h3>
                  </div>
                  <div className="text-sm text-gray-400">{phase.status}</div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{phase.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-${phase.color}-400 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${phase.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {phase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      {feature.done ? (
                        <CheckCircle size={16} className="text-green-400" />
                      ) : (
                        <Clock size={16} className="text-gray-500" />
                      )}
                      <span className={`text-sm ${feature.done ? 'text-gray-300' : 'text-gray-500'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What's Next */}
        <div className="mb-12">
          <div className="terminal p-6 sm:p-8 bg-black">
            <h2 className="text-2xl font-bold mb-6 text-white">What's Next</h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Backend API development with FastAPI</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">GitHub OAuth integration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">User authentication system</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Real swipe functionality</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Basic matching algorithm</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="terminal p-6 sm:p-8 bg-black">
            <h2 className="text-2xl font-bold mb-4">Ready to Join?</h2>
            <p className="text-gray-300 mb-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Be part of the journey from alpha to launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors w-full sm:w-auto text-center">
                Join Waitlist
              </Link>
              <Link href="/docs" className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-8 py-3 rounded-lg transition-colors w-full sm:w-auto text-center">
                Read Docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 