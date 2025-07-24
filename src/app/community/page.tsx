'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock, 
  ThumbsUp, 
  MessageCircle,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { FadeIn, SlideUp } from '@/lib/animations';

// Empty state data for production
const topProjects: any[] = [];
const topDevelopers: any[] = [];
const recentActivity: any[] = [];
const forumThreads: any[] = [];

export default function CommunityPage() {
  const tabs = [
    { id: 'overview', name: 'Overview', icon: Users },
    { id: 'forums', name: 'Forums', icon: MessageSquare },
    { id: 'projects', name: 'Projects', icon: TrendingUp },
    { id: 'leaderboards', name: 'Leaderboards', icon: ThumbsUp }
  ] as const;

  const [activeTab, setActiveTab] = useState<typeof tabs[number]['id']>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredThreads = recentActivity.filter(thread => {
    const matchesCategory = selectedCategory === 'all' || thread.type === selectedCategory;
    const matchesSearch = !searchTerm ||
      thread.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.target.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getThreadBadge = (thread: any) => {
    if (thread.type === 'project_created') return { icon: Plus, color: 'blue', text: 'NEW' };
    if (thread.type === 'match_made') return { icon: Plus, color: 'red', text: 'MATCH' };
    if (thread.type === 'project_completed') return { icon: Plus, color: 'green', text: 'COMPLETED' };
    if (thread.type === 'forum_post') return { icon: MessageSquare, color: 'purple', text: 'POST' };
    if (thread.type === 'contribution') return { icon: Plus, color: 'orange', text: 'CONTRIB' };
    return null;
  };

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      {/* Header */}
      <div className="bg-black border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Community</h1>
              <p className="text-gray-400">Developer hub for discussions, collaboration & recognition</p>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/forums/new" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                New Thread
              </Link>
              <Link 
                href="/projects/create" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                New Project
              </Link>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-white border border-gray-600'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  }`}
                >
                  <Users size={16} />
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div
                className="bg-black border border-gray-700 rounded-lg p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Users size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Active Developers</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                </div>
              </div>

              <div
                className="bg-black border border-gray-700 rounded-lg p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Active Projects</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                </div>
              </div>

              <div
                className="bg-black border border-gray-700 rounded-lg p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <MessageSquare size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Forum Threads</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                </div>
              </div>

              <div
                className="bg-black border border-gray-700 rounded-lg p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <ThumbsUp size={20} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Matches Made</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div
                className="bg-black border border-gray-700 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                  <Link href="/community" className="text-blue-400 hover:text-blue-300 text-sm">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentActivity.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageCircle size={48} className="text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">No recent activity</h3>
                      <p className="text-gray-500 mb-6">
                        Be the first to create a new project or post in the forums!
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Link 
                          href="/projects/create"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                        >
                          <Plus size={16} />
                          Create First Project
                        </Link>
                        <Link 
                          href="/forums/new"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                        >
                          <Plus size={16} />
                          Create First Thread
                        </Link>
                      </div>
                    </div>
                  ) : (
                    recentActivity.map((activity, index) => {
                      return (
                        <div
                          key={activity.id}
                          className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg"
                        >
                          <div className="p-2 bg-gray-700 rounded-lg">
                            <MessageCircle size={16} className="text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm">
                              <span className="font-medium">{activity.user}</span> {activity.action} <span className="text-blue-400">{activity.target}</span>
                            </p>
                            <p className="text-gray-400 text-xs">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Top Projects Preview */}
              <div
                className="bg-black border border-gray-700 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Trending Projects</h2>
                  <Link href="/community?tab=leaderboards" className="text-blue-400 hover:text-blue-300 text-sm">
                    View All
                  </Link>
                </div>
                <div className="space-y-3">
                  {topProjects.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">No trending projects</h3>
                      <p className="text-gray-500 mb-6">
                        No projects have been created yet.
                      </p>
                      <Link 
                        href="/projects/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Create First Project
                      </Link>
                    </div>
                  ) : (
                    topProjects.slice(0, 3).map((project, index) => (
                      <div
                        key={project.rank}
                        className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg"
                      >
                        <div className={`w-8 h-8 rounded-full border-2 ${project.borderColor} flex items-center justify-center text-sm font-bold ${project.color}`}>
                          {project.rank}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{project.name}</h3>
                          <p className="text-gray-400 text-xs">{project.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            {/* Star icon removed as per new_code */}
                            {project.stars}
                          </div>
                          <p className="text-gray-400 text-xs">{project.language}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'forums' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search threads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <h2 className="text-lg font-semibold mb-4">Categories</h2>
                  <div className="space-y-2 mb-6">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedCategory === 'all' 
                          ? 'bg-gray-700 text-white border border-gray-600' 
                          : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                      }`}
                    >
                      <div className="font-medium">All Topics</div>
                      <div className={`text-xs mt-1 ${selectedCategory === 'all' ? 'text-gray-300' : 'text-gray-500'}`}>
                        {recentActivity.length} threads
                      </div>
                    </button>
                    
                    {recentActivity.map(activity => (
                      <button
                        key={activity.id}
                        onClick={() => setSelectedCategory(activity.type)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedCategory === activity.type 
                            ? 'bg-gray-700 text-white border border-gray-600' 
                            : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                        }`}
                      >
                        <div className="font-medium">{activity.type.replace('_', ' ').replace('project', 'project').replace('match', 'match').replace('forum', 'forum').replace('contribution', 'contribution')}</div>
                        <div className={`text-xs mt-1 ${selectedCategory === activity.type ? 'text-gray-300' : 'text-gray-500'}`}>
                          {recentActivity.filter(t => t.type === activity.type).length} threads
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Threads List */}
              <div className="lg:col-span-3">
                {filteredThreads.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No threads found</h3>
                    <p className="text-gray-500 mb-6">
                      {searchTerm ? `No threads match "${searchTerm}"` : 'No threads in this category'}
                    </p>
                    <Link 
                      href="/forums/new"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Create First Thread
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4 mt-8">
                    {filteredThreads.map((thread, index) => {
                    const badge = getThreadBadge(thread);
                    return (
                      <Link key={thread.id} href={`/forums/${thread.id}`}>
                        <div
                          className="bg-black border border-gray-700 rounded-lg p-6 hover:border-gray-600 hover:bg-gray-900/50 transition-all duration-200 cursor-pointer group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                  {thread.action}
                                </h3>
                                {badge && (
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-${badge.color}-500/20 text-${badge.color}-400 border border-${badge.color}-500/30`}>
                                    <MessageCircle size={12} />
                                    {badge.text}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-400 mb-3 group-hover:text-gray-300 transition-colors">{thread.target}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>By {thread.user}</span>
                                <span>•</span>
                                <span>{thread.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <div className="text-center">
                                <div className="text-lg font-semibold text-white">{thread.type === 'project_created' ? 'New Project' : thread.type === 'match_made' ? 'Match Made' : thread.type === 'project_completed' ? 'Completed' : thread.type === 'forum_post' ? 'Post' : 'Contrib'}</div>
                                <div className="text-xs text-gray-400">activity</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <select className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors">
                  <option value="">All Categories</option>
                  <option value="web-app">Web App</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="ai-ml">AI/ML</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="game">Game</option>
                </select>
                <select className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors">
                  <option value="">All Status</option>
                  <option value="recruiting">Recruiting</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {topProjects.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No projects found</h3>
                  <p className="text-gray-500 mb-6">
                    No projects have been created yet.
                  </p>
                  <Link 
                    href="/projects/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Create First Project
                  </Link>
                </div>
              ) : (
                topProjects.map((project, index) => (
                  <div
                    key={project.rank}
                    className="bg-black border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-8 h-8 rounded-full border-2 ${project.borderColor} flex items-center justify-center text-sm font-bold ${project.color}`}>
                        {project.rank}
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        {/* Star icon removed as per new_code */}
                        {project.stars}
                      </div>
                    </div>
                    
                    <h3 className="text-white font-semibold text-lg mb-2">{project.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {project.contributors} contributors
                      </span>
                      <span className="flex items-center gap-1">
                        {/* Code icon removed as per new_code */}
                        {project.language}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">#{project.rank} in community</span>
                      <Link 
                        href={`/projects/${project.rank}`}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                      >
                        View Project →
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* View All Projects Button */}
            <div className="text-center pt-6">
              <Link 
                href="/projects"
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                {/* ArrowRight icon removed as per new_code */}
                View All Projects
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'leaderboards' && (
          <div className="space-y-8">
            {/* Top Projects */}
            <div
              className="bg-black border border-gray-700 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Top Projects</h2>
                <Link href="/projects" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                  View All Projects
                  {/* ArrowRight icon removed as per new_code */}
                </Link>
              </div>
              <div className="space-y-4">
                {topProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No trending projects</h3>
                    <p className="text-gray-500 mb-6">
                      No projects have been created yet.
                    </p>
                    <Link 
                      href="/projects/create"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Create First Project
                    </Link>
                  </div>
                ) : (
                  topProjects.map((project, index) => (
                    <div
                      key={project.rank}
                      className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-full border-2 ${project.borderColor} flex items-center justify-center text-lg font-bold ${project.color}`}>
                        {project.rank}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{project.name}</h3>
                        <p className="text-gray-400">{project.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            {/* Star icon removed as per new_code */}
                            {project.stars} stars
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {project.contributors} contributors
                          </span>
                          <span className="flex items-center gap-1">
                            {/* Code icon removed as per new_code */}
                            {project.language}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${project.color}`}>
                          #{project.rank}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Top Developers */}
            <div
              className="bg-black border border-gray-700 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Top Developers</h2>
                <Link href="/community" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                  View All Developers
                  {/* ArrowRight icon removed as per new_code */}
                </Link>
              </div>
              <div className="space-y-4">
                {topDevelopers.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No developers found</h3>
                    <p className="text-gray-500 mb-6">
                      No developers have contributed yet.
                    </p>
                    <Link 
                      href="/community"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                      <Users size={16} />
                      View All Developers
                    </Link>
                  </div>
                ) : (
                  topDevelopers.map((developer, index) => (
                    <div
                      key={developer.rank}
                      className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-full border-2 ${developer.borderColor} flex items-center justify-center text-lg font-bold ${developer.color}`}>
                        {developer.rank}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{developer.name}</h3>
                        <p className="text-gray-400">{developer.username} • {developer.specialty}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>{developer.contributions} contributions</span>
                          <span>•</span>
                          <span>{developer.projects} projects</span>
                          <span>•</span>
                          <span>{developer.followers} followers</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${developer.color}`}>
                          #{developer.rank}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 