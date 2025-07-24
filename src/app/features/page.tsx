'use client';

import Link from 'next/link';
import { 
  Heart, 
  Code, 
  Users, 
  MessageSquare, 
  Star, 
  Zap,
  Shield,
  Globe,
  Terminal,
  GitBranch,
  Bell,
  TrendingUp,
  ArrowLeft,
  CheckCircle,
  Clock
} from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Smart Matching',
    description: 'AI-powered algorithm that connects you with developers and projects based on your skills, interests, and availability.',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    status: 'In Development'
  },
  {
    icon: Code,
    title: 'Project Discovery',
    description: 'Browse through open-source projects, hackathons, and collaborative opportunities.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    status: 'Coming Soon'
  },
  {
    icon: Users,
    title: 'Developer Profiles',
    description: 'Create detailed profiles showcasing your skills, experience, and portfolio to attract collaborators.',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    status: 'In Development'
  },
  {
    icon: MessageSquare,
    title: 'Built-in Chat',
    description: 'Communicate directly with potential collaborators through our secure messaging system.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    status: 'Coming Soon'
  },
  {
    icon: Star,
    title: 'Skill Verification',
    description: 'Verify your technical skills through our assessment system and earn badges for your expertise.',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    status: 'Planned'
  },
  {
    icon: Zap,
    title: 'Real-time Notifications',
    description: 'Get instant alerts for new matches, project updates, and collaboration opportunities.',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
    status: 'Coming Soon'
  },
  {
    icon: Shield,
    title: 'Secure Collaboration',
    description: 'Enterprise-grade security to protect your code, communications, and project data.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    status: 'In Development'
  },
  {
    icon: Globe,
    title: 'Global Community',
    description: 'Connect with developers from around the world, breaking down geographical barriers.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    status: 'Coming Soon'
  },
  {
    icon: Terminal,
    title: 'Terminal Integration',
    description: 'Seamless integration with your development workflow through our terminal interface.',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    status: 'Planned'
  },
  {
    icon: GitBranch,
    title: 'Git Integration',
    description: 'Connect your GitHub, GitLab, or Bitbucket repositories for seamless project management.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    status: 'In Development'
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Intelligent notifications that learn your preferences and only show relevant opportunities.',
    color: 'text-lime-400',
    bgColor: 'bg-lime-400/10',
    status: 'Coming Soon'
  },
  {
    icon: TrendingUp,
    title: 'Analytics & Insights',
    description: 'Track your collaboration success, skill growth, and project completion rates.',
    color: 'text-rose-400',
    bgColor: 'bg-rose-400/10',
    status: 'Planned'
  }
];

const developmentPhases = [
  { 
    phase: 'Alpha Development', 
    status: 'In Progress',
    features: ['Core swipe engine', 'Basic profiles', 'Authentication'],
    color: 'text-green-400',
    bgColor: 'bg-green-400/10'
  },
  { 
    phase: 'Beta Features', 
    status: 'Coming Soon',
    features: ['Chat system', 'Project creation', 'Advanced matching'],
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10'
  },
  { 
    phase: 'Launch Features', 
    status: 'Planned',
    features: ['Video calls', 'Payment integration', 'Mobile app'],
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10'
  }
];

export default function FeaturesPage() {
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Features</h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Everything you need to find collaborators, discover projects, and build amazing things together.
            </p>
          </div>

          {/* Development Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {developmentPhases.map((phase, index) => (
              <div key={index} className="p-4 bg-black rounded-lg border border-gray-700 text-center">
                <div className={`text-lg font-bold mb-2 ${phase.color}`}>{phase.phase}</div>
                <div className="text-sm text-gray-400 mb-3">{phase.status}</div>
                <div className="space-y-1">
                  {phase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="text-xs text-gray-500">• {feature}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Feature Roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-black rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                      <Icon size={20} className={feature.color} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg ${feature.color}`}>
                        {feature.title}
                      </h3>
                      <div className="text-xs text-gray-500 mt-1">{feature.status}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Status */}
        <div className="mb-12">
          <div className="terminal p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Current Development Status</h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-sm">Core platform architecture completed</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-yellow-400" />
                <span className="text-sm">Authentication system in final testing</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-yellow-400" />
                <span className="text-sm">Swipe interface and matching algorithm development</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-blue-400" />
                <span className="text-sm">Chat system and project tools planned</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-black rounded-lg border border-gray-700 p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-white font-medium">Video Calls</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-white font-medium">Code Review Tools</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-white font-medium">Project Templates</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-white font-medium">Time Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-white font-medium">Payment Integration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-white font-medium">Mobile App</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="terminal p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Join the waitlist and be among the first to try Buildrs when we launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors w-full sm:w-auto text-center">
                Join Waitlist
              </Link>
              <Link href="/docs" className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-8 py-3 rounded-lg border border-gray-700 transition-colors w-full sm:w-auto text-center">
                Read Docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 