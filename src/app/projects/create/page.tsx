'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Upload, Tag, Users, Calendar } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';

export default function CreateProjectPage() {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    technologies: '',
    collaborators: '',
    githubUrl: '',
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-6xl mb-4">🚀</div>
            <h1 className="text-2xl font-bold mb-4">Join Buildrs to create projects</h1>
            <p className="text-gray-400 mb-6">
              Share your ideas and find collaborators for your next big project.
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          feature="project creation"
        />
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to projects page
    window.location.href = '/projects';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/projects" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-lg transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Create New Project</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Share your project idea and find amazing collaborators to help bring it to life.
          </p>
        </div>

        {/* Form */}
        <div className="bg-black border border-gray-700 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your project title"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your project, its goals, and what you're looking for in collaborators..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                required
              />
            </div>

            {/* Category and Technologies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="desktop-app">Desktop App</option>
                  <option value="game-development">Game Development</option>
                  <option value="ai-ml">AI & Machine Learning</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="open-source">Open Source</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="technologies" className="block text-sm font-medium mb-2">
                  Technologies
                </label>
                <input
                  type="text"
                  id="technologies"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="e.g., React, Node.js, Python"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Collaborators and GitHub */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="collaborators" className="block text-sm font-medium mb-2">
                  Needed Collaborators
                </label>
                <input
                  type="number"
                  id="collaborators"
                  name="collaborators"
                  value={formData.collaborators}
                  onChange={handleChange}
                  placeholder="How many collaborators do you need?"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">
                  GitHub Repository (Optional)
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Project Image */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-2">
                Project Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <Upload className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Upload a project screenshot or logo</p>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating Project...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Create Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-black border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Tips for a Great Project Post</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>• Be clear about your project goals and vision</li>
            <li>• Specify the skills and experience you're looking for</li>
            <li>• Include relevant technologies and frameworks</li>
            <li>• Mention the time commitment and project timeline</li>
            <li>• Add a GitHub repository if you have one</li>
            <li>• Upload an image to make your project stand out</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 