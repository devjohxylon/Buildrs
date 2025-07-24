'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit, Github, Globe, MapPin, User, Code, Star, Users, GitBranch } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-black text-white lg:ml-64 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-gray-400 mb-6">Please sign in to view your profile.</p>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Use optional chaining and provide defaults for missing properties
  const profileData = {
    fullName: user.fullName || user.name || 'Developer',
    bio: user.bio || 'No bio available',
    location: user.location || 'Location not set',
    skills: user.skills || ['JavaScript', 'React', 'Node.js'],
    githubStats: user.githubStats || { repos: 0, followers: 0, following: 0 },
    github: user.github || { username: user.githubUsername || 'github', url: `https://github.com/${user.githubUsername || 'user'}` },
    website: user.website || null
  };

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-lg transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Buildrs</span>
          </Link>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Edit size={16} />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Header */}
        <div className="bg-black border border-gray-700 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700">
                {user.image ? (
                  <img src={user.image} alt={profileData.fullName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                    {profileData.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{profileData.fullName}</h1>
              <p className="text-gray-400 mb-4">{profileData.bio}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {profileData.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{profileData.location}</span>
                  </div>
                )}
                {profileData.github && (
                  <a
                    href={profileData.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github size={16} />
                    <span>@{profileData.github.username}</span>
                  </a>
                )}
                {profileData.website && (
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Globe size={16} />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p className="text-gray-300 leading-relaxed">{profileData.bio}</p>
            </div>

            {/* Skills */}
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="font-medium">Joined Buildrs</p>
                    <p className="text-sm text-gray-400">Welcome to the community!</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div>
                    <p className="font-medium">Profile Created</p>
                    <p className="text-sm text-gray-400">Your profile is now live</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* GitHub Stats */}
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">GitHub Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitBranch className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-400">Repositories</span>
                  </div>
                  <span className="font-semibold">{profileData.githubStats.repos}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-400">Followers</span>
                  </div>
                  <span className="font-semibold">{profileData.githubStats.followers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-400">Following</span>
                  </div>
                  <span className="font-semibold">{profileData.githubStats.following}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/projects/create"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
                >
                  Create Project
                </Link>
                <Link
                  href="/forums/new"
                  className="block w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
                >
                  Start Discussion
                </Link>
                <Link
                  href="/swipe"
                  className="block w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
                >
                  Find Matches
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Email:</span>
                  <span>{user.email}</span>
                </div>
                {profileData.github && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">GitHub:</span>
                    <a
                      href={profileData.github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      @{profileData.github.username}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 