'use client';

import { useState, useEffect, useCallback } from 'react';
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://buildrs-production.up.railway.app';

const BOOT_SEQUENCE = `Buildrs OS v0.1.0-probably-works

[ OK ] Loading coffee.exe...
[ OK ] Warming up rubber duck...
[ WARN ] Stackoverflow.com: CONNECTION CRITICAL
[ OK ] npm install anxiety

login: dev
Password: hunter2

Welcome to Buildrs! Where bugs become features ✨

dev@chaos:~$ `;

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
  const [isTyping, setIsTyping] = useState(false);

  const funnyMessages = [
    "// Adding actual features soon...",
    "console.log('Why is this not working?');", 
    "git commit -m 'It works on my machine 🤷‍♂️'",
    "// This code was written at 3AM, good luck",
    "const coffee = 'required';",
    "// I'll refactor this later (famous last words)",
    "rm -rf node_modules && npm install // classic",
    "git push --force // YOLO",
    "// Don't judge me, I'll fix this before launch",
    "npm install left-pad // the good old days",
    "git commit -m 'fixed bug' // what bug? nobody knows",
    "// If you're reading this, I'm sorry",
  ];

  const typeText = useCallback(async (text: string, speed: number = 80) => {
    setIsTyping(true);
    for (let i = 0; i <= text.length; i++) {
      setTerminalText(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    setIsTyping(false);
  }, []);

  // Boot sequence
  useEffect(() => {
    if (isBooting) {
      typeText(BOOT_SEQUENCE, 60).then(() => {
        setTimeout(() => {
          setIsBooting(false);
          setTerminalText('');
        }, 2000);
      });
    }
  }, [isBooting, typeText]);

  // Funny messages
  useEffect(() => {
    if (!isBooting && !isTyping) {
      const message = funnyMessages[currentMessage];
      typeText(message, 150).then(() => {
        const timeout = setTimeout(() => {
          if (!isBooting) {
            setCurrentMessage((prev) => (prev + 1) % funnyMessages.length);
          }
        }, 8000);
        return () => clearTimeout(timeout);
      });
    }
  }, [currentMessage, isBooting, isTyping, funnyMessages, typeText]);

  // Cursor blink
  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  // Fetch waitlist count
  useEffect(() => {
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
      console.error('Error details:', error);
      setIsBackendOnline(false);
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
      console.error('Failed to submit waitlist entry:', error);
      console.error('Error details:', error);
      setIsBackendOnline(false);
      if (!isBackendOnline) {
        alert("We're having connection issues. Please try again later!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixBackground />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <motion.header
          className="flex justify-between items-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-2xl font-bold terminal-text">BUILDRS</div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/features" className="hover:text-blue-400 transition-colors terminal-text">Features</Link>
            <Link href="/docs" className="hover:text-blue-400 transition-colors terminal-text">Docs</Link>
            <Link href="/roadmap" className="hover:text-blue-400 transition-colors terminal-text">Roadmap</Link>
            <Link href="/community" className="hover:text-blue-400 transition-colors terminal-text">Community</Link>
          </nav>
        </motion.header>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Hero content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <h1 className="text-7xl md:text-8xl font-bold mb-8 title-text leading-tight">
                BUILDRS
              </h1>
              
              <p className="text-base mb-12 text-gray-300 leading-relaxed font-medium max-w-xl">
                Where developers swipe right on their next collaboration. 
                <br />
                A swipe platform for finding coding partners. We're building the place where 
                developers discover projects, connect with builders, and create something amazing together.
              </p>

              {/* Developer status */}
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
            </div>
          </motion.div>

          {/* Right side - Terminal and waitlist */}
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

            {/* Waitlist form */}
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
                </form>
              ) : (
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <div className="text-white font-bold text-lg mb-2">You're in! 🎉</div>
                  <div className="text-gray-300 text-base">We'll email you when we launch.</div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex items-center justify-between text-sm terminal-text">
                  <span className="text-gray-400">Developers waiting:</span>
                  <span className="text-white font-bold">{waitlistCount > 0 ? waitlistCount : '...'}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-gray-400 text-xs">
                    {isBackendOnline ? 'System online' : 'System offline'}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mt-24 grid md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/swipe" className="terminal p-6 hover:border-blue-500 transition-colors group">
            <Users className="w-8 h-8 mb-4 text-blue-400 group-hover:text-blue-300" />
            <h3 className="text-white font-bold mb-2 terminal-text">Start Swiping</h3>
            <p className="text-gray-300 text-sm">Browse developers and projects</p>
          </Link>
          
          <Link href="/dev" className="terminal p-6 hover:border-purple-500 transition-colors group">
            <Code className="w-8 h-8 mb-4 text-purple-400 group-hover:text-purple-300" />
            <h3 className="text-white font-bold mb-2 terminal-text">Dev Preview</h3>
            <p className="text-gray-300 text-sm">Try the demo interface</p>
          </Link>
          
          <Link href="/features" className="terminal p-6 hover:border-green-500 transition-colors group">
            <Zap className="w-8 h-8 mb-4 text-green-400 group-hover:text-green-300" />
            <h3 className="text-white font-bold mb-2 terminal-text">Features</h3>
            <p className="text-gray-300 text-sm">See what we're building</p>
          </Link>
          
          <Link href="/community" className="terminal p-6 hover:border-yellow-500 transition-colors group">
            <Coffee className="w-8 h-8 mb-4 text-yellow-400 group-hover:text-yellow-300" />
            <h3 className="text-white font-bold mb-2 terminal-text">Community</h3>
            <p className="text-gray-300 text-sm">Join other developers</p>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-24 pt-12 border-t border-gray-800 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-gray-400 text-sm terminal-text mb-4">
            Made by developers, for developers ☕
          </div>
          <div className="flex justify-center space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link>
            <a href="https://github.com/devjohxylon/Buildrs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">GitHub</a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
