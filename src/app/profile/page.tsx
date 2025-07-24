'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { FadeIn, SlideUp, AnimatedButton, AnimatedCard } from '@/lib/animations';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Code, 
  Github, 
  Linkedin, 
  Globe, 
  Edit, 
  Save, 
  X, 
  Star, 
  Eye, 
  GitBranch, 
  Users, 
  Clock, 
  Target,
  Award,
  TrendingUp,
  MessageSquare,
  Heart,
  BookOpen,
  Settings,
  Bell,
  Shield,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.fullName || '',
    bio: user?.bio || 'Passionate developer looking for exciting projects to collaborate on.',
    location: user?.location || 'Remote',
    skills: user?.skills || ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    experienceLevel: user?.githubStats?.experienceLevel || 'Intermediate',
    availability: 'Part-time', // Not in User interface, using default
    github: user?.github || '',
    linkedin: '', // Not in User interface, using empty string
    website: user?.website || ''
  });

  const stats = {
    projectsCompleted: 12,
    collaborations: 8,
    skills: 15,
    experience: '3 years'
  };

  const recentProjects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      tech: ['React', 'Node.js', 'MongoDB'],
      status: 'Completed',
      collaborators: 3,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Real-time task management with drag-and-drop interface',
      tech: ['Vue.js', 'Firebase', 'TypeScript'],
      status: 'In Progress',
      collaborators: 2,
      rating: 4.6
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Weather app with beautiful UI and real-time data',
      tech: ['React', 'OpenWeather API', 'Tailwind CSS'],
      status: 'Completed',
      collaborators: 1,
      rating: 4.9
    }
  ];

  const achievements = [
    { icon: Award, title: 'Top Contributor', description: 'Most active developer this month' },
    { icon: TrendingUp, title: 'Rising Star', description: 'Fastest growing profile' },
    { icon: Star, title: '5-Star Rating', description: 'Consistently high ratings' }
  ];

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.fullName || '',
      bio: user?.bio || 'Passionate developer looking for exciting projects to collaborate on.',
      location: user?.location || 'Remote',
      skills: user?.skills || ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      experienceLevel: user?.githubStats?.experienceLevel || 'Intermediate',
      availability: 'Part-time', // Not in User interface, using default
      github: user?.github || '',
      linkedin: '', // Not in User interface, using empty string
      website: user?.website || ''
    });
    setIsEditing(false);
  };

  const addSkill = (skill: string) => {
    if (skill && !editData.skills.includes(skill)) {
      setEditData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="text-gray-400 mt-2">Manage your developer profile and preferences</p>
            </div>
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <AnimatedButton
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit Profile
                </AnimatedButton>
              ) : (
                <div className="flex gap-2">
                  <AnimatedButton
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={handleCancel}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </AnimatedButton>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <AnimatedCard className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                        className="text-2xl font-bold bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold">{editData.name}</h2>
                    )}
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                      {editData.experienceLevel}
                    </span>
                  </div>
                  
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white mb-4"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-300 mb-4">{editData.bio}</p>
                  )}

                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{editData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{editData.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Joined 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Skills Section */}
            <AnimatedCard className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Code size={20} />
                  Skills & Technologies
                </h3>
                {isEditing && (
                  <input
                    type="text"
                    placeholder="Add a skill..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSkill((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                    className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm"
                  />
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm flex items-center gap-2"
                  >
                    <span>{skill}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-gray-500 hover:text-red-400"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Recent Projects */}
            <AnimatedCard className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <GitBranch size={20} />
                  Recent Projects
                </h3>
                <Link
                  href="/projects"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <SlideUp key={project.id} delay={index * 100}>
                    <div className="border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-white">{project.title}</h4>
                        <div className="flex items-center gap-2">
                          <Star size={14} className="text-yellow-400" />
                          <span className="text-sm text-gray-400">{project.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-gray-800 text-xs rounded text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{project.collaborators}</span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            project.status === 'Completed' 
                              ? 'bg-green-900 text-green-300' 
                              : 'bg-yellow-900 text-yellow-300'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SlideUp>
                ))}
              </div>
            </AnimatedCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <AnimatedCard className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target size={20} />
                Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Projects Completed</span>
                  <span className="font-semibold text-white">{stats.projectsCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Collaborations</span>
                  <span className="font-semibold text-white">{stats.collaborations}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Skills</span>
                  <span className="font-semibold text-white">{stats.skills}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Experience</span>
                  <span className="font-semibold text-white">{stats.experience}</span>
                </div>
              </div>
            </AnimatedCard>

            {/* Achievements */}
            <AnimatedCard className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award size={20} />
                Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                      <Icon size={20} className="text-yellow-400" />
                      <div>
                        <h4 className="font-medium text-white">{achievement.title}</h4>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimatedCard>

            {/* Social Links */}
            <AnimatedCard className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Globe size={20} />
                Social Links
              </h3>
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Github size={16} className="text-gray-400" />
                      <input
                        type="text"
                        value={editData.github}
                        onChange={(e) => setEditData(prev => ({ ...prev, github: e.target.value }))}
                        placeholder="GitHub username"
                        className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin size={16} className="text-gray-400" />
                      <input
                        type="text"
                        value={editData.linkedin}
                        onChange={(e) => setEditData(prev => ({ ...prev, linkedin: e.target.value }))}
                        placeholder="LinkedIn profile"
                        className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe size={16} className="text-gray-400" />
                      <input
                        type="text"
                        value={editData.website}
                        onChange={(e) => setEditData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="Personal website"
                        className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {editData.github && (
                      <a
                        href={`https://github.com/${editData.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                      >
                        <Github size={16} />
                        <span>@{editData.github}</span>
                      </a>
                    )}
                    {editData.linkedin && (
                      <a
                        href={editData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                      >
                        <Linkedin size={16} />
                        <span>LinkedIn Profile</span>
                      </a>
                    )}
                    {editData.website && (
                      <a
                        href={editData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                      >
                        <Globe size={16} />
                        <span>Personal Website</span>
                      </a>
                    )}
                  </>
                )}
              </div>
            </AnimatedCard>

            {/* Quick Actions */}
            <AnimatedCard className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  href="/swipe"
                  className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Heart size={16} />
                  <span>Discover Projects</span>
                </Link>
                <Link
                  href="/matches"
                  className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <MessageSquare size={16} />
                  <span>View Matches</span>
                </Link>
                <Link
                  href="/projects/create"
                  className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Code size={16} />
                  <span>Create Project</span>
                </Link>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
} 