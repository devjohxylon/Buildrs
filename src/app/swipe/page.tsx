'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Terminal, 
  ArrowRight,
  Code
} from 'lucide-react';

const funnyCommands = [
  { cmd: 'scan_developers --quality=high', response: 'Found 3 developers who actually comment their code!' },
  { cmd: 'check_commit_messages', response: 'Warning: 47 developers detected using "fix bug" commits' },
  { cmd: 'git_rebase --knowledge', response: 'ERROR: Too many "it works on my machine" responses' },
  { cmd: 'find_documentation_readers', response: 'Found developer who actually reads documentation!' },
  { cmd: 'scan_unit_tests', response: 'Alert: Someone actually wrote unit tests!' },
  { cmd: 'check_stack_overflow_dependency', response: 'ERROR: Stack Overflow dependency too high' },
  { cmd: 'scan_variable_names', response: 'Found developer who uses proper variable names!' },
  { cmd: 'check_css_knowledge', response: 'Scanning for developers who know CSS without frameworks...' },
  { cmd: 'npm_audit --addiction', response: 'Warning: "npm install" addiction detected' },
  { cmd: 'find_code_explainers', response: 'Found developer who can explain their code!' },
  { cmd: 'check_friday_commits', response: 'Loading developers who don\'t commit on Fridays...' },
  { cmd: 'scan_quick_fixes', response: 'ERROR: Too many "quick fix" commits detected' },
  { cmd: 'typescript_audit', response: 'Found developer who actually uses TypeScript properly!' },
  { cmd: 'scan_readme_files', response: 'Scanning for developers who write README files...' },
  { cmd: 'check_api_documentation', response: 'Found 2 developers who document their APIs!' },
  { cmd: 'scan_todo_comments', response: 'Loading developers who don\'t use "TODO: fix later"...' },
  { cmd: 'check_works_for_me', response: 'ERROR: "Works for me" responses at critical levels' }
];

const BOOT_SEQUENCE = `Developer Discovery Terminal v1.0

[ OK ] Loading "hot developers in your area"...
[ WARN ] Connecting to GitHub API (looking for matches)...
[ ERROR ] Verifying commit history (no red flags please)...
[ OK ] Establishing secure chat channels...
[ FATAL ] System ready! Swipe right for collaboration...

login: developer
Password: ****** (definitely not 'password123')
`;

const funnyMessages = [
  '> Scanning for developers who actually comment their code...',
  '> Found 3 developers who use meaningful commit messages!',
  '> Warning: 47 developers detected using "fix bug" commits',
  '> Loading developers who know what "git rebase" means...',
  '> ERROR: Too many "it works on my machine" responses',
  '> Found developer who actually reads documentation!',
  '> Alert: Someone actually wrote unit tests!',
  '> Loading developers who don\'t copy-paste from Stack Overflow...',
  '> ERROR: Stack Overflow dependency too high',
  '> Found developer who uses proper variable names!',
  '> Scanning for developers who know CSS without frameworks...',
  '> Warning: "npm install" addiction detected',
  '> Found developer who can explain their code!',
  '> Loading developers who don\'t commit on Fridays...',
  '> ERROR: Too many "quick fix" commits detected',
  '> Found developer who actually uses TypeScript properly!',
  '> Scanning for developers who write README files...',
  '> Found 2 developers who document their APIs!',
  '> Loading developers who don\'t use "TODO: fix later"...',
  '> ERROR: "Works for me" responses at critical levels'
];

export default function SwipePage() {
  const [terminalText, setTerminalText] = useState('');
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [lastTypedMessage, setLastTypedMessage] = useState<number>(-1);

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
      typeText(BOOT_SEQUENCE, 40).then(() => {
        setTimeout(() => {
          setIsBooting(false);
          setTerminalText('');
          setCurrentMessage(0);
        }, 1500);
      });
    }
  }, [isBooting, typeText]);

  // Boot sequence
  useEffect(() => {
    if (isBooting) {
      typeText(BOOT_SEQUENCE, 40).then(() => {
        setTimeout(() => {
          setIsBooting(false);
          setTerminalText('');
          setCurrentMessage(0);
        }, 1500);
      });
    }
  }, [isBooting, typeText]);

  // Funny messages cycle
  useEffect(() => {
    if (!isBooting && !isTyping && lastTypedMessage !== currentMessage) {
      const timer = setTimeout(() => {
        const message = funnyMessages[currentMessage];
        setLastTypedMessage(currentMessage);
        typeText(message, 100).then(() => {
          setTimeout(() => {
            setCurrentMessage((prev) => {
              const nextIndex = (prev + 1) % funnyMessages.length;
              return nextIndex;
            });
          }, 5000);
        });
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentMessage, isBooting, isTyping, funnyMessages, typeText, lastTypedMessage]);

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      {/* Header */}
      <div className="bg-black">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Developer Discovery
            </motion.h1>
            <motion.p 
              className="text-gray-400 text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Find amazing developers to collaborate with
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Animated Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black rounded-lg border border-gray-700 overflow-hidden mb-8"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-white" />
              <span className="text-white font-medium text-sm">Developer Discovery Terminal</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Animated Terminal Content */}
          <div className="p-4 font-mono text-xs">
            <div className="text-white min-h-[300px] max-h-[300px] overflow-y-auto">
              <pre className="whitespace-pre-line text-white">
                {terminalText}
              </pre>
              {!isBooting && (
                <div className="mt-2">
                  <div className="text-gray-500">user@buildrs:~/discovery$</div>
                  <div className="text-gray-400 ml-2">start_swipe --mode=profiles</div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Simple Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-12"
        >
          <div className="bg-black rounded-lg border border-gray-700 p-8 mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-red-400/10 rounded-full">
                <Heart size={32} className="text-red-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Find Your Perfect Match</h2>
                <p className="text-gray-400">Connect with developers who share your vision</p>
              </div>
            </div>
            
            <Link href="/swipe/interface">
              <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-lg border border-gray-700 transition-colors text-lg">
                Start Swiping
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-black rounded-lg border border-gray-700 overflow-hidden mb-8"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-white" />
              <span className="text-white font-medium text-sm">System Features</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-4 font-mono text-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-green-400 font-medium">Smart Matching:</span>
              <span className="text-white">AI-powered developer recommendations</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="text-blue-400 font-medium">Profile Verification:</span>
              <span className="text-white">Verified skills and experience</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span className="text-yellow-400 font-medium">Real-time Chat:</span>
              <span className="text-white">Instant messaging with collaborators</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span className="text-purple-400 font-medium">Skill Assessment:</span>
              <span className="text-white">Technical skill verification</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 