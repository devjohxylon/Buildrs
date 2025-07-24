'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Mail,
  CheckCircle
} from 'lucide-react';
import MatrixBackground from '@/components/MatrixBackground';
import DevPreviewModal from '@/components/DevPreviewModal';

// Use environment variable with fallback for local development
const API_BASE_URL = (() => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  const fallbackUrl = 'https://buildrs-production.up.railway.app';
  
  if (!envUrl) {
    console.log('⚠️ NEXT_PUBLIC_API_URL not found, using fallback');
    return fallbackUrl;
  }
  
  // Ensure the URL has a protocol
  if (!envUrl.startsWith('http://') && !envUrl.startsWith('https://')) {
    console.log('⚠️ API URL missing protocol, adding https://');
    return `https://${envUrl}`;
  }
  
  return envUrl;
})();

// Debug logging for environment
if (typeof window !== 'undefined') {
  console.log('🔧 Environment setup:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- NEXT_PUBLIC_API_URL from env:', process.env.NEXT_PUBLIC_API_URL);
  console.log('- Final API_BASE_URL:', API_BASE_URL);
  console.log('- Type of API_BASE_URL:', typeof API_BASE_URL);
}

const BOOT_SEQUENCE = `Buildrs OS v0.1.0-probably-broken

[ OK ] Loading existential dread...
[ WARN ] Semicolon missing (panic mode activated)
[ ERROR ] 404: Motivation not found
[ OK ] npm install therapy --save-dev
[ FATAL ] It works on my machine.exe

login: developer
Password: ****** (definitely not 'hunter2')

Welcome to Buildrs! Where bugs become features ✨
`

export default function HomePage() {
  const [terminalText, setTerminalText] = useState('');
  const [currentMessage, setCurrentMessage] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [isBackendOnline, setIsBackendOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cyclingRef = useRef(false);
  const [showDevModal, setShowDevModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenDev = sessionStorage.getItem('hasSeenDevModal');
      if (!hasSeenDev) {
        setShowDevModal(true);
        sessionStorage.setItem('hasSeenDevModal', 'true');
      }
    }
  }, []);

  const funnyMessages = useMemo(() => [
    "console.log('Why is this not working?'); // narrator: it never worked", 
    "git commit -m 'It works on my machine 🤷‍♂️'",
    "// This code was written at 3AM during a caffeine crisis",
    "const coffee = require('sanity'); // module not found",
    "// I'll refactor this later (spoiler: I won't)",
    "rm -rf node_modules && npm install // the developer's prayer",
    "git push --force // living dangerously since 2009",
    "// Don't judge me, I'll fix this before prod... maybe",
    "npm install confidence // installation failed",
    "git commit -m 'fixed bug' // created 3 new ones",
    "// If you're reading this, send help (and snacks)",
    "while(true) { coffee++; sleep--; bugs *= 2; }",
    "try { code(); } catch(e) { console.log('not my problem'); }",
    "// Works perfectly! (terms and conditions may apply)",
    "git blame // it was definitely the intern",
    "npm audit fix --force // YOLO deployment strategy",
    "// Past me is an idiot, future me will fix this",
    "const deadline = new Date('never'); // seems legit",
    "console.log('Hello world!'); // still the hardest part",
    "// This function does... something. Probably important.",
    "git revert HEAD~47 // going back to when things worked",
    "// Note to self: stop coding while hungry",
    "import happiness from 'work-life-balance'; // 404 not found"
  ], []);

  const typeText = useCallback(async (text: string, speed: number = 80) => {
    setIsTyping(true);
    setTerminalText('');
    for (let i = 0; i <= text.length; i++) {
      setTerminalText(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    setIsTyping(false);
  }, []);

  // Boot sequence
  useEffect(() => {
    if (isBooting) {
      cyclingRef.current = true; // Prevent message cycling during boot
      typeText(BOOT_SEQUENCE, 40).then(() => {
        setTimeout(() => {
          setIsBooting(false);
          setTerminalText('');
          setCurrentMessage(0);
          // Don't reset cyclingRef here - let the message effect handle it
        }, 1500);
      });
    }
  }, [isBooting, typeText]);

  // Funny messages cycle - using ref to prevent infinite loops
  useEffect(() => {
    if (!isBooting && !isTyping) {
      // Always reset cycling state when starting a new cycle
      if (cyclingRef.current) {
        return; // Exit if already cycling
      }

      cyclingRef.current = true;

      const timer = setTimeout(() => {
        const message = funnyMessages[currentMessage];
        typeText(message, 100).then(() => {
          setTimeout(() => {
            setCurrentMessage((prev) => {
              const nextIndex = (prev + 1) % funnyMessages.length;
              console.log(`Moving from message ${prev} to ${nextIndex}`); // Debug log
              return nextIndex;
            });
            cyclingRef.current = false; // Allow next cycle
          }, 5000); // Reduced to 5 seconds
        });
      }, 2000); // Increased initial delay

      return () => {
        clearTimeout(timer);
        // Don't reset cyclingRef in cleanup, let the timeout handle it
      };
    }
  }, [currentMessage, isBooting, isTyping, funnyMessages, typeText]);

  // Cursor blink
  useEffect(() => {
    const cursorBlink = setInterval(() => {
      // setShowCursor(prev => !prev); // Removed as per edit hint
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  // Fetch waitlist count
  const fetchWaitlistCount = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${API_BASE_URL}/api/waitlist/count`, {
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
      } else {
        console.warn('Backend service unavailable, using fallback data');
        setIsBackendOnline(false);
        setWaitlistCount(123456); // Fallback count
      }
    } catch (error) {
      console.warn('Network error, using fallback data:', error);
      setIsBackendOnline(false);
      setWaitlistCount(123456); // Fallback count
    }
  };

  // Fetch waitlist count on mount
  useEffect(() => {
    fetchWaitlistCount();
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        // Refresh the count
        fetchWaitlistCount();
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        setError(errorData.message || 'Failed to join waitlist');
      }
    } catch (error) {
      console.warn('Network error during waitlist submission:', error);
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
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden lg:ml-64">
      <MatrixBackground />
      {showDevModal && <DevPreviewModal onClose={() => setShowDevModal(false)} />}
      
      {/* Mobile-optimized Navigation */}
      <nav className="fixed top-0 left-0 lg:left-64 right-0 z-50 bg-black/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-gray-400 font-mono text-sm">
              buildrs@terminal:~$
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-gray-500 font-mono text-xs px-2 py-1 bg-gray-900 rounded border border-gray-700">
              v0.1.0-alpha
            </span>
            <div className={`text-xs px-2 py-1 rounded border ${
              isBackendOnline 
                ? 'text-green-400 border-green-400/30 bg-green-400/10' 
                : 'text-red-400 border-red-400/30 bg-red-400/10'
            }`}>
              Server {isBackendOnline ? 'ONLINE' : 'OFFLINE'}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile-first Hero Section */}
      <section className="pt-20 sm:pt-24 pb-16 sm:pb-32 px-4 sm:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Mobile-optimized layout */}
            <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start lg:space-y-0">
              
              {/* Main content - mobile-first */}
              <motion.div
                className="order-2 lg:order-1 lg:mt-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center lg:text-left">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 title-text leading-tight">
                    BUILDRS
                  </h1>
                  
                  <p className="text-sm sm:text-base mb-8 sm:mb-12 text-gray-300 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                    Where developers swipe right on their next collaboration. 
                    <br className="hidden sm:block" />
                    The developer community for finding projects, teammates, and avoiding solo debugging sessions. 
                    Swipe, browse, connect, build.
                  </p>

                  {/* Mobile-optimized status section */}
                  <div className="terminal p-4 sm:p-6 lg:p-9 mt-6 sm:mt-8">
                    <div className="terminal-content">
                      <div className="space-y-2 sm:space-y-4 text-sm sm:text-base terminal-text">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="text-green-400 text-base sm:text-lg">●</span>
                          <span className="text-white font-medium">Coffee levels: MAXIMUM</span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="text-yellow-400 text-base sm:text-lg">●</span>
                          <span className="text-white font-medium">Rubber duck debugger: ON STANDBY</span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="text-red-400 text-base sm:text-lg">●</span>
                          <span className="text-white font-medium">Sleep schedule: 404 NOT FOUND</span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="text-purple-400 text-base sm:text-lg">●</span>
                          <span className="text-white font-medium">Bug count: It&apos;s not a bug, it&apos;s a feature</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Terminal and form - mobile-first */}
              <motion.div
                className="order-1 lg:order-2 lg:mt-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Mobile-optimized terminal */}
                <div className="terminal h-64 sm:h-80 lg:h-96 mb-4 sm:mb-6">
                  <div className="terminal-content">
                    {isBooting ? (
                      <div className="terminal-text text-sm sm:text-base">
                        <div className="text-white whitespace-pre-line">
                          {terminalText}
                        </div>
                      </div>
                    ) : (
                      <div className="terminal-text text-sm sm:text-base">
                        <div className="text-green-400">dev@buildrs</div>
                        <div className="text-white whitespace-pre-line mt-2">
                          {terminalText}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile-optimized waitlist form */}
                <motion.div
                  className="terminal p-6 sm:p-8 lg:p-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-white terminal-text font-semibold mb-6 sm:mb-8 flex items-center gap-3 text-base sm:text-lg">
                    <Mail size={20} className="sm:w-5 sm:h-5" />
                    Get early access
                  </div>
                  
                  {error && (
                    <div className="mb-4 p-3 border border-red-400/30 bg-red-400/10 rounded text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  
                  {!isSubmitted ? (
                    <form onSubmit={handleWaitlistSubmit} className="space-y-4 sm:space-y-5">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(null);
                        }}
                        required
                        disabled={isSubmitting}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 sm:py-4 text-white terminal-text text-sm sm:text-base focus:border-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <button
                        type="submit"
                        className="w-full btn btn-primary text-sm sm:text-base py-3 sm:py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                        disabled={!email || isSubmitting}
                      >
                        {isSubmitting ? 'JOINING...' : 'JOIN WAITLIST'}
                      </button>
                      <div className="text-center pt-2">
                        <div className="flex items-baseline justify-center gap-2 text-sm sm:text-base terminal-text">
                          <span className="text-yellow-400 font-bold text-base sm:text-lg">
                            {isBackendOnline ? waitlistCount.toLocaleString() : '123,456'}
                          </span>
                          <span className="text-gray-400 font-medium">
                            on waitlist {!isBackendOnline && '(offline mode)'}
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
                      <CheckCircle size={32} className="sm:w-8 sm:h-8 text-green-400 mx-auto mb-3" />
                      <div className="text-green-400 font-bold terminal-text text-sm sm:text-base">
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

      {/* Mobile-optimized "Building in Public" section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-16 lg:items-start lg:space-y-0">
            
            {/* Mobile-first title and description */}
            <div className="lg:col-span-1 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 title-text">
                Building in
                <br />
                Public
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg font-medium">
                Follow our development journey. Every commit, every decision, 
                every debugging session at 3am.
              </p>
              <a href="https://github.com/devjohxylon/Buildrs" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-secondary flex items-center gap-3 px-4 sm:px-6 py-3 font-semibold mx-auto lg:mx-0 touch-manipulation">
                  <Github size={18} className="sm:w-[18px] sm:h-[18px]" />
                  Follow Progress
                </button>
              </a>
            </div>
            
            {/* Mobile-optimized development log */}
            <div className="lg:col-span-2">
              <div className="terminal p-4 sm:p-6 lg:p-8">
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-gray-400 w-12 sm:w-16 font-mono text-xs sm:text-sm">1d ago</span>
                    <span className="text-green-400 text-base sm:text-lg">●</span>
                    <span className="text-white font-medium">Completed landing page design</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-gray-400 w-12 sm:w-16 font-mono text-xs sm:text-sm">2d ago</span>
                    <span className="text-green-400 text-base sm:text-lg">●</span>
                    <span className="text-white font-medium">Implemented terminal UI theme</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-gray-400 w-12 sm:w-16 font-mono text-xs sm:text-sm">3d ago</span>
                    <span className="text-yellow-400 text-base sm:text-lg">●</span>
                    <span className="text-white font-medium">Started swipe interface components</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-gray-400 w-12 sm:w-16 font-mono text-xs sm:text-sm">1w ago</span>
                    <span className="text-blue-400 text-base sm:text-lg">●</span>
                    <span className="text-white font-medium">Set up Next.js project structure</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-gray-400 w-12 sm:w-16 font-mono text-xs sm:text-sm">Next</span>
                    <span className="text-gray-400 text-base sm:text-lg">○</span>
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
