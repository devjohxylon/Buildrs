'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  githubId?: string;
  githubUsername?: string;
  fullName?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  githubStats?: {
    repos: number;
    followers: number;
    following: number;
  };
  github?: {
    username: string;
    url: string;
  };
  website?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: (session.user as any).id || session.user.email || '',
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || '',
        githubId: (session.user as any).githubId,
        githubUsername: (session.user as any).githubUsername,
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const handleSignIn = () => {
    signIn('github', { callbackUrl: '/' });
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading: status === 'loading',
    signIn: handleSignIn,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 