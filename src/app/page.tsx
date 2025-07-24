'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Terminal, Users, Code, Zap } from 'lucide-react';

const TYPING_SEQUENCE = `$ buildrs --version
Buildrs CLI v0.1.0-alpha

$ buildrs status
[ OK ] Coffee levels: MAXIMUM
[ WARN ] Sleep schedule: 404 NOT FOUND
[ ERROR ] Git commit message: "fix stuff" (really?)

$ buildrs swipe
[ OK ] Swipe interface loaded
[ INFO ] 🐛 Bug count: Still too many (it's a feature!)

Welcome to Buildrs! Where bugs become features ✨

$ _`

export default function HomePage() {
  const [terminalText, setTerminalText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(true);

  const typeText = useCallback(async (text: string, speed: number = 80) => {
    setIsTyping(true);
    setTerminalText('');
    for (let i = 0; i <= text.length; i++) {
      setTerminalText(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    setIsTyping(false);
  }, []);

  useEffect(() => {
    typeText(TYPING_SEQUENCE, 40);
  }, [typeText]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-gray-800 lg:ml-64">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Buildrs</h1>
              <div className="text-xs px-2 py-1 bg-blue-600 text-white rounded">ALPHA</div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`text-xs px-2 py-1 rounded border ${
                isBackendOnline
                  ? 'text-green-400 border-green-400/30 bg-green-400/10'
                  : 'text-red-400 border-red-400/30 bg-red-400/10'
              }`}>
                Server {isBackendOnline ? 'ONLINE' : 'OFFLINE'}
              </div>
              <Link href="/dev" className="text-blue-400 hover:text-blue-300 text-sm">
                Dev Preview
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Where Developers
              <br />
              <span className="text-blue-400">Connect & Build</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
              The next generation platform for developer collaboration, project discovery, and team building.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/swipe"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors flex items-center justify-center gap-2"
              >
                Start Swiping
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/docs"
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
              >
                Read Docs
              </Link>
            </div>
          </div>

          {/* Terminal Demo */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="terminal h-64 sm:h-72 lg:h-80">
              <div className="terminal-content p-4 sm:p-6 overflow-y-auto h-full">
                <div className="terminal-text text-sm sm:text-base">
                  <div className="text-white whitespace-pre-line font-mono">
                    {terminalText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Built for Developers</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to find collaborators, discover projects, and build amazing things together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors">
              <Terminal className="text-3xl text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
              <p className="text-gray-400">
                AI-powered algorithm that connects developers based on skills, interests, and project compatibility.
              </p>
            </div>

            <div className="bg-black border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-colors">
              <Users className="text-3xl text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Real-time Collaboration</h3>
              <p className="text-gray-400">
                Live coding sessions, instant messaging, and seamless project sharing with your team.
              </p>
            </div>

            <div className="bg-black border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-colors">
              <Code className="text-3xl text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Project Discovery</h3>
              <p className="text-gray-400">
                Find exciting projects, contribute to open source, or showcase your own work to the community.
              </p>
            </div>

            <div className="bg-black border border-gray-700 rounded-lg p-6 hover:border-orange-500 transition-colors">
              <Zap className="text-3xl text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Performance Optimized</h3>
              <p className="text-gray-400">
                Built for speed with optimized rendering, lazy loading, and efficient state management.
              </p>
            </div>

            <div className="bg-black border border-gray-700 rounded-lg p-6 hover:border-pink-500 transition-colors">
              <Github className="text-3xl text-pink-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">GitHub Integration</h3>
              <p className="text-gray-400">
                Seamless integration with GitHub for authentication, project imports, and collaboration.
              </p>
            </div>

            <div className="bg-black border border-gray-700 rounded-lg p-6 hover:border-cyan-500 transition-colors">
              <div className="text-3xl text-cyan-400 mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Mobile Ready</h3>
              <p className="text-gray-400">
                Responsive design that works perfectly on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-black border border-gray-700 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Future?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Be among the first developers to experience the next generation of collaboration tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/swipe"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Start Building
              </Link>
              <Link
                href="/docs"
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 Buildrs. Built with ❤️ for developers.
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/docs" className="text-gray-400 hover:text-white text-sm">
                Docs
              </Link>
              <Link href="/roadmap" className="text-gray-400 hover:text-white text-sm">
                Roadmap
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
