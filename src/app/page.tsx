'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Terminal, 
  Code, 
  Users, 
  Zap, 
  ArrowRight, 
  Github, 
  Activity,
  Database,
  Shield,
  Mail,
  CheckCircle,
  Coffee,
  Cpu,
  Brain,
  Rocket,
  Lock
} from 'lucide-react';
import MatrixBackground from '@/components/MatrixBackground';

const API_BASE_URL = 'https://buildrs-production.up.railway.app';

export default function Home() {
  const [terminalText, setTerminalText] = useState('');
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [devName, setDevName] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [isBackendOnline, setIsBackendOnline] = useState(true);

  const funnyMessages = [
    "// TODO: Add actual features",
    "console.log('Why is this not working?');", 
    "git commit -m 'It works on my machine 🤷‍♂️'",
    "// This code was written at 3AM, good luck",
    "const coffee = 'required';",
    "// I'll refactor this later (narrator: they never did)",
    "rm -rf node_modules && npm install // classic",
    "git push --force // YOLO",
    "// Don't judge me, I'll fix this before launch",
    "sudo rm -rf / --no-preserve-root // just kidding",
    "npm install left-pad // the good old days",
    "git commit -m 'fixed bug' // what bug? nobody knows",
    "// If you're reading this, I'm sorry",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isBooting) {
        setCurrentMessage((prev) => (prev + 1) % funnyMessages.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isBooting]);

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  useEffect(() => {
    // Fetch waitlist count on component mount
    fetchWaitlistCount();
  }, []);

  const fetchWaitlistCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/waitlist/count`);
      if (response.ok) {
        const data = await response.json();
        setWaitlistCount(data.count);
        setIsBackendOnline(true);
      } else {
        setIsBackendOnline(false);
      }
    } catch (error) {
      console.error('Failed to fetch waitlist count:', error);
      setIsBackendOnline(false);
      // Keep count at 0 if API fails
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setIsBackendOnline(true);
        // Refresh the waitlist count after successful submission
        fetchWaitlistCount();
        setTimeout(() => {
          setEmail('');
          setDevName('');
          setIsSubmitted(false);
        }, 5000);
      } else {
        const error = await response.json();
        if (error.detail === "Email already on waitlist") {
          alert("You're already on the waitlist! 🎉");
        } else {
          alert("Oops! Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error('Waitlist submission failed:', error);
      setIsBackendOnline(false);
      if (!isBackendOnline) {
        alert("Backend is currently offline. We're working on it! 🚧");
      } else {
        alert("Network error. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <MatrixBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-gray-400 font-mono text-sm">
              buildrs@terminal:~$
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-gray-500 font-mono text-xs px-2 py-1 bg-gray-900 rounded border border-gray-700">
              v0.1.0-alpha
            </span>
          </div>
        </div>
      </nav>

      {/* Hero - More organic layout */}
      <section className="pt-24 pb-32 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Main content - asymmetric */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <motion.div
                className="lg:col-span-1 mt-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-yellow-400 text-lg mb-6 terminal-text font-semibold">
                  // Currently brewing something special...
                </div>
                
                <h1 className="text-7xl md:text-8xl font-bold mb-8 title-text leading-tight">
                  BUILDRS
                </h1>
                
                <p className="text-base mb-12 text-gray-300 leading-relaxed font-medium max-w-xl">
                  Where developers swipe right on their next collaboration. 
                  <br />
                  A swipe platform for finding coding partners. We're building the place where 
                  developers discover projects, connect with builders, and create something amazing together.
                </p>

                {/* Fun developer joke - aligned with right terminals */}
                <div className="terminal p-9 max-w-full mt-8">
                  <div className="terminal-content">
                    <div className="text-gray-400 text-base mb-5 terminal-text font-semibold">
                      // Current developer status
                    </div>
                    <div className="space-y-4 text-base terminal-text">
                      <div className="flex items-center gap-4">
                        <span className="text-green-400 text-lg">●</span>
                        <span className="text-white font-medium">Coffee levels: MAXIMUM</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-yellow-400 text-lg">●</span>
                        <span className="text-white font-medium">Rubber duck debugger: ON STANDBY</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-red-400 text-lg">●</span>
                        <span className="text-white font-medium">Sleep schedule: 404 NOT FOUND</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-purple-400 text-lg">●</span>
                        <span className="text-white font-medium">Bug count: It's not a bug, it's a feature</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Terminal - positioned differently */}
              <motion.div
                className="lg:col-span-1 relative mt-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="terminal h-96 mb-6">
                  <div className="terminal-content">
                    {isBooting ? (
                      <div className="terminal-text text-base">
                        <div className="text-white whitespace-pre-line">
                          {terminalText}
                          <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▋</span>
                        </div>
                      </div>
                    ) : (
                      <div className="terminal-text text-base">
                        <div className="text-green-400">dev@buildrs</div>
                        <div className="text-white whitespace-pre-line mt-2">
                          {terminalText}
                          <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▋</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating waitlist form */}
                <motion.div
                  className="terminal p-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-white terminal-text font-semibold mb-8 flex items-center gap-3 text-lg">
                    <Mail size={20} />
                    Get early access
                  </div>
                  
                  {!isSubmitted ? (
                    <form onSubmit={handleWaitlistSubmit} className="space-y-5">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white terminal-text text-base focus:border-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full btn btn-primary text-base py-3 font-semibold"
                        disabled={!email}
                      >
                        JOIN WAITLIST
                      </button>
                      <div className="text-center pt-2">
                        <div className="flex items-baseline justify-center gap-2 text-base terminal-text">
                          <span className="text-yellow-400 font-bold text-lg">
                            {isBackendOnline ? waitlistCount.toLocaleString() : '---'}
                          </span>
                          <span className="text-gray-400 font-medium">
                            on waitlist {!isBackendOnline && '(offline)'}
                          </span>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                    >
                      <CheckCircle size={32} className="text-green-400 mx-auto mb-3" />
                      <div className="text-green-400 font-bold terminal-text text-base">
                        You're in! 🎉
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the scenes - asymmetric section */}
      <section className="py-32 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            
            {/* Left: Title and description */}
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold mb-6 title-text">
                Building in
                <br />
                Public
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8 text-lg font-medium">
                Follow our development journey. Every commit, every decision, 
                every debugging session at 3am.
              </p>
              <a href="https://github.com/devjohxylon/Buildrs" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-secondary flex items-center gap-3 px-6 py-3 font-semibold">
                  <Github size={18} />
                  Follow Progress
                </button>
              </a>
            </div>

            {/* Right: Development log */}
            <div className="lg:col-span-2">
              <div className="terminal p-8">
                <div className="space-y-4 text-base">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 w-16 font-mono text-sm">1d ago</span>
                    <span className="text-green-400 text-lg">●</span>
                    <span className="text-white font-medium">Completed landing page design</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 w-16 font-mono text-sm">2d ago</span>
                    <span className="text-green-400 text-lg">●</span>
                    <span className="text-white font-medium">Implemented terminal UI theme</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 w-16 font-mono text-sm">3d ago</span>
                    <span className="text-yellow-400 text-lg">●</span>
                    <span className="text-white font-medium">Started swipe interface components</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 w-16 font-mono text-sm">1w ago</span>
                    <span className="text-blue-400 text-lg">●</span>
                    <span className="text-white font-medium">Set up Next.js project structure</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 w-16 font-mono text-sm">Next</span>
                    <span className="text-gray-400 text-lg">○</span>
                    <span className="text-gray-400 font-medium">Backend API development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="text-xl font-bold terminal-text mb-4">BUILDRS</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Where developers swipe right on their next collaboration. 
                Connect, code, and build amazing things together.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-4 terminal-text">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/roadmap" className="text-gray-400 hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4 terminal-text">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/community" className="text-gray-400 hover:text-white transition-colors">Community Guidelines</a></li>
                <li><a href="/security" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-white font-semibold mb-4 terminal-text">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/devjohxylon/Buildrs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
                <li><a href="/discord" className="text-gray-400 hover:text-white transition-colors">Discord</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="/support" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm terminal-text">
              © 2025 Buildrs. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm terminal-text mt-4 md:mt-0">
              Made with ☕ by developers, for developers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
