'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Plus, Star, Users, Calendar, GitBranch } from 'lucide-react';

// Empty state data for production
const projects: any[] = [];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || project.category === selectedCategory;
      const matchesStatus = !selectedStatus || project.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort projects
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case 'collaborators':
        filtered.sort((a, b) => (b.currentCollaborators || 0) - (a.currentCollaborators || 0));
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedStatus, sortBy]);

  const topProjects = useMemo(() => {
    return projects
      .sort((a, b) => (b.currentCollaborators || 0) - (a.currentCollaborators || 0))
      .slice(0, 5);
  }, []);

  const categories = [
    'Web Development',
    'Mobile App',
    'Desktop App',
    'Game Development',
    'AI & Machine Learning',
    'Blockchain',
    'Open Source',
    'Other'
  ];

  const statuses = [
    'Planning',
    'In Progress',
    'Beta Testing',
    'Completed',
    'On Hold'
  ];

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover amazing projects and find your next collaboration opportunity.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <Link
              href="/projects/create"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Create Project
            </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
              <option value="collaborators">Most Collaborators</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold mb-4">No Projects Found</h2>
              <p className="text-gray-400 mb-6">
                {searchTerm || selectedCategory || selectedStatus 
                  ? 'Try adjusting your search criteria.'
                  : 'Be the first to create a project!'
                }
              </p>
              <Link
                href="/projects/create"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Create First Project
              </Link>
            </div>
          ) : (
            filteredProjects.map(project => (
              <div key={project.id} className="bg-black border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.status === 'Completed' ? 'bg-green-600 text-green-100' :
                    project.status === 'In Progress' ? 'bg-blue-600 text-blue-100' :
                    project.status === 'Planning' ? 'bg-yellow-600 text-yellow-100' :
                    'bg-gray-600 text-gray-100'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.slice(0, 3).map((tech: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{project.currentCollaborators || 0}/{project.maxCollaborators || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} />
                      <span>{project.likes || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <Link
                  href={`/projects/${project.id}`}
                  className="mt-4 w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center block"
                >
                  View Project
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Top Projects */}
        {topProjects.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Top Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topProjects.map(project => (
                <div key={project.id} className="bg-black border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="text-blue-400" size={16} />
                    <span className="text-sm text-gray-400">Trending</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{project.currentCollaborators || 0} collaborators</span>
                    </div>
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 