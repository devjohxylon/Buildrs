'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { 
  Book, 
  Users, 
  Code, 
  MessageSquare, 
  Star, 
  Zap, 
  ArrowLeft, 
  GitBranch, 
  Heart, 
  Terminal,
  Github,
  Coffee,
  Bug,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

const DOCS_SEQUENCE = `Buildrs CLI v0.1.0-alpha

[ OK ] Loading developer documentation...
[ INFO ] Coffee levels: MAXIMUM
[ WARN ] Sleep schedule: 404 NOT FOUND
[ OK ] npm install buildrs-cli
[ OK ] ✓ Buildrs CLI installed successfully
[ OK ] buildrs auth
[ OK ] ✓ Authentication successful
[ OK ] buildrs swipe
[ WARN ] ⚠️  No coffee detected. Please brew some before continuing.

Welcome to Buildrs! Where bugs become features ✨
`

export default function DocsPage() {
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
    typeText(DOCS_SEQUENCE, 40);
  }, [typeText]);

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Developer Docs</h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              The unofficial guide to not building alone
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Quick Start */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Quick Start</h2>
          
          <div className="terminal h-64 sm:h-80 lg:h-96 mb-8">
            <div className="terminal-content">
              <div className="terminal-text text-sm sm:text-base">
                <div className="text-white whitespace-pre-line">
                  {terminalText}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-black rounded-lg border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Coffee size={20} className="text-orange-400" />
                <h3 className="text-lg font-bold text-orange-400">Prerequisites</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• A GitHub account (because Git is life)</li>
                <li>• Basic knowledge of JavaScript/TypeScript</li>
                <li>• A project idea or willingness to join one</li>
                <li>• Coffee (lots of it)</li>
                <li>• A rubber duck for debugging</li>
              </ul>
            </div>

            <div className="p-6 bg-black rounded-lg border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Bug size={20} className="text-red-400" />
                <h3 className="text-lg font-bold text-red-400">Known Issues</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Sometimes matches people you don't want to work with</li>
                <li>• May cause excessive coffee consumption</li>
                <li>• Could lead to 3AM coding sessions</li>
                <li>• Might make you question your life choices</li>
                <li>• Will definitely break your sleep schedule</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Core Concepts */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Core Concepts</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-black rounded-lg border border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <Heart size={20} className="text-blue-400" />
                <h3 className="text-lg font-bold text-blue-400">The Swipe Algorithm</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Our matching algorithm is powered by advanced AI (Actually Intelligent coffee consumption). 
                It analyzes your GitHub activity, coding patterns, and sleep schedule to find the perfect collaborator.
              </p>
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <div className="text-xs text-gray-400 mb-2">Algorithm Logic:</div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>if (coffeeLevel &gt; 0.8 &amp;&amp; sleepLevel &lt; 0.3) {'{'}</div>
                  <div className="ml-4">return "Perfect match for late-night coding"</div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-black rounded-lg border border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <GitBranch size={20} className="text-green-400" />
                <h3 className="text-lg font-bold text-green-400">Project Collaboration</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Buildrs integrates with your existing Git workflow. No need to change your habits - 
                just add collaborators and watch the magic happen.
              </p>
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <div className="text-xs text-gray-400 mb-2">Git Commands:</div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>git add .</div>
                  <div>git commit -m "Fixed the thing that was broken"</div>
                  <div>git push origin main</div>
                  <div># Now your collaborator can see your genius</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-black rounded-lg border border-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare size={20} className="text-purple-400" />
                <h3 className="text-lg font-bold text-purple-400">Communication Protocol</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Built-in chat system with support for code snippets, file sharing, and the occasional 
                existential crisis about why your code isn't working.
              </p>
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <div className="text-xs text-gray-400 mb-2">Chat Features:</div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>• Code syntax highlighting</div>
                  <div>• File uploads (max 50MB, because we're not animals)</div>
                  <div>• Emoji reactions for emotional support</div>
                  <div>• "It works on my machine" button</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">API Reference</h2>
          
          <div className="terminal p-6 sm:p-8 bg-black">
            <h3 className="text-xl font-bold mb-6 text-white">Authentication</h3>
            <div className="space-y-4 text-sm">
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <div className="text-blue-400 mb-2">POST /api/auth/github</div>
                <div className="text-gray-400 text-xs">Authenticate with GitHub OAuth</div>
                <div className="text-gray-500 text-xs mt-2">Returns: JWT token and user data</div>
              </div>
              
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <div className="text-blue-400 mb-2">GET /api/user/profile</div>
                <div className="text-gray-400 text-xs">Get current user profile</div>
                <div className="text-gray-500 text-xs mt-2">Headers: Authorization: Bearer {`<token>`}</div>
              </div>
              
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <div className="text-blue-400 mb-2">POST /api/swipe</div>
                <div className="text-gray-400 text-xs">Swipe on a profile or project</div>
                <div className="text-gray-500 text-xs mt-2">Body: {"{ direction: 'left' | 'right', targetId: string }"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-green-400/10 border border-green-400/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <span className="text-green-400 font-medium">Do</span>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Write clear commit messages</li>
                  <li>• Test your code before pushing</li>
                  <li>• Communicate with your team</li>
                  <li>• Take breaks when needed</li>
                  <li>• Keep your coffee cup full</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-400/10 border border-red-400/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-red-400" />
                  <span className="text-red-400 font-medium">Don't</span>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Push broken code to main</li>
                  <li>• Ignore code reviews</li>
                  <li>• Work 24/7 without sleep</li>
                  <li>• Forget to backup your work</li>
                  <li>• Run out of coffee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Troubleshooting</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-black rounded-lg border border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-4">Common Issues</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-white font-medium mb-2">Problem: No matches found</div>
                  <div className="text-gray-300 text-sm">Solution: Try swiping more, or check if you're being too picky. Also, make sure your profile is complete.</div>
                </div>
                <div>
                  <div className="text-white font-medium mb-2">Problem: Chat not working</div>
                  <div className="text-gray-300 text-sm">Solution: Check your internet connection. If that doesn't work, try turning it off and on again.</div>
                </div>
                <div>
                  <div className="text-white font-medium mb-2">Problem: Code won't compile</div>
                  <div className="text-gray-300 text-sm">Solution: Have you tried adding more coffee? Sometimes the solution is just one more cup away.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div>
          <div className="terminal p-6 sm:p-8 text-center bg-black">
            <Github className="text-4xl text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Ready to Build?</h2>
            <p className="text-gray-300 mb-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Stop building alone. Join the waitlist and find your next collaborator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors w-full sm:w-auto text-center">
                Join Waitlist
              </Link>
              <Link href="/features" className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors w-full sm:w-auto text-center">
                View Features
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 