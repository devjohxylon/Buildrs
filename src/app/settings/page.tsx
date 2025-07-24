'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Ban, 
  VolumeX, 
  Shield, 
  Settings, 
  User, 
  Eye, 
  EyeOff,
  Bell,
  Palette,
  Lock,
  Globe,
  Mail,
  Smartphone,
  Zap,
  Moon,
  Sun,
  Monitor,
  Github,
  Trash2,
  Download,
  Upload,
  Key,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Save,
  RotateCcw
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';

interface BlockedUser {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  githubUsername?: string;
  blockedAt: Date;
}

interface MutedUser {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  githubUsername?: string;
  mutedAt: Date;
}

export default function SettingsPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'account' | 'privacy' | 'notifications' | 'appearance' | 'security' | 'social' | 'data'>('account');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  // If not authenticated, show login modal
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-6xl mb-4">Login Required</div>
            <h1 className="text-2xl font-bold mb-4">Join Buildrs to access settings</h1>
            <p className="text-gray-400 mb-6">
              Manage your account preferences and privacy settings.
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
          feature="general"
        />
      </>
    );
  }

  // Settings state
  const [settings, setSettings] = useState({
    // Account
    emailNotifications: true,
    marketingEmails: false,
    profileVisibility: 'public',
    
    // Privacy
    showOnlineStatus: true,
    allowMessages: true,
    showGitHubStats: true,
    allowProjectInvites: true,
    
    // Notifications
    newMatches: true,
    projectUpdates: true,
    forumReplies: true,
    communityEvents: true,
    pushNotifications: true,
    emailDigest: 'weekly',
    
    // Appearance
    theme: 'dark',
    compactMode: false,
    showAnimations: true,
    language: 'en',
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginAlerts: true,
    
    // Social
    autoAcceptMatches: false,
    showProfileInSearch: true,
    allowProjectRequests: true
  });

  // Production data - replace with actual API calls
  const blockedUsers: any[] = [];
  const mutedUsers: any[] = [];

  const handleUnblockUser = (userId: string) => {
    // Implementation for unblocking user
    console.log('Unblocking user:', userId);
  };

  const handleUnmuteUser = (userId: string) => {
    // Implementation for unmuting user
    console.log('Unmuting user:', userId);
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleDeleteAccount = async () => {
    // Implementation for account deletion
    console.log('Deleting account...');
    setShowDeleteConfirm(false);
  };

  const handleExportData = () => {
    // Implementation for data export
    console.log('Exporting data...');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const tabs = [
    { id: 'account', name: 'Account', icon: User, description: 'Profile and basic settings' },
    { id: 'privacy', name: 'Privacy', icon: Shield, description: 'Control your privacy' },
    { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Manage notifications' },
    { id: 'appearance', name: 'Appearance', icon: Palette, description: 'Theme and display' },
    { id: 'security', name: 'Security', icon: Lock, description: 'Security settings' },
    { id: 'social', name: 'Social', icon: Globe, description: 'Social features' },
    { id: 'data', name: 'Data', icon: Download, description: 'Data management' }
  ] as const;

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      {/* Header */}
      <div className="bg-black border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Settings</h1>
              <p className="text-gray-400">Manage your account and preferences</p>
            </div>
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit Settings
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-black border border-gray-700 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Settings Categories</h2>
                <div className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          activeTab === tab.id 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={16} />
                          <div>
                            <div className="font-medium">{tab.name}</div>
                            <div className="text-xs opacity-75">{tab.description}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    {/* Email Preferences */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Email Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Email Notifications</h4>
                            <p className="text-gray-400 text-sm">Receive important updates via email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.emailNotifications}
                              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Marketing Emails</h4>
                            <p className="text-gray-400 text-sm">Receive promotional content and updates</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.marketingEmails}
                              onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Profile Visibility */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Profile Visibility</h3>
                      <div className="space-y-3">
                        {['public', 'private', 'friends'].map((visibility) => (
                          <label key={visibility} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="profileVisibility"
                              value={visibility}
                              checked={settings.profileVisibility === visibility}
                              onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                            />
                            <div>
                              <div className="text-white font-medium capitalize">{visibility}</div>
                              <div className="text-gray-400 text-sm">
                                {visibility === 'public' && 'Anyone can view your profile'}
                                {visibility === 'private' && 'Only you can view your profile'}
                                {visibility === 'friends' && 'Only your connections can view your profile'}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    {/* Privacy Controls */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Privacy Controls</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Show Online Status</h4>
                            <p className="text-gray-400 text-sm">Let others see when you're online</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.showOnlineStatus}
                              onChange={(e) => handleSettingChange('showOnlineStatus', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Allow Messages</h4>
                            <p className="text-gray-400 text-sm">Receive messages from other users</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.allowMessages}
                              onChange={(e) => handleSettingChange('allowMessages', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Show GitHub Stats</h4>
                            <p className="text-gray-400 text-sm">Display your GitHub statistics on profile</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.showGitHubStats}
                              onChange={(e) => handleSettingChange('showGitHubStats', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Allow Project Invites</h4>
                            <p className="text-gray-400 text-sm">Receive invitations to join projects</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.allowProjectInvites}
                              onChange={(e) => handleSettingChange('allowProjectInvites', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Blocked Users */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Blocked Users</h3>
                      {blockedUsers.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No blocked users</p>
                      ) : (
                        <div className="space-y-3">
                          {blockedUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                                  <User size={16} className="text-gray-400" />
                                </div>
                                <div>
                                  <div className="text-white font-medium">{user.name}</div>
                                  <div className="text-gray-400 text-xs">{user.role}</div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleUnblockUser(user.id)}
                                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                              >
                                Unblock
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Muted Users */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Muted Users</h3>
                      {mutedUsers.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No muted users</p>
                      ) : (
                        <div className="space-y-3">
                          {mutedUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                                  <User size={16} className="text-gray-400" />
                                </div>
                                <div>
                                  <div className="text-white font-medium">{user.name}</div>
                                  <div className="text-gray-400 text-xs">{user.role}</div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleUnmuteUser(user.id)}
                                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                              >
                                Unmute
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    {/* Notification Preferences */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">New Matches</h4>
                            <p className="text-gray-400 text-sm">When you get matched with someone</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.newMatches}
                              onChange={(e) => handleSettingChange('newMatches', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Project Updates</h4>
                            <p className="text-gray-400 text-sm">Updates from projects you're involved in</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.projectUpdates}
                              onChange={(e) => handleSettingChange('projectUpdates', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Forum Replies</h4>
                            <p className="text-gray-400 text-sm">When someone replies to your posts</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.forumReplies}
                              onChange={(e) => handleSettingChange('forumReplies', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Community Events</h4>
                            <p className="text-gray-400 text-sm">Updates about community events and activities</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.communityEvents}
                              onChange={(e) => handleSettingChange('communityEvents', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Notification Channels */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Notification Channels</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Push Notifications</h4>
                            <p className="text-gray-400 text-sm">Receive notifications in your browser</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.pushNotifications}
                              onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Email Digest</h4>
                          <select
                            value={settings.emailDigest}
                            onChange={(e) => handleSettingChange('emailDigest', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                          >
                            <option value="never">Never</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    {/* Theme Settings */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Theme Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white font-medium mb-3">Theme</h4>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { id: 'light', name: 'Light', icon: Sun },
                              { id: 'dark', name: 'Dark', icon: Moon },
                              { id: 'system', name: 'System', icon: Monitor }
                            ].map((theme) => {
                              const Icon = theme.icon;
                              return (
                                <button
                                  key={theme.id}
                                  onClick={() => handleSettingChange('theme', theme.id)}
                                  className={`p-4 rounded-lg border transition-colors ${
                                    settings.theme === theme.id
                                      ? 'border-blue-500 bg-blue-500/10'
                                      : 'border-gray-700 hover:border-gray-600'
                                  }`}
                                >
                                  <Icon size={20} className="mx-auto mb-2 text-gray-400" />
                                  <div className="text-sm font-medium">{theme.name}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Compact Mode</h4>
                            <p className="text-gray-400 text-sm">Reduce spacing for more content</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.compactMode}
                              onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Show Animations</h4>
                            <p className="text-gray-400 text-sm">Enable smooth transitions and animations</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.showAnimations}
                              onChange={(e) => handleSettingChange('showAnimations', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Language Settings */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Language & Region</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white font-medium mb-2">Language</h4>
                          <select
                            value={settings.language}
                            onChange={(e) => handleSettingChange('language', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                          >
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                            <option value="ja">日本語</option>
                            <option value="zh">中文</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    {/* Security Settings */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                            <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.twoFactorAuth}
                              onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Session Timeout</h4>
                          <select
                            value={settings.sessionTimeout}
                            onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                          >
                            <option value={15}>15 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={120}>2 hours</option>
                            <option value={0}>Never</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Login Alerts</h4>
                            <p className="text-gray-400 text-sm">Get notified of new login attempts</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.loginAlerts}
                              onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Connected Accounts */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Connected Accounts</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Github size={20} className="text-gray-400" />
                            <div>
                              <div className="text-white font-medium">GitHub</div>
                              <div className="text-gray-400 text-sm">Connected to {user?.githubUsername || 'username'}</div>
                            </div>
                          </div>
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                            Manage
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'social' && (
                  <div className="space-y-6">
                    {/* Social Features */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Social Features</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Auto-Accept Matches</h4>
                            <p className="text-gray-400 text-sm">Automatically accept new matches</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.autoAcceptMatches}
                              onChange={(e) => handleSettingChange('autoAcceptMatches', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Show Profile in Search</h4>
                            <p className="text-gray-400 text-sm">Allow others to find your profile</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.showProfileInSearch}
                              onChange={(e) => handleSettingChange('showProfileInSearch', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Allow Project Requests</h4>
                            <p className="text-gray-400 text-sm">Receive requests to join your projects</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.allowProjectRequests}
                              onChange={(e) => handleSettingChange('allowProjectRequests', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'data' && (
                  <div className="space-y-6">
                    {/* Data Management */}
                    <div className="bg-black border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Data Management</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                          <div>
                            <h4 className="text-white font-medium">Export Your Data</h4>
                            <p className="text-gray-400 text-sm">Download a copy of your data</p>
                          </div>
                          <button
                            onClick={handleExportData}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Download size={16} />
                            Export
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-red-900/20 border border-red-700 rounded-lg">
                          <div>
                            <h4 className="text-white font-medium">Delete Account</h4>
                            <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
                          </div>
                          <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={24} className="text-red-400" />
              <h3 className="text-xl font-semibold text-white">Delete Account</h3>
            </div>
            <p className="text-gray-400 mb-6">
              This action cannot be undone. All your data, projects, and connections will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 