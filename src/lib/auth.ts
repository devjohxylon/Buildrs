// Re-export types and functions from the AuthProvider component
export type { User, Badge, UserStats } from '@/components/AuthProvider';
export { useAuth, AuthProvider } from '@/components/AuthProvider';

// Mock API functions for external use
export const authAPI = {
  // Mock profile update API call
  updateProfile: async (updates: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, user: updates };
  }
}; 