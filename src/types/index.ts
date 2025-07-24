export interface User {
  id: string;
  email: string;
  githubId?: string;
  githubUsername?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  bio: string;
  skills: string[];
  interests: string[];
  availability: 'full-time' | 'part-time' | 'weekends' | 'evenings';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  preferredProjectTypes: ProjectType[];
  location?: string;
  timezone?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUsername?: string;
  githubId?: string;
  videoIntroUrl?: string;
  isLookingForProjects: boolean;
  isLookingForCollaborators: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  techStack: string[];
  projectType: ProjectType;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedDuration: string;
  lookingForRoles: string[];
  maxCollaborators: number;
  currentCollaborators: number;
  status: 'recruiting' | 'in-progress' | 'completed' | 'paused';
  repositoryUrl?: string;
  demoUrl?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectType = 
  | 'web-app' 
  | 'mobile-app' 
  | 'desktop-app' 
  | 'game' 
  | 'ai-ml' 
  | 'blockchain' 
  | 'iot' 
  | 'api' 
  | 'library' 
  | 'tool' 
  | 'open-source' 
  | 'startup' 
  | 'hackathon' 
  | 'learning' 
  | 'vr-ar'
  | 'other';

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  matchScore: number;
  projectId?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  createdAt: Date;
  updatedAt: Date;
}

export interface Swipe {
  id: string;
  swiperId: string;
  swipedId: string;
  swipeType: 'profile' | 'project';
  direction: 'left' | 'right';
  createdAt: Date;
}

export interface SwipeCard {
  id: string;
  type: 'profile' | 'project';
  data: Profile | Project;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  messageType: 'text' | 'file' | 'code' | 'voice';
  metadata?: {
    fileName?: string;
    fileSize?: number;
    language?: string;
    duration?: number;
  };
  createdAt: Date;
}

export interface GameificationData {
  userId: string;
  level: number;
  xp: number;
  badges: Badge[];
  streaks: {
    dailySwipes: number;
    projectCompletions: number;
    lastActivity: Date;
  };
  stats: {
    totalSwipes: number;
    totalMatches: number;
    projectsCompleted: number;
    collaborationsStarted: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
}

export interface SwipeDirection {
  direction: 'left' | 'right' | 'up' | 'down';
  velocity: number;
  rotation: number;
}

// Public Project Board Types
export interface PublicProject {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  teamSize: string;
  timeline: string;
  lookingFor: string[];
  repository?: string;
  demo?: string;
  website?: string;
  createdBy: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  status: 'Open' | 'In Progress' | 'Completed' | 'Paused';
  tags: string[];
  collaborators: string[];
  applications: number;
  likes: number;
  views: number;
}

export interface ProjectFilter {
  category?: string;
  techStack?: string[];
  difficulty?: string;
  status?: string;
  tags?: string[];
  search?: string;
}

// Forum Types
export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  threadCount: number;
  latestPost?: {
    id: string;
    title: string;
    author: string;
    timestamp: Date;
  };
}

export interface ForumThread {
  id: string;
  title: string;
  description: string;
  category: string;
  author: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    reputation: number;
  };
  createdAt: Date;
  updatedAt: Date;
  replies: number;
  views: number;
  likes: number;
  isPinned: boolean;
  isLocked: boolean;
  isSolved: boolean;
  tags: string[];
  lastReply?: {
    author: string;
    timestamp: Date;
  };
}

export interface ForumPost {
  id: string;
  threadId: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    reputation: number;
  };
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  isAcceptedAnswer: boolean;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    reputation: number;
  };
  createdAt: Date;
  likes: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
} 