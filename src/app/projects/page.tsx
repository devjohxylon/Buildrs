'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Filter, 
  Terminal, 
  Cpu, 
  HardDrive, 
  Activity, 
  Users, 
  Star, 
  Clock, 
  GitBranch,
  ExternalLink,
  Calendar,
  TrendingUp,
  Code,
  Globe,
  Smartphone,
  Monitor,
  Gamepad2,
  Database
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Empty state data for production
const projects: any[] = [];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = !searchTerm || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || project.projectType === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort projects
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.currentCollaborators || 0) - (a.currentCollaborators || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedStatus, sortBy]);

  const topProjects = useMemo(() => {
    return projects
      .sort((a, b) => (b.currentCollaborators || 0) - (a.currentCollaborators || 0))
      .slice(0, 5);
  }, []);

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.projectType)))];
  const statuses = ['all', 'recruiting', 'in-progress', 'completed', 'paused'];

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  const getProjectIcon = (projectType: string) => {
    switch (projectType) {
      case 'web-app': return <Globe size={20} />;
      case 'mobile-app': return <Smartphone size={20} />;
      case 'desktop-app': return <Monitor size={20} />;
      case 'game': return <Gamepad2 size={20} />;
      case 'api': return <Database size={20} />;
      default: return <Code size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'in-progress': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'completed': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-gray-400 bg-gray-800 border-gray-600';
    }
  };

  const getProjectTypeColor = (projectType: string) => {
    switch (projectType) {
      case 'web-app': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'mobile-app': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'desktop-app': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'game': return 'text-pink-400 bg-pink-500/10 border-pink-500/20';
      case 'api': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      default: return 'text-gray-400 bg-gray-800 border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      {/* Header */}
      <div className="bg-black border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.h1 
                className="text-5xl font-bold mb-3 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Projects
              </motion.h1>
              <p className="text-gray-400 text-lg">Discover amazing projects to collaborate on</p>
            </div>
            <Link href="/projects/create">
              <motion.button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">+</span>
                <span>New Project</span>
              </motion.button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search */}
            <div className="relative lg:col-span-2">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
                placeholder="Search projects, tech stack, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none transition-colors"
            />
          </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-900">
                  {category === 'all' ? 'All Categories' : category.replace('-', ' ')}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors"
            >
              {statuses.map(status => (
                <option key={status} value={status} className="bg-gray-900">
                  {status === 'all' ? 'All Status' : status.replace('-', ' ')}
                </option>
              ))}
            </select>
      </div>

          {/* Sort and View Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-gray-500 focus:outline-none transition-colors text-sm"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="name">Name</option>
                <option value="status">Status</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current rounded-sm h-0.5"></div>
                  <div className="bg-current rounded-sm h-0.5"></div>
                  <div className="bg-current rounded-sm h-0.5"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-black rounded-lg p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Projects</p>
                <p className="text-2xl font-bold text-white">{projects.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Code className="text-blue-400" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-black rounded-lg p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-white">{projects.filter(p => p.status === 'in-progress').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Activity className="text-green-400" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-black rounded-lg p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Recruiting</p>
                <p className="text-2xl font-bold text-white">{projects.filter(p => p.status === 'recruiting').length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Users className="text-orange-400" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-black rounded-lg p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-white">{projects.filter(p => p.status === 'completed').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Star className="text-blue-400" size={24} />
              </div>
            </div>
          </motion.div>
          </div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
            {projects.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Clear filters
                </button>
            </motion.div>
            ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                    key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    onClick={() => handleProjectClick(project.id)}
                       className="bg-black rounded-lg border border-gray-700 p-6 cursor-pointer hover:border-gray-600 hover:bg-gray-900 transition-all duration-200 group"
                  >
                       <div className="flex items-start justify-between mb-4">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                             {getProjectIcon(project.projectType)}
                           </div>
                           <div>
                             <h3 className="font-semibold text-white group-hover:text-gray-300 transition-colors">
                               {project.title}
                             </h3>
                             <p className="text-sm text-gray-400">{project.creatorId}</p>
                           </div>
                         </div>
                         <ExternalLink className="text-gray-600 group-hover:text-gray-400 transition-colors" size={16} />
                       </div>

                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`text-xs px-2 py-1 rounded-lg border ${getProjectTypeColor(project.projectType)}`}>
                          {project.projectType.replace('-', ' ')}
                          </span>
                        <span className={`text-xs px-2 py-1 rounded-lg border ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ')}
                          </span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{project.currentCollaborators || 0}/{project.maxCollaborators}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{project.estimatedDuration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch size={14} />
                          <span>{project.techStack.length} tech</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                                             onClick={() => handleProjectClick(project.id)}
                       className="bg-black rounded-lg border border-gray-700 p-6 cursor-pointer hover:border-gray-600 hover:bg-gray-900 transition-all duration-200 group"
                     >
                       <div className="flex items-center gap-6">
                         <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                           {getProjectIcon(project.projectType)}
                    </div>

                         <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-3 mb-2">
                             <h3 className="font-semibold text-white group-hover:text-gray-300 transition-colors truncate">
                               {project.title}
                             </h3>
                            <span className={`text-xs px-2 py-1 rounded-lg border ${getProjectTypeColor(project.projectType)}`}>
                              {project.projectType.replace('-', ' ')}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-lg border ${getStatusColor(project.status)}`}>
                              {project.status.replace('-', ' ')}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-2 line-clamp-1">{project.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>by {project.creatorId}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>{project.currentCollaborators || 0}/{project.maxCollaborators}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{project.estimatedDuration}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <GitBranch size={14} />
                              <span>{project.techStack.length} tech</span>
                    </div>
                  </div>
                  </div>

                        <ExternalLink className="text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0" size={16} />
                  </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Projects Section */}
        {projects.length > 0 && (
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
                         <div className="flex items-center gap-3 mb-6">
               <TrendingUp className="text-blue-400" size={24} />
               <h2 className="text-2xl font-bold text-white">Trending Projects</h2>
                  </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  onClick={() => handleProjectClick(project.id)}
                                     className={`relative bg-black rounded-lg border border-gray-700 p-6 cursor-pointer hover:scale-105 transition-all duration-200 group`}
                >
                  {index < 3 && (
                                         <div className={`absolute -top-2 -left-2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-black shadow-lg ${
                       index === 0 ? 'bg-orange-500' :
                       index === 1 ? 'bg-blue-500' :
                       index === 2 ? 'bg-purple-500' :
                       'bg-gray-600'
                          }`}>
                            #{index + 1}
                     </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                        {getProjectIcon(project.projectType)}
                      </div>
                      <div>
                                                 <h3 className="font-semibold text-white group-hover:text-gray-300 transition-colors">
                            {project.title}
                         </h3>
                        <p className="text-sm text-gray-400">{project.creatorId}</p>
                      </div>
                        </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex items-center justify-between text-sm">
                                         <div className="flex items-center gap-1 text-green-400 font-semibold">
                       <Users size={14} />
                       <span>{project.currentCollaborators || 0} collaborators</span>
                </div>
                    <span className={`text-xs px-2 py-1 rounded-lg border ${getProjectTypeColor(project.projectType)}`}>
                      {project.projectType.replace('-', ' ')}
                    </span>
                  </div>
                </motion.div>
              ))}
                </div>
          </motion.div>
            )}
      </div>
    </div>
  );
} 