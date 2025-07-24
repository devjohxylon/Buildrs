'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Terminal, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Code, 
  Globe, 
  Smartphone, 
  Monitor, 
  Gamepad2, 
  Database,
  Users,
  Clock,
  Target,
  FileText,
  GitBranch,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function CreateProjectPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectType: 'web-app',
    status: 'recruiting',
    maxCollaborators: 5,
    estimatedDuration: '3-6 months',
    difficulty: 'intermediate',
    techStack: [] as string[],
    lookingFor: [] as string[],
    repository: '',
    demo: '',
    tags: [] as string[]
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [newTech, setNewTech] = useState('');
  const [newLookingFor, setNewLookingFor] = useState('');
  const [newTag, setNewTag] = useState('');

  const techOptions = [
    'React', 'Vue', 'Angular', 'Next.js', 'Node.js', 'Python', 'Java', 'C#', 
    'TypeScript', 'JavaScript', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'Firebase', 'MongoDB', 'PostgreSQL',
    'Redis', 'GraphQL', 'REST API', 'WebSocket', 'Flutter', 'React Native'
  ];

  const roleOptions = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 
    'Mobile Developer', 'DevOps Engineer', 'UI/UX Designer', 'Data Scientist',
    'QA Engineer', 'Project Manager', 'Technical Writer', 'Security Engineer'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle project creation
    console.log('Creating project:', formData);
  };

  const handleChange = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTech = () => {
    if (newTech && !formData.techStack.includes(newTech)) {
      handleChange('techStack', [...formData.techStack, newTech]);
      setNewTech('');
    }
  };

  const removeTech = (tech: string) => {
    handleChange('techStack', formData.techStack.filter(t => t !== tech));
  };

  const addLookingFor = () => {
    if (newLookingFor && !formData.lookingFor.includes(newLookingFor)) {
      handleChange('lookingFor', [...formData.lookingFor, newLookingFor]);
      setNewLookingFor('');
    }
  };

  const removeLookingFor = (role: string) => {
    handleChange('lookingFor', formData.lookingFor.filter(r => r !== role));
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      handleChange('tags', [...formData.tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    handleChange('tags', formData.tags.filter(t => t !== tag));
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

  const steps = [
    { id: 1, title: 'Basic Info', icon: FileText },
    { id: 2, title: 'Details', icon: Target },
    { id: 3, title: 'Tech Stack', icon: Code },
    { id: 4, title: 'Review', icon: CheckCircle }
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      {/* Header */}
      <div className="bg-black border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link
                href="/projects"
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to Projects
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-white">Create New Project</h1>
                <p className="text-gray-400 text-lg">Start a new collaboration</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    currentStep >= step.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <step.icon size={16} />
                  <span className="font-medium">{step.title}</span>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black rounded-lg border border-gray-700 overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-700">
            <div className="flex items-center gap-3">
              <Terminal size={16} className="text-white" />
              <span className="text-white font-medium">Project Creation Terminal</span>
              <span className="text-gray-400 text-sm">Step {currentStep} of {steps.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Project Title */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        <span className="text-green-400">$</span> Project Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none transition-colors"
                        placeholder="Enter project title..."
                        required
                      />
                    </div>

                    {/* Project Description */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        <span className="text-green-400">$</span> Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        rows={4}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none transition-colors resize-none"
                        placeholder="Describe your project..."
                        required
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        <span className="text-green-400">$</span> Project Type
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          { value: 'web-app', label: 'Web App', icon: Globe },
                          { value: 'mobile-app', label: 'Mobile App', icon: Smartphone },
                          { value: 'desktop-app', label: 'Desktop App', icon: Monitor },
                          { value: 'game', label: 'Game', icon: Gamepad2 },
                          { value: 'api', label: 'API/Backend', icon: Database }
                        ].map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => handleChange('projectType', type.value)}
                            className={`p-4 rounded-lg border transition-colors flex items-center gap-3 ${
                              formData.projectType === type.value
                                ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                                : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'
                            }`}
                          >
                            <type.icon size={20} />
                            <span className="font-medium">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Project Status */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        <span className="text-green-400">$</span> Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors"
                      >
                        <option value="recruiting">Recruiting</option>
                        <option value="in-progress">In Progress</option>
                        <option value="paused">Paused</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    {/* Max Collaborators */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        <span className="text-green-400">$</span> Max Collaborators
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          value={formData.maxCollaborators}
                          onChange={(e) => handleChange('maxCollaborators', parseInt(e.target.value))}
                          min="1"
                          max="20"
                          className="flex-1"
                        />
                        <span className="text-white font-medium min-w-[3rem] text-center">
                          {formData.maxCollaborators}
                        </span>
                      </div>
                    </div>

                    {/* Estimated Duration */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        <span className="text-green-400">$</span> Estimated Duration
                      </label>
                      <select
                        value={formData.estimatedDuration}
                        onChange={(e) => handleChange('estimatedDuration', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors"
                      >
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6-12 months">6-12 months</option>
                        <option value="1+ years">1+ years</option>
                      </select>
                    </div>

                    {/* Difficulty */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        <span className="text-green-400">$</span> Difficulty Level
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { value: 'beginner', label: 'Beginner', color: 'green' },
                          { value: 'intermediate', label: 'Intermediate', color: 'yellow' },
                          { value: 'advanced', label: 'Advanced', color: 'orange' },
                          { value: 'expert', label: 'Expert', color: 'red' }
                        ].map((level) => (
                          <button
                            key={level.value}
                            type="button"
                            onClick={() => handleChange('difficulty', level.value)}
                            className={`p-3 rounded-lg border transition-colors ${
                              formData.difficulty === level.value
                                ? `border-${level.color}-500 bg-${level.color}-500/10 text-${level.color}-400`
                                : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'
                            }`}
                          >
                            <span className="font-medium">{level.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Tech Stack */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        <span className="text-green-400">$</span> Tech Stack
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={newTech}
                          onChange={(e) => setNewTech(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none transition-colors"
                          placeholder="Add technology..."
                        />
                        <button
                          type="button"
                          onClick={addTech}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Plus size={16} />
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="bg-gray-800 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                          >
                            <Code size={14} />
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTech(tech)}
                              className="text-gray-400 hover:text-white"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Looking For */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        <span className="text-green-400">$</span> Looking For
                      </label>
                      <div className="flex gap-2 mb-3">
                        <select
                          value={newLookingFor}
                          onChange={(e) => setNewLookingFor(e.target.value)}
                          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-gray-500 focus:outline-none transition-colors"
                        >
                          <option value="">Select role...</option>
                          {roleOptions.map((role) => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={addLookingFor}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Plus size={16} />
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.lookingFor.map((role) => (
                          <span
                            key={role}
                            className="bg-gray-800 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                          >
                            <Users size={14} />
                            {role}
                            <button
                              type="button"
                              onClick={() => removeLookingFor(role)}
                              className="text-gray-400 hover:text-white"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        <span className="text-green-400">$</span> Tags
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none transition-colors"
                          placeholder="Add tag..."
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Plus size={16} />
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-800 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                          >
                            #{tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-gray-400 hover:text-white"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                      <h3 className="text-xl font-bold text-white mb-4">Project Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-white mb-2">Basic Information</h4>
                          <div className="space-y-2 text-gray-300">
                            <p><span className="text-gray-400">Title:</span> {formData.title}</p>
                            <p><span className="text-gray-400">Type:</span> {formData.projectType.replace('-', ' ')}</p>
                            <p><span className="text-gray-400">Status:</span> {formData.status.replace('-', ' ')}</p>
                            <p><span className="text-gray-400">Difficulty:</span> {formData.difficulty}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-2">Details</h4>
                          <div className="space-y-2 text-gray-300">
                            <p><span className="text-gray-400">Max Collaborators:</span> {formData.maxCollaborators}</p>
                            <p><span className="text-gray-400">Duration:</span> {formData.estimatedDuration}</p>
                            <p><span className="text-gray-400">Tech Stack:</span> {formData.techStack.length} technologies</p>
                            <p><span className="text-gray-400">Looking For:</span> {formData.lookingFor.length} roles</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold text-white mb-2">Description</h4>
                        <p className="text-gray-300">{formData.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-700">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg border border-gray-700 transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Previous
                  </button>
                )}
                
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Next
                    <ArrowLeft size={16} className="rotate-180" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    Create Project
                  </button>
                )}
                
                <Link href="/projects">
                  <button
                    type="button"
                    className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg border border-gray-700 transition-colors flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Command Prompt */}
        <div className="mt-8 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 text-white text-sm">
            <span className="text-gray-500">user@buildrs:~/projects/create$</span>
            <span className="text-gray-400">create_project --step={currentStep} --interactive</span>
            <span className="text-white animate-pulse">|</span>
          </div>
        </div>
      </div>
    </div>
  );
} 