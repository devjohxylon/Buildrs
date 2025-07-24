'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { GitHubAPI, GitHubUser } from '@/lib/github';

// Extended user interface with GitHub data
export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  github: string;
  joinedDate: string;
  experience: string;
  skills: string[];
  badges: Badge[];
  stats: UserStats;
  githubData?: GitHubUser;
  githubStats?: {
    publicRepos: number;
    totalStars: number;
    totalForks: number;
    followers: number;
    following: number;
    topLanguages: Array<{ name: string; bytes: number; percentage?: number }>;
    memberSince: string;
    contributionStats?: {
      totalContributions: number;
      currentStreak: number;
      averagePerDay: number;
    };
    popularRepos?: Array<{
      id: string | number;
      name: string;
      description?: string;
      language?: string;
      stargazers_count: number;
      forks_count: number;
      html_url: string;
    }>;
    recentActivity?: Array<{
      type: string;
      repo: string;
      date: string;
    }>;
    experienceLevel?: string;
    skillTags?: string[];
    projectTypes?: string[];
  };
}

export interface Badge {
  id: number;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface UserStats {
  projects: number;
  collaborations: number;
  followers: number;
  following: number;
  reputation: number;
}

// Mock user data for fallback
const mockUser = null; // Removed mock data for production

// Auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
  refreshGitHubData: () => Promise<void>;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Convert NextAuth session to our User format
  const convertSessionToUser = async (session: any): Promise<User> => {
    if (!session?.user) {
      throw new Error('No session user data');
    }

    const baseUser: User = {
      id: parseInt(session.user.githubId || '1'),
      username: session.user.githubUsername || 'unknown',
      fullName: session.user.name || 'Unknown User',
      email: session.user.email || '',
      avatar: session.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name || 'User')}&background=1f2937&color=fff&size=150`,
      bio: 'Passionate developer building awesome things.',
      location: 'Unknown',
      website: '',
      github: `https://github.com/${session.user.githubUsername}`,
      joinedDate: new Date().toISOString().split('T')[0],
      experience: '0 years',
      skills: [],
      badges: [
        { id: 1, name: 'Early Adopter', icon: '🌟', color: 'bg-yellow-500', description: 'Joined in the first month' }
      ],
      stats: {
        projects: 0,
        collaborations: 0,
        followers: 0,
        following: 0,
        reputation: 0
      }
    };

    // Fetch GitHub data if we have an access token
    if (session.accessToken && session.user.githubUsername) {
      try {
        const githubAPI = new GitHubAPI(session.accessToken);
        const githubUser = await githubAPI.getUser();
        const enhancedStats = await githubAPI.getEnhancedUserStats(session.user.githubUsername);

        // Create enhanced user profile with GitHub data
        const updatedUser: User = {
          ...baseUser,
          fullName: githubUser.name || baseUser.fullName,
          email: githubUser.email || baseUser.email,
          avatar: githubUser.avatar_url,
          bio: githubUser.bio || baseUser.bio,
          location: githubUser.location || baseUser.location,
          website: githubUser.blog || baseUser.website,
          joinedDate: githubUser.created_at.split('T')[0],
          experience: `${enhancedStats.experienceLevel} (${Math.floor((Date.now() - new Date(githubUser.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365))} years on GitHub)`,
          skills: enhancedStats.skillTags,
          githubData: githubUser,
          githubStats: {
            publicRepos: enhancedStats.publicRepos,
            totalStars: enhancedStats.totalStars,
            totalForks: enhancedStats.totalForks,
            followers: enhancedStats.followers,
            following: enhancedStats.following,
            topLanguages: enhancedStats.topLanguages,
            memberSince: enhancedStats.memberSince,
            contributionStats: enhancedStats.contributionStats,
            popularRepos: enhancedStats.popularRepos,
            recentActivity: enhancedStats.recentActivity,
            experienceLevel: enhancedStats.experienceLevel,
            skillTags: enhancedStats.skillTags,
            projectTypes: enhancedStats.projectTypes,
          },
          stats: {
            projects: enhancedStats.publicRepos,
            collaborations: 0, // This would come from our database
            followers: enhancedStats.followers,
            following: enhancedStats.following,
            reputation: Math.floor(enhancedStats.totalStars * 10 + enhancedStats.followers * 5 + enhancedStats.contributionStats.totalContributions * 2)
          },
          badges: [
            { id: 1, name: 'Early Adopter', icon: '🌟', color: 'bg-yellow-500', description: 'Joined in the first month' },
            ...(enhancedStats.totalStars >= 100 ? [{ id: 2, name: 'Popular Creator', icon: '⭐', color: 'bg-purple-500', description: '100+ GitHub stars' }] : []),
            ...(enhancedStats.publicRepos >= 50 ? [{ id: 3, name: 'Prolific Builder', icon: '🔨', color: 'bg-blue-500', description: '50+ public repositories' }] : []),
            ...(enhancedStats.followers >= 100 ? [{ id: 4, name: 'Community Leader', icon: '👥', color: 'bg-green-500', description: '100+ GitHub followers' }] : []),
            ...(enhancedStats.experienceLevel === 'expert' ? [{ id: 5, name: 'Code Master', icon: '🎯', color: 'bg-red-500', description: 'Expert-level developer' }] : []),
            ...(enhancedStats.contributionStats.totalContributions >= 1000 ? [{ id: 6, name: 'Active Contributor', icon: '🚀', color: 'bg-indigo-500', description: '1000+ contributions' }] : []),
          ]
        };

        return updatedUser;
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return baseUser;
      }
    }

    return baseUser;
  };

  // Update user when session changes
  useEffect(() => {
    const updateUser = async () => {
      if (status === 'loading') {
        setIsLoading(true);
        return;
      }

      if (status === 'authenticated' && session) {
        try {
          const userData = await convertSessionToUser(session);
          setUser(userData);
          localStorage.setItem('buildrs_user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error converting session to user:', error);
          setUser(mockUser);
        }
      } else if (status === 'unauthenticated') {
        // Check for saved user data
        const savedUser = localStorage.getItem('buildrs_user');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (error) {
            console.error('Error parsing saved user:', error);
            localStorage.removeItem('buildrs_user');
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    updateUser();
  }, [session, status]);

  // Login function
  const login = async (): Promise<void> => {
    await signIn('github', { callbackUrl: '/' });
  };

  // Logout function
  const logout = async (): Promise<void> => {
    await signOut({ callbackUrl: '/' });
    setUser(null);
    localStorage.removeItem('buildrs_user');
  };

  // Update profile function
  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('buildrs_user', JSON.stringify(updatedUser));
    }
  };

  // Refresh GitHub data
  const refreshGitHubData = async (): Promise<void> => {
    if (session?.accessToken && session?.user?.githubUsername) {
      try {
        const githubAPI = new GitHubAPI(session.accessToken);
        const githubUser = await githubAPI.getUser();
        const enhancedStats = await githubAPI.getEnhancedUserStats(session.user.githubUsername);

        if (user) {
          const updatedUser: User = {
            ...user,
            fullName: githubUser.name || user.fullName,
            email: githubUser.email || user.email,
            avatar: githubUser.avatar_url,
            bio: githubUser.bio || user.bio,
            location: githubUser.location || user.location,
            website: githubUser.blog || user.website,
            githubData: githubUser,
            githubStats: {
              publicRepos: enhancedStats.publicRepos,
              totalStars: enhancedStats.totalStars,
              totalForks: enhancedStats.totalForks,
              followers: enhancedStats.followers,
              following: enhancedStats.following,
              topLanguages: enhancedStats.topLanguages,
              memberSince: enhancedStats.memberSince,
              contributionStats: enhancedStats.contributionStats,
              popularRepos: enhancedStats.popularRepos,
              recentActivity: enhancedStats.recentActivity,
              experienceLevel: enhancedStats.experienceLevel,
              skillTags: enhancedStats.skillTags,
              projectTypes: enhancedStats.projectTypes,
            },
            stats: {
              ...user.stats,
              projects: enhancedStats.publicRepos,
              followers: enhancedStats.followers,
              following: enhancedStats.following,
              reputation: Math.floor(enhancedStats.totalStars * 10 + enhancedStats.followers * 5 + enhancedStats.contributionStats.totalContributions * 2)
            },
            skills: enhancedStats.skillTags,
            badges: [
              { id: 1, name: 'Early Adopter', icon: '🌟', color: 'bg-yellow-500', description: 'Joined in the first month' },
              ...(enhancedStats.totalStars >= 100 ? [{ id: 2, name: 'Popular Creator', icon: '⭐', color: 'bg-purple-500', description: '100+ GitHub stars' }] : []),
              ...(enhancedStats.publicRepos >= 50 ? [{ id: 3, name: 'Prolific Builder', icon: '🔨', color: 'bg-blue-500', description: '50+ public repositories' }] : []),
              ...(enhancedStats.followers >= 100 ? [{ id: 4, name: 'Community Leader', icon: '👥', color: 'bg-green-500', description: '100+ GitHub followers' }] : []),
              ...(enhancedStats.experienceLevel === 'expert' ? [{ id: 5, name: 'Code Master', icon: '🎯', color: 'bg-red-500', description: 'Expert-level developer' }] : []),
              ...(enhancedStats.contributionStats.totalContributions >= 1000 ? [{ id: 6, name: 'Active Contributor', icon: '🚀', color: 'bg-indigo-500', description: '1000+ contributions' }] : []),
            ]
          };

          setUser(updatedUser);
          localStorage.setItem('buildrs_user', JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error('Error refreshing GitHub data:', error);
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateProfile,
    refreshGitHubData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 