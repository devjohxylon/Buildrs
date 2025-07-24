'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Github, Users, Calendar, Tag, MessageSquare, Heart, Share2 } from 'lucide-react';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading project data
    setTimeout(() => {
      setProject({
        id: params.id,
        title: 'Buildrs Platform',
        description: 'A next-generation platform for developer collaboration and project discovery.',
        category: 'Web Development',
        status: 'In Progress',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI'],
        collaborators: 3,
        createdAt: '2025-01-15',
        githubUrl: 'https://github.com/devjohxylon/Buildrs',
        image: '/api/placeholder/600/400'
      });
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white lg:ml-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white lg:ml-64 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-blue-400 hover:text-blue-300">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-lg transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>
          <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
          <p className="text-gray-400 text-lg">{project.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Image */}
            <div className="bg-gray-800 rounded-lg h-64 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="text-4xl mb-2">🖼️</div>
                <p>Project Image</p>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {project.description} This is a comprehensive platform designed to revolutionize how developers connect, collaborate, and build amazing projects together.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <ul className="space-y-1 text-gray-400">
                    <li>• Smart developer matching</li>
                    <li>• Real-time collaboration tools</li>
                    <li>• Project discovery and management</li>
                    <li>• GitHub integration</li>
                    <li>• Mobile-responsive design</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Goals</h3>
                  <ul className="space-y-1 text-gray-400">
                    <li>• Connect developers worldwide</li>
                    <li>• Streamline project collaboration</li>
                    <li>• Build a thriving developer community</li>
                    <li>• Provide innovative tools for teams</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Comments</h2>
              <div className="text-center py-8 text-gray-400">
                <MessageSquare className="text-4xl mx-auto mb-4 opacity-50" />
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Project Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Tag className="text-gray-400" size={16} />
                  <div>
                    <p className="text-sm text-gray-400">Category</p>
                    <p className="font-medium">{project.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-400"></div>
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="font-medium">{project.status}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="text-gray-400" size={16} />
                  <div>
                    <p className="text-sm text-gray-400">Collaborators</p>
                    <p className="font-medium">{project.collaborators}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-400" size={16} />
                  <div>
                    <p className="text-sm text-gray-400">Created</p>
                    <p className="font-medium">{project.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Heart size={16} />
                  Join Project
                </button>
                
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Github size={16} />
                  View on GitHub
                </a>
                
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Share2 size={16} />
                  Share Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 