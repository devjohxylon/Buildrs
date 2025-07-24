import { SwipeCard, Profile, Project, Match, Swipe } from '@/types';
import { validateUserInput, sanitizeObject, RateLimiter } from './security';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API response wrapper
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  status?: number;
}

// Rate limiter instance
const rateLimiter = new RateLimiter(100, 15 * 60 * 1000); // 100 requests per 15 minutes

class APIService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      // Rate limiting check
      const clientId = this.getClientId();
      if (!rateLimiter.isAllowed(clientId)) {
        return {
          success: false,
          error: 'Rate limit exceeded. Please try again later.',
          status: 429,
        };
      }

      // Validate and sanitize request body
      if (options.body && typeof options.body === 'string') {
        try {
          const parsedBody = JSON.parse(options.body);
          const sanitizedBody = sanitizeObject(parsedBody);
          options.body = JSON.stringify(sanitizedBody);
        } catch (error) {
          console.error('Invalid request body:', error);
          return {
            success: false,
            error: 'Invalid request data',
            status: 400,
          };
        }
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...options.headers,
        },
        ...options,
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error('Failed to parse response:', error);
        return {
          success: false,
          error: 'Invalid response format',
          status: response.status,
        };
      }

      if (!response.ok) {
        return {
          success: false,
          error: data.message || data.error || `HTTP ${response.status}`,
          status: response.status,
        };
      }

      return {
        success: true,
        data,
        status: response.status,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
        status: 0,
      };
    }
  }

  private getClientId(): string {
    // In a real app, this would be based on user session or IP
    if (typeof window !== 'undefined') {
      return localStorage.getItem('client_id') || 'anonymous';
    }
    return 'server';
  }

  // Swipe Management
  async recordSwipe(
    swiperId: string,
    swipedId: string,
    swipeType: 'profile' | 'project',
    direction: 'left' | 'right'
  ): Promise<ApiResponse<{ matched: boolean; matchId?: string }>> {
    // Validate inputs
    if (!validateUserInput(swiperId, 'text') || !validateUserInput(swipedId, 'text')) {
      return {
        success: false,
        error: 'Invalid user IDs',
        status: 400,
      };
    }

    if (!['profile', 'project'].includes(swipeType) || !['left', 'right'].includes(direction)) {
      return {
        success: false,
        error: 'Invalid swipe parameters',
        status: 400,
      };
    }

    return this.request('/api/swipes', {
      method: 'POST',
      body: JSON.stringify({
        swiperId,
        swipedId,
        swipeType,
        direction,
      }),
    });
  }

  async getSwipeHistory(userId: string): Promise<ApiResponse<Swipe[]>> {
    if (!validateUserInput(userId, 'text')) {
      return {
        success: false,
        error: 'Invalid user ID',
        status: 400,
      };
    }

    return this.request(`/api/swipes/history/${userId}`);
  }

  // Get personalized swipe cards
  async getPersonalizedCards(
    userId: string,
    type: 'profile' | 'project' | 'mixed' = 'mixed',
    limit: number = 20
  ): Promise<ApiResponse<SwipeCard[]>> {
    if (!validateUserInput(userId, 'text')) {
      return {
        success: false,
        error: 'Invalid user ID',
        status: 400,
      };
    }

    if (!['profile', 'project', 'mixed'].includes(type)) {
      return {
        success: false,
        error: 'Invalid card type',
        status: 400,
      };
    }

    if (limit < 1 || limit > 100) {
      return {
        success: false,
        error: 'Invalid limit (must be between 1 and 100)',
        status: 400,
      };
    }

    return this.request(`/api/swipes/cards?userId=${userId}&type=${type}&limit=${limit}`);
  }

  // Match Management
  async getMatches(userId: string): Promise<ApiResponse<Match[]>> {
    if (!validateUserInput(userId, 'text')) {
      return {
        success: false,
        error: 'Invalid user ID',
        status: 400,
      };
    }

    return this.request(`/api/matches/${userId}`);
  }

  async updateMatchStatus(
    matchId: string,
    status: 'accepted' | 'rejected'
  ): Promise<ApiResponse<Match>> {
    if (!validateUserInput(matchId, 'text')) {
      return {
        success: false,
        error: 'Invalid match ID',
        status: 400,
      };
    }

    if (!['accepted', 'rejected'].includes(status)) {
      return {
        success: false,
        error: 'Invalid status',
        status: 400,
      };
    }

    return this.request(`/api/matches/${matchId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // User Profile Management
  async updateUserProfile(userId: string, profileData: Partial<Profile>): Promise<ApiResponse<Profile>> {
    if (!validateUserInput(userId, 'text')) {
      return {
        success: false,
        error: 'Invalid user ID',
        status: 400,
      };
    }

    // Validate and sanitize profile data
    const allowedFields = ['name', 'bio', 'location', 'website', 'skills', 'experience'];
    const sanitizedData = sanitizeObject(profileData, allowedFields);

    return this.request(`/api/users/${userId}/profile`, {
      method: 'PATCH',
      body: JSON.stringify(sanitizedData),
    });
  }

  async getUserProfile(userId: string): Promise<ApiResponse<Profile>> {
    if (!validateUserInput(userId, 'text')) {
      return {
        success: false,
        error: 'Invalid user ID',
        status: 400,
      };
    }

    return this.request(`/api/users/${userId}/profile`);
  }

  // Project Management
  async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Project>> {
    // Validate required fields
    if (!validateUserInput(projectData.title, 'text') || !validateUserInput(projectData.description, 'text')) {
      return {
        success: false,
        error: 'Project title and description are required',
        status: 400,
      };
    }

    const allowedFields = ['title', 'description', 'techStack', 'repositoryUrl', 'demoUrl', 'projectType', 'difficulty', 'estimatedDuration', 'lookingForRoles', 'maxCollaborators', 'tags'];
    const sanitizedData = sanitizeObject(projectData, allowedFields);

    return this.request('/api/projects', {
      method: 'POST',
      body: JSON.stringify(sanitizedData),
    });
  }

  async getUserProjects(userId: string): Promise<ApiResponse<Project[]>> {
    if (!validateUserInput(userId, 'text')) {
      return {
        success: false,
        error: 'Invalid user ID',
        status: 400,
      };
    }

    return this.request(`/api/users/${userId}/projects`);
  }

  async getProject(projectId: string): Promise<ApiResponse<Project>> {
    if (!validateUserInput(projectId, 'text')) {
      return {
        success: false,
        error: 'Invalid project ID',
        status: 400,
      };
    }

    return this.request(`/api/projects/${projectId}`);
  }

  async updateProject(projectId: string, projectData: Partial<Project>): Promise<ApiResponse<Project>> {
    if (!validateUserInput(projectId, 'text')) {
      return {
        success: false,
        error: 'Invalid project ID',
        status: 400,
      };
    }

    const allowedFields = ['title', 'description', 'techStack', 'repositoryUrl', 'demoUrl', 'projectType', 'difficulty', 'estimatedDuration', 'lookingForRoles', 'maxCollaborators', 'tags'];
    const sanitizedData = sanitizeObject(projectData, allowedFields);

    return this.request(`/api/projects/${projectId}`, {
      method: 'PATCH',
      body: JSON.stringify(sanitizedData),
    });
  }

  // GitHub Integration
  async syncGitHubData(userId: string, accessToken: string): Promise<ApiResponse<Profile>> {
    if (!validateUserInput(userId, 'text') || !validateUserInput(accessToken, 'text')) {
      return {
        success: false,
        error: 'Invalid user ID or access token',
        status: 400,
      };
    }

    return this.request(`/api/users/${userId}/github-sync`, {
      method: 'POST',
      body: JSON.stringify({ accessToken }),
    });
  }

  // Recommendations
  async getRecommendations(userId: string, type: 'projects' | 'collaborators'): Promise<ApiResponse<SwipeCard[]>> {
    if (!validateUserInput(userId, 'text')) {
      return {
        success: false,
        error: 'Invalid user ID',
        status: 400,
      };
    }

    if (!['projects', 'collaborators'].includes(type)) {
      return {
        success: false,
        error: 'Invalid recommendation type',
        status: 400,
      };
    }

    return this.request(`/api/recommendations/${userId}?type=${type}`);
  }

  // Analytics
  async getSwipeStats(userId: string): Promise<ApiResponse<{
    totalSwipes: number;
    totalMatches: number;
    swipeHistory: Array<{ date: string; swipes: number; matches: number }>;
  }>> {
    if (!validateUserInput(userId, 'text')) {
      return {
        success: false,
        error: 'Invalid user ID',
        status: 400,
      };
    }

    return this.request(`/api/analytics/${userId}/swipe-stats`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request('/api/health');
  }
}

// Local storage for offline functionality
export class LocalSwipeStorage {
  private static SWIPE_HISTORY_KEY = 'buildrs_swipe_history';
  private static MATCH_QUEUE_KEY = 'buildrs_match_queue';
  private static USER_PREFERENCES_KEY = 'buildrs_user_preferences';

  static saveSwipe(swipe: Omit<Swipe, 'id'>) {
    try {
      const history = this.getSwipeHistory();
      const newSwipe = {
        ...swipe,
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
      };
      history.push(newSwipe);
      
      // Keep only last 100 swipes
      if (history.length > 100) {
        history.splice(0, history.length - 100);
      }
      
      localStorage.setItem(this.SWIPE_HISTORY_KEY, JSON.stringify(history));
      return newSwipe;
    } catch (error) {
      console.error('Failed to save swipe locally:', error);
      return null;
    }
  }

  static getSwipeHistory(): Swipe[] {
    try {
      const stored = localStorage.getItem(this.SWIPE_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get swipe history:', error);
      return [];
    }
  }

  static hasSwipedOn(swiperId: string, swipedId: string, swipeType: 'profile' | 'project'): boolean {
    try {
      const history = this.getSwipeHistory();
      return history.some(swipe => 
        swipe.swiperId === swiperId && 
        swipe.swipedId === swipedId && 
        swipe.swipeType === swipeType
      );
    } catch (error) {
      console.error('Failed to check swipe history:', error);
      return false;
    }
  }

  static queueMatch(matchData: any) {
    try {
      const queue = this.getMatchQueue();
      queue.push({
        ...matchData,
        queuedAt: new Date().toISOString(),
      });
      localStorage.setItem(this.MATCH_QUEUE_KEY, JSON.stringify(queue));
    } catch (error) {
      console.error('Failed to queue match:', error);
    }
  }

  static getMatchQueue(): any[] {
    try {
      const stored = localStorage.getItem(this.MATCH_QUEUE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get match queue:', error);
      return [];
    }
  }

  static clearMatchQueue() {
    try {
      localStorage.removeItem(this.MATCH_QUEUE_KEY);
    } catch (error) {
      console.error('Failed to clear match queue:', error);
    }
  }

  static saveUserPreferences(preferences: Record<string, any>) {
    try {
      localStorage.setItem(this.USER_PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save user preferences:', error);
    }
  }

  static getUserPreferences(): Record<string, any> {
    try {
      const stored = localStorage.getItem(this.USER_PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to get user preferences:', error);
      return {};
    }
  }
}

// Matching algorithm with improved performance
export class MatchingAlgorithm {
  private static compatibilityCache = new Map<string, number>();

  static calculateCompatibilityScore(user: Profile, target: Profile | Project): number {
    const cacheKey = `${user.id}_${target.id}`;
    
    if (this.compatibilityCache.has(cacheKey)) {
      return this.compatibilityCache.get(cacheKey)!;
    }

    let score = 0;
    const maxScore = 100;

    // Skills compatibility (40% weight)
    if ('skills' in target && Array.isArray(target.skills)) {
      const userSkills = new Set(user.skills.map(s => s.toLowerCase()));
      const targetSkills = new Set(target.skills.map(s => s.toLowerCase()));
      const commonSkills = [...userSkills].filter(skill => targetSkills.has(skill));
      const skillScore = (commonSkills.length / Math.max(userSkills.size, targetSkills.size)) * 40;
      score += skillScore;
    }

    // Experience level compatibility (20% weight)
    if ('experienceLevel' in target && target.experienceLevel) {
      const experienceLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
      const userLevel = experienceLevels.indexOf(user.experienceLevel);
      const targetLevel = experienceLevels.indexOf(target.experienceLevel);
      const expDiff = Math.abs(userLevel - targetLevel);
      const expScore = Math.max(0, 20 - (expDiff * 5));
      score += expScore;
    }

    // Location compatibility (15% weight)
    if ('location' in target && target.location && user.location) {
      const userLocation = user.location.toLowerCase();
      const targetLocation = target.location.toLowerCase();
      if (userLocation === targetLocation) {
        score += 15;
      } else if (userLocation.includes(targetLocation) || targetLocation.includes(userLocation)) {
        score += 10;
      }
    }

    // Project type compatibility (15% weight)
    if ('preferredProjectTypes' in target && Array.isArray(target.preferredProjectTypes)) {
      const userProjectTypes = new Set(user.preferredProjectTypes?.map((p: string) => p.toLowerCase()) || []);
      const targetProjectTypes = new Set(target.preferredProjectTypes.map((p: string) => p.toLowerCase()));
      const commonTypes = [...userProjectTypes].filter(type => targetProjectTypes.has(type));
      const typeScore = (commonTypes.length / Math.max(userProjectTypes.size, targetProjectTypes.size)) * 15;
      score += typeScore;
    }

    // Availability compatibility (10% weight)
    if ('availability' in target && target.availability) {
      if (user.availability === target.availability) {
        score += 10;
      }
    }

    // Cache the result
    this.compatibilityCache.set(cacheKey, Math.round(score));
    return Math.round(score);
  }



  static shouldShowCard(user: Profile, card: SwipeCard): boolean {
    // Check if user has already swiped on this card
    if (LocalSwipeStorage.hasSwipedOn(user.id, card.id, card.type)) {
      return false;
    }

    // Check compatibility threshold
    const compatibility = this.calculateCompatibilityScore(user, card.data);
    return compatibility >= 30; // Minimum 30% compatibility
  }

  static sortCardsByCompatibility(user: Profile, cards: SwipeCard[]): SwipeCard[] {
    return cards
      .filter(card => this.shouldShowCard(user, card))
      .sort((a, b) => {
        const scoreA = this.calculateCompatibilityScore(user, a.data);
        const scoreB = this.calculateCompatibilityScore(user, b.data);
        return scoreB - scoreA; // Sort by highest compatibility first
      });
  }

  static clearCache() {
    this.compatibilityCache.clear();
  }
}

// Export the main API service instance
export const apiService = new APIService(); 