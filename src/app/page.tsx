'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Mail,
  CheckCircle
} from 'lucide-react';
import MatrixBackground from '@/components/MatrixBackground';

// Use environment variable with fallback for local development
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
  const [isBooting, setIsBooting] = useState(true);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [isBackendOnline, setIsBackendOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const funnyMessages = useMemo(() => [
    "// TODO: Add actual features",
    "git commit -m 'It works on my machine 🤷‍♂️'",
    "{/* This code was written at 3AM, good luck */}",
    "const coffee = 'required';",
    "{/* I'll refactor this later (narrator: they never did) */}",
    "rm -rf node_modules && npm install // classic",
    "git push --force // YOLO",
    "{/* Don't judge me, I'll fix this before launch */}",
    "npm install left-pad // the good old days",
    "git commit -m 'fixed bug' // what bug? nobody knows",
    "{/* If you're reading this, I'm sorry */}",
  ], []);

  const typeText = useCallback(async (text: string, speed: number = 40) => {
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
      typeText(BOOT_SEQUENCE).then(() => {
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
      typeText(message, 100).then(() => {
        const timeout = setTimeout(() => {
          if (!isBooting) {
            setCurrentMessage((prev) => (prev + 1) % funnyMessages.length);
          }
        }, 5000);
        return () => clearTimeout(timeout);
      });
    }
  }, [currentMessage, isBooting, isTyping, funnyMessages, typeText]);

  // Cursor blink
  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  // Fetch waitlist count
  useEffect(() => {
    fetchWaitlistCount();
  }, []);

  const fetchWaitlistCount = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${API_BASE_URL}/waitlist/count`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setWaitlistCount(data.count || 0);
        setIsBackendOnline(true);
        setError(null);
      } else {
        setIsBackendOnline(false);
        setError('Backend service unavailable');
      }
    } catch (error) {
      setIsBackendOnline(false);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setError('Request timeout - backend may be offline');
        } else {
          setError('Network error - check your connection');
        }
      } else {
        setError('Unknown error occurred');
      }
      // Keep count at 0 if API fails
      setWaitlistCount(0);
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch(`${API_BASE_URL}/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setIsSubmitted(true);
        setIsBackendOnline(true);
        setError(null);
        // Refresh the waitlist count after successful submission
        await fetchWaitlistCount();
        setTimeout(() => {
          setEmail('');
          setIsSubmitted(false);
        }, 5000);
      } else {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        if (errorData.detail === "Email already on waitlist") {
          setError("You're already on the waitlist! 🎉");
        } else {
          setError(`Submission failed: ${errorData.detail || 'Please try again'}`);
        }
      }
    } catch (error) {
      setIsBackendOnline(false);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setError("Request timeout - our servers might be sleeping ☕");
        } else {
          setError("Network error - check your connection and try again");
        }
      } else {
        setError("Something went wrong - please try again later");
      }
    } finally {
      setIsSubmitting(false);
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
            <div className={`text-xs px-2 py-1 rounded border ${
              isBackendOnline 
                ? 'text-green-400 border-green-400/30 bg-green-400/10' 
                : 'text-red-400 border-red-400/30 bg-red-400/10'
            }`}>
              API {isBackendOnline ? 'ONLINE' : 'OFFLINE'}
            </div>
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
                  {/* Currently brewing something special... */}
                </div>
                
                <h1 className="text-7xl md:text-8xl font-bold mb-8 title-text leading-tight">
                  BUILDRS
                </h1>
                
                <p className="text-base mb-12 text-gray-300 leading-relaxed font-medium max-w-xl">
                  Where developers swipe right on their next collaboration. 
                  <br />
                  A swipe platform for finding coding partners. We&apos;re building the place where 
                  developers discover projects, connect with builders, and create something amazing together.
                </p>

                {/* Fun developer joke - aligned with right terminals */}
                <div className="terminal p-9 max-w-full mt-8">
                  <div className="terminal-content">
                    <div className="text-gray-400 text-base mb-5 terminal-text font-semibold">
                      {/* Current developer status */}
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
                        <span className="text-white font-medium">Bug count: It&apos;s not a bug, it&apos;s a feature</span>
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
                  
                  {error && (
                    <div className="mb-4 p-3 border border-red-400/30 bg-red-400/10 rounded text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  
                  {!isSubmitted ? (
                    <form onSubmit={handleWaitlistSubmit} className="space-y-5">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(null); // Clear error when user types
                        }}
                        required
                        disabled={isSubmitting}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white terminal-text text-base focus:border-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <button
                        type="submit"
                        className="w-full btn btn-primary text-base py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!email || isSubmitting}
                      >
                        {isSubmitting ? 'JOINING...' : 'JOIN WAITLIST'}
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
                        You&apos;re in! 🎉
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
    </div>
  );
}
