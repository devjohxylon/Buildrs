export interface GitHubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  company?: string;
  twitter_username?: string;
  hireable?: boolean;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  private: boolean;
  fork: boolean;
  size: number;
  watchers_count: number;
  open_issues_count: number;
  default_branch: string;
  license?: {
    name: string;
    spdx_id: string;
  };
}

export interface GitHubLanguage {
  [key: string]: number;
}

export interface GitHubContribution {
  date: string;
  contributionCount: number;
}

export interface GitHubActivity {
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
  payload: any;
}

export interface EnhancedGitHubStats {
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  following: number;
  topLanguages: Array<{ name: string; bytes: number; percentage: number }>;
  memberSince: string;
  popularRepos: GitHubRepo[];
  recentActivity: GitHubActivity[];
  contributionStats: {
    totalContributions: number;
    longestStreak: number;
    currentStreak: number;
    averagePerDay: number;
  };
  skillTags: string[];
  projectTypes: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export class GitHubAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async fetch(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`https://api.github.com${endpoint}`, {
      headers: {
        'Authorization': `token ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Buildrs-App',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getUser(): Promise<GitHubUser> {
    return this.fetch('/user');
  }

  async getUserByUsername(username: string): Promise<GitHubUser> {
    return this.fetch(`/users/${username}`);
  }

  async getUserRepos(username: string, page: number = 1, perPage: number = 100): Promise<GitHubRepo[]> {
    return this.fetch(`/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated&type=owner`);
  }

  async getRepoLanguages(owner: string, repo: string): Promise<GitHubLanguage> {
    return this.fetch(`/repos/${owner}/${repo}/languages`);
  }

  async getUserLanguages(username: string): Promise<GitHubLanguage> {
    const repos = await this.getUserRepos(username, 1, 100);
    const languages: { [key: string]: number } = {};

    // Process repos in batches to avoid rate limiting
    const batches = [];
    for (let i = 0; i < repos.length; i += 10) {
      batches.push(repos.slice(i, i + 10));
    }

    for (const batch of batches) {
      const promises = batch.map(async repo => {
        if (!repo.fork && !repo.private && repo.language) {
          try {
            return await this.getRepoLanguages(username, repo.name);
          } catch (error) {
            console.warn(`Failed to fetch languages for ${repo.name}:`, error);
            return {};
          }
        }
        return {};
      });

      const batchResults = await Promise.all(promises);
      
      for (const repoLanguages of batchResults) {
        for (const [language, bytes] of Object.entries(repoLanguages)) {
          languages[language] = (languages[language] || 0) + bytes;
        }
      }

      // Small delay to be respectful to GitHub API
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return languages;
  }

  async getTopLanguages(username: string, limit: number = 10): Promise<Array<{ name: string; bytes: number; percentage: number }>> {
    const languages = await this.getUserLanguages(username);
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    
    return Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([name, bytes]) => ({ 
        name, 
        bytes, 
        percentage: Math.round((bytes / totalBytes) * 100) 
      }));
  }

  async getUserActivity(username: string): Promise<GitHubActivity[]> {
    try {
      return await this.fetch(`/users/${username}/events/public?per_page=30`);
    } catch (error) {
      console.warn('Failed to fetch user activity:', error);
      return [];
    }
  }

  async getPopularRepos(username: string, limit: number = 5): Promise<GitHubRepo[]> {
    const repos = await this.getUserRepos(username, 1, 100);
    
    return repos
      .filter(repo => !repo.fork && !repo.private)
      .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
      .slice(0, limit);
  }

  async getEnhancedUserStats(username: string): Promise<EnhancedGitHubStats> {
    const [user, repos, topLanguages, recentActivity, popularRepos] = await Promise.all([
      this.getUserByUsername(username),
      this.getUserRepos(username, 1, 100),
      this.getTopLanguages(username, 10),
      this.getUserActivity(username),
      this.getPopularRepos(username, 5),
    ]);
    
    const totalStars = repos.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum: number, repo: GitHubRepo) => sum + repo.forks_count, 0);
    
    // Generate skill tags from languages and popular repos
    const skillTags = this.generateSkillTags(topLanguages, repos);
    const projectTypes = this.inferProjectTypes(repos);
    const experienceLevel = this.calculateExperienceLevel(user, repos, totalStars);

    // Calculate contribution stats (simplified - in real app you'd use GitHub GraphQL API)
    const contributionStats = this.calculateContributionStats(recentActivity, user.created_at);

    return {
      publicRepos: user.public_repos,
      totalStars,
      totalForks,
      followers: user.followers,
      following: user.following,
      topLanguages,
      memberSince: user.created_at,
      popularRepos,
      recentActivity: recentActivity.slice(0, 10),
      contributionStats,
      skillTags,
      projectTypes,
      experienceLevel,
    };
  }

  private generateSkillTags(topLanguages: Array<{ name: string; bytes: number; percentage: number }>, repos: GitHubRepo[]): string[] {
    const skills = new Set<string>();
    
    // Add programming languages
    topLanguages.forEach(lang => {
      if (lang.percentage >= 5) { // Only include languages with significant usage
        skills.add(lang.name);
      }
    });

    // Add framework/technology detection based on repo topics and names
    const techKeywords = {
      'React': ['react', 'nextjs', 'next.js', 'react-native'],
      'Vue.js': ['vue', 'vuejs', 'nuxt'],
      'Angular': ['angular', 'ng'],
      'Node.js': ['nodejs', 'node', 'express'],
      'Docker': ['docker', 'containerization'],
      'Kubernetes': ['kubernetes', 'k8s'],
      'AWS': ['aws', 'amazon-web-services'],
      'Firebase': ['firebase'],
      'MongoDB': ['mongodb', 'mongo'],
      'PostgreSQL': ['postgresql', 'postgres'],
      'Machine Learning': ['ml', 'machine-learning', 'tensorflow', 'pytorch'],
      'Blockchain': ['blockchain', 'ethereum', 'smart-contracts', 'web3'],
      'Mobile': ['mobile', 'ios', 'android', 'flutter', 'react-native'],
      'Game Development': ['game', 'unity', 'unreal', 'gaming'],
      'DevOps': ['devops', 'ci-cd', 'deployment'],
      'API': ['api', 'rest', 'graphql'],
    };

    repos.forEach(repo => {
      const text = `${repo.name} ${repo.description || ''} ${repo.topics.join(' ')}`.toLowerCase();
      
      Object.entries(techKeywords).forEach(([tech, keywords]) => {
        if (keywords.some(keyword => text.includes(keyword))) {
          skills.add(tech);
        }
      });
    });

    return Array.from(skills);
  }

  private inferProjectTypes(repos: GitHubRepo[]): string[] {
    const types = new Set<string>();
    
    repos.forEach(repo => {
      const text = `${repo.name} ${repo.description || ''} ${repo.topics.join(' ')}`.toLowerCase();
      
      if (text.includes('web') || text.includes('website') || text.includes('frontend') || text.includes('backend')) {
        types.add('web-app');
      }
      if (text.includes('mobile') || text.includes('ios') || text.includes('android') || text.includes('flutter')) {
        types.add('mobile-app');
      }
      if (text.includes('game') || text.includes('unity')) {
        types.add('game');
      }
      if (text.includes('api') || text.includes('service')) {
        types.add('api');
      }
      if (text.includes('library') || text.includes('package') || text.includes('npm')) {
        types.add('library');
      }
      if (text.includes('tool') || text.includes('cli') || text.includes('utility')) {
        types.add('tool');
      }
      if (text.includes('blockchain') || text.includes('crypto') || text.includes('ethereum')) {
        types.add('blockchain');
      }
      if (text.includes('ai') || text.includes('ml') || text.includes('machine-learning')) {
        types.add('ai-ml');
      }
    });

    return Array.from(types);
  }

  private calculateExperienceLevel(user: GitHubUser, repos: GitHubRepo[], totalStars: number): 'beginner' | 'intermediate' | 'advanced' | 'expert' {
    const accountAge = (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365); // Years
    const publicRepos = repos.filter(r => !r.fork).length;
    
    let score = 0;
    
    // Account age factor
    if (accountAge >= 5) score += 3;
    else if (accountAge >= 3) score += 2;
    else if (accountAge >= 1) score += 1;
    
    // Repository count factor
    if (publicRepos >= 50) score += 3;
    else if (publicRepos >= 20) score += 2;
    else if (publicRepos >= 10) score += 1;
    
    // Star count factor
    if (totalStars >= 500) score += 3;
    else if (totalStars >= 100) score += 2;
    else if (totalStars >= 25) score += 1;
    
    // Follower count factor
    if (user.followers >= 500) score += 2;
    else if (user.followers >= 100) score += 1;
    
    // Determine level based on score
    if (score >= 8) return 'expert';
    if (score >= 5) return 'advanced';
    if (score >= 2) return 'intermediate';
    return 'beginner';
  }

  private calculateContributionStats(activity: GitHubActivity[], memberSince: string): {
    totalContributions: number;
    longestStreak: number;
    currentStreak: number;
    averagePerDay: number;
  } {
    // Simplified calculation based on public activity
    // In a real implementation, you'd use GitHub's GraphQL API for accurate contribution data
    
    const contributionEvents = activity.filter(event => 
      ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type)
    );
    
    const totalContributions = contributionEvents.length * 5; // Rough estimate
    const memberDays = Math.floor((Date.now() - new Date(memberSince).getTime()) / (1000 * 60 * 60 * 24));
    const averagePerDay = memberDays > 0 ? totalContributions / memberDays : 0;
    
    return {
      totalContributions,
      longestStreak: 30, // Placeholder
      currentStreak: 5,  // Placeholder
      averagePerDay: Math.round(averagePerDay * 100) / 100,
    };
  }

  // Legacy methods for compatibility
  async getUserStats(username: string) {
    const stats = await this.getEnhancedUserStats(username);
    return {
      publicRepos: stats.publicRepos,
      totalStars: stats.totalStars,
      totalForks: stats.totalForks,
      followers: stats.followers,
      following: stats.following,
      topLanguages: stats.topLanguages,
      memberSince: stats.memberSince,
    };
  }
}

// Utility function to get GitHub data without access token (public data only)
export async function getPublicGitHubData(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Buildrs-App'
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Helper function to convert GitHub data to our Profile format
export function convertGitHubToProfile(githubUser: GitHubUser, githubStats: EnhancedGitHubStats, userId: string): Partial<Profile> {
  return {
    userId,
    name: githubUser.name || githubUser.login,
    bio: githubUser.bio || 'Passionate developer building awesome things.',
    skills: githubStats.skillTags,
    interests: githubStats.projectTypes,
    location: githubUser.location || undefined,
    experienceLevel: githubStats.experienceLevel,
    preferredProjectTypes: githubStats.projectTypes as any[],
    githubUsername: githubUser.login,
    githubId: githubUser.id.toString(),
    isLookingForProjects: true,
    isLookingForCollaborators: true,
  };
} 