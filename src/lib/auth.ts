// Re-export types and functions from the AuthProvider component
export type { User, Badge, UserStats } from '@/components/AuthProvider';
export { useAuth, AuthProvider } from '@/components/AuthProvider';

// Mock API functions for external use
export const authAPI = {
  // Mock login API call
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, user: { email } };
  },

  // Mock register API call
  register: async (userData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { 
      success: true, 
      user: {
        id: Date.now(),
        username: userData.username,
        fullName: userData.fullName,
        email: userData.email,
        joinedDate: new Date().toISOString().split('T')[0]
      }
    };
  },

  // Mock logout API call
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },

  // Mock profile update API call
  updateProfile: async (updates: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, user: updates };
  }
}; 