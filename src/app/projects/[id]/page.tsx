'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Heart, 
  Eye, 
  Users, 
  Clock, 
  Calendar,
  ExternalLink, 
  Github, 
  Globe,
  Briefcase,
  Code,
  Star,
  MessageSquare,
  Share2,
  Bookmark,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Info,
  TrendingUp,
  GitBranch,
  Activity,
  Target,
  Award,
  Zap,
  Shield,
  Users2,
  CalendarDays,
  BarChart3,
  MessageCircle,
  Send,
  Copy,
  Check,
  X,
  User,
  MessageCircle as MessageIcon
} from 'lucide-react';
import { FadeIn, SlideUp } from '@/lib/animations';

// Empty state data for production
const project: any = null;
const relatedProjects: any[] = [];

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: ''
  });

  const project = project; // Use the empty state project

  const relatedProjects = relatedProjects; // Use the empty state related projects

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle contact form submission
    console.log('Contacting creator:', contactForm);
    setShowContactModal(false);
    setContactForm({ subject: '', message: '' });
  };

  const handleViewProfile = () => {
    // Navigate to the creator's profile page
    // For now, we'll use a mock user ID based on the creator's name
    const creatorId = project?.createdBy.name.toLowerCase().replace(/\s+/g, '-') || 'user-1';
    window.open(`/profile/${creatorId}`, '_blank');
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white lg:ml-64 flex items-center justify-center">
        <div className="text-center">
          <Briefcase size={64} className="mx-auto text-gray-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-400 mb-2">Project Not Found</h1>
          <p className="text-gray-500 mb-6">The project you're looking for doesn't exist.</p>
          <Link href="/projects" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'Advanced': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Expert': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'In Progress': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Completed': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'Paused': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getProjectIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'web-app': return <Globe size={24} />;
      case 'mobile-app': return <Phone size={24} />;
      case 'desktop-app': return <Briefcase size={24} />;
      case 'game': return <Zap size={24} />;
      case 'api': return <GitBranch size={24} />;
      default: return <Code size={24} />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'team', label: 'Team', icon: Users2 },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'discussions', label: 'Discussions', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/projects" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Projects</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => copyToClipboard(window.location.href)}
                className={`p-2 rounded-lg border transition-colors flex items-center gap-2 ${
                  copied 
                    ? 'border-green-500 bg-green-500/10 text-green-400'
                    : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'
                }`}
                title="Copy link"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span className="text-sm">{copied ? 'Copied!' : 'Share'}</span>
              </button>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg border transition-colors ${
                  isBookmarked 
                    ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                    : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'
                }`}
                title="Bookmark project"
              >
                <Bookmark size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Project Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              {getProjectIcon(project.category)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
                <span className="px-3 py-1 rounded-lg text-sm font-medium border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  {project.category}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                {project.title}
              </h1>
              
              <div className="flex items-center gap-4 text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Created {formatDate(project.createdAt)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>Updated {formatDate(project.updatedAt)}</span>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Heart size={16} />
                    <span className="text-sm">Likes</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{project.likes}</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Eye size={16} />
                    <span className="text-sm">Views</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{project.views}</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Users size={16} />
                    <span className="text-sm">Applications</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{project.applications}</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <TrendingUp size={16} />
                    <span className="text-sm">Trending</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">#{Math.floor(Math.random() * 50) + 1}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 mb-8 bg-gray-900/50 rounded-lg p-1 border border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <tab.icon size={16} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Description */}
                  <div className="bg-black rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Info size={20} />
                      About This Project
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-black rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Code size={20} />
                      Technology Stack
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {project.techStack.map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-4 py-3 bg-gray-900 text-gray-300 rounded-lg border border-gray-600"
                        >
                          <Code size={16} className="text-blue-400" />
                          <span className="font-medium">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Looking For */}
                  <div className="bg-black rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Users size={20} />
                      We're Looking For
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.lookingFor.map((role, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-600">
                          <CheckCircle size={16} className="text-green-400" />
                          <span className="text-gray-300 font-medium">{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="bg-black rounded-xl p-6 border border-gray-700">
                      <h2 className="text-xl font-bold text-white mb-4">Tags</h2>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm border border-blue-500/30"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'team' && (
                <motion.div
                  key="team"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Project Creator */}
                  <div className="bg-black rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Award size={20} />
                      Project Creator
                    </h2>
                    <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">
                        {project.createdBy.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold text-lg">{project.createdBy.name}</div>
                        <div className="text-gray-400">{project.createdBy.role}</div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>Member since 2023</span>
                          <span>•</span>
                          <span>5 projects created</span>
                        </div>
                      </div>
                      <button 
                        onClick={handleViewProfile}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <User size={16} />
                        View Profile
                      </button>
                    </div>
                  </div>

                  {/* Team Stats */}
                  <div className="bg-black rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <BarChart3 size={20} />
                      Team Statistics
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-600">
                        <div className="text-2xl font-bold text-white">{project.teamSize.split('-')[0]}</div>
                        <div className="text-sm text-gray-400">Min Team Size</div>
                      </div>
                      <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-600">
                        <div className="text-2xl font-bold text-white">{project.teamSize.split('-')[1]}</div>
                        <div className="text-sm text-gray-400">Max Team Size</div>
                      </div>
                      <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-600">
                        <div className="text-2xl font-bold text-white">{project.applications}</div>
                        <div className="text-sm text-gray-400">Applications</div>
                      </div>
                      <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-600">
                        <div className="text-2xl font-bold text-green-400">{project.lookingFor.length}</div>
                        <div className="text-sm text-gray-400">Open Roles</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'progress' && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Progress Overview */}
                  <div className="bg-black rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Activity size={20} />
                      Project Progress
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 font-medium">Overall Progress</span>
                          <span className="text-white font-bold">75%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div className="bg-blue-600 h-3 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-900 rounded-lg border border-gray-600">
                          <div className="text-2xl font-bold text-green-400 mb-1">Planning</div>
                          <div className="text-sm text-gray-400">100% Complete</div>
                        </div>
                        <div className="p-4 bg-gray-900 rounded-lg border border-gray-600">
                          <div className="text-2xl font-bold text-blue-400 mb-1">Development</div>
                          <div className="text-sm text-gray-400">60% Complete</div>
                        </div>
                        <div className="p-4 bg-gray-900 rounded-lg border border-gray-600">
                          <div className="text-2xl font-bold text-yellow-400 mb-1">Testing</div>
                          <div className="text-sm text-gray-400">25% Complete</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-black rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <CalendarDays size={20} />
                      Project Timeline
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-white font-medium">Project Planning</div>
                          <div className="text-sm text-gray-400">Completed on {formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-white font-medium">Development Phase</div>
                          <div className="text-sm text-gray-400">In progress - {project.timeline}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-gray-400 font-medium">Testing & Deployment</div>
                          <div className="text-sm text-gray-500">Scheduled</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'discussions' && (
                <motion.div
                  key="discussions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Discussion Thread */}
                  <div className="bg-black rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <MessageCircle size={20} />
                      Project Discussions
                    </h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-900 rounded-lg border border-gray-600">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {project.createdBy.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-white font-medium">{project.createdBy.name}</div>
                            <div className="text-sm text-gray-400">Project Creator • 2 days ago</div>
                          </div>
                        </div>
                        <p className="text-gray-300">Welcome everyone! I'm excited to start working on this project. Let's discuss the initial architecture and tech stack decisions.</p>
                      </div>
                      
                      <div className="p-4 bg-gray-900 rounded-lg border border-gray-600">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                            J
                          </div>
                          <div>
                            <div className="text-white font-medium">John Developer</div>
                            <div className="text-sm text-gray-400">1 day ago</div>
                          </div>
                        </div>
                        <p className="text-gray-300">Great project! I'm interested in the frontend development role. What's the preferred framework?</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-600">
                      <textarea
                        rows={3}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                        placeholder="Join the discussion..."
                      />
                      <div className="flex justify-end mt-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                          <Send size={16} />
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target size={20} />
                Project Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Team Size</span>
                  <span className="text-white font-medium">{project.teamSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Timeline</span>
                  <span className="text-white font-medium">{project.timeline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Last Updated</span>
                  <span className="text-white font-medium">{formatDate(project.updatedAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Links */}
            {(project.repository || project.demo) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-lg font-bold text-white mb-4">Project Links</h3>
                <div className="space-y-3">
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors border border-gray-600"
                    >
                      <Github size={18} className="text-gray-400" />
                      <span className="text-white font-medium">Repository</span>
                      <ExternalLink size={14} className="text-gray-400 ml-auto" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors border border-gray-600"
                    >
                      <ExternalLink size={18} className="text-gray-400" />
                      <span className="text-white font-medium">Live Demo</span>
                      <ExternalLink size={14} className="text-gray-400 ml-auto" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-black rounded-xl p-6 border border-gray-700"
            >
              <div className="space-y-3">
                <button 
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Apply to Join Project
                </button>
                
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-colors ${
                    isLiked
                      ? 'border-red-500 bg-red-500/10 text-red-400'
                      : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart size={18} className={isLiked ? 'fill-current' : ''} />
                  <span className="font-medium">{isLiked ? 'Liked' : 'Like Project'}</span>
                </button>

                <button 
                  onClick={() => setShowContactModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white transition-colors"
                >
                  <MessageIcon size={18} />
                  <span className="font-medium">Contact Creator</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Related Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-black rounded-xl border border-gray-700 p-6 hover:border-gray-500 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                      {getProjectIcon(relatedProject.category)}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {relatedProject.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {relatedProject.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{relatedProject.category}</span>
                      <span>{relatedProject.applications} applications</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 rounded-xl border border-gray-700 p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Apply to Join Project</h3>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-gray-400 mb-6">
                Send your application to join "{project.title}". The project creator will review your request.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Why do you want to join this project?
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Tell the project creator why you're interested and what you can contribute..."
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowApplicationForm(false);
                      // Here you would handle the application submission
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Send Application
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Creator Modal */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 rounded-xl border border-gray-700 p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Contact Project Creator</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-gray-400 mb-6">
                Send a message to {project.createdBy.name} about "{project.title}".
              </p>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Message subject..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="Your message to the project creator..."
                    required
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 