'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, Terminal, Zap } from 'lucide-react';
import SwipeInterface from '@/components/SwipeInterface';

export default function DevPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-lg transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Back to Buildrs</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Developer Preview</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the future of developer collaboration. This is where magic happens.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-black border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <Code className="text-3xl text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
            <p className="text-gray-400">
              AI-powered algorithm that connects developers based on skills, interests, and project compatibility.
            </p>
          </div>

          <div className="bg-black border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-colors">
            <Terminal className="text-3xl text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Real-time Collaboration</h3>
            <p className="text-gray-400">
              Live coding sessions, instant messaging, and seamless project sharing with your team.
            </p>
          </div>

          <div className="bg-black border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-colors">
            <Zap className="text-3xl text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Performance Optimized</h3>
            <p className="text-gray-400">
              Built for speed with optimized rendering, lazy loading, and efficient state management.
            </p>
          </div>
        </div>

        {/* Swipe Interface Demo */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Try the Swipe Interface</h2>
            <p className="text-gray-400">
              Experience our innovative swipe-to-match system for developers and projects.
            </p>
          </div>
          
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <SwipeInterface mode="mixed" />
          </div>
        </div>

        {/* Development Status */}
        <div className="bg-black border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Development Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-400">✅ Completed</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Frontend architecture & routing</li>
                <li>• Terminal UI design system</li>
                <li>• Responsive design & animations</li>
                <li>• Authentication UI components</li>
                <li>• Swipe interface prototype</li>
                <li>• Performance optimizations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">🚧 In Progress</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Backend API development</li>
                <li>• GitHub OAuth integration</li>
                <li>• Real-time messaging system</li>
                <li>• Database schema design</li>
                <li>• Matching algorithm</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-black border border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Join the Future?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Be among the first developers to experience the next generation of collaboration tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors">
                Join Waitlist
              </Link>
              <Link href="/docs" className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-8 py-3 rounded-lg transition-colors">
                Read Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 