'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Heart, 
  Briefcase, 
  MessageSquare, 
  Users, 
  Book,
  Map,
  Settings,
  User,
  LogOut,
  LogIn,
  MessageCircle
} from 'lucide-react';
import { useAuth } from './AuthProvider';
import { FadeIn, AnimatedButton } from '@/lib/animations';

const publicNavigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Docs', href: '/docs', icon: Book },
  { name: 'Roadmap', href: '/roadmap', icon: Map },
];

const authenticatedNavigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Swipe', href: '/swipe', icon: Heart },
  { name: 'Chat', href: '/chat', icon: MessageCircle },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Docs', href: '/docs', icon: Book },
  { name: 'Roadmap', href: '/roadmap', icon: Map },
  { name: 'Settings', href: '/settings', icon: Settings },
];

// Mobile Navigation (Bottom Bar)
export default function Navigation() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Use different navigation items based on auth status
  const navigationItems = isAuthenticated ? authenticatedNavigationItems : publicNavigationItems;
  
  // Don't render navigation until auth state is determined to prevent hydration mismatch
  if (isLoading) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm lg:hidden">
        <div className="max-w-screen-sm mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm lg:hidden">
      <div className="max-w-screen-sm mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {navigationItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <AnimatedButton
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs font-medium">{item.name}</span>
                  {isActive && (
                    <div className="w-1 h-1 bg-white rounded-full" />
                  )}
                </AnimatedButton>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// Desktop Navigation (Sidebar)
export function DesktopNavigation() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  // Use different navigation items based on auth status
  const navigationItems = isAuthenticated ? authenticatedNavigationItems : publicNavigationItems;

  const handleLogout = () => {
    logout();
  };

  // Don't render navigation until auth state is determined to prevent hydration mismatch
  if (isLoading) {
    return (
      <nav className="hidden lg:block fixed top-0 left-0 h-full w-64 z-40 bg-black border-r border-gray-800">
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8">
            <Link href="/" className="text-2xl font-bold text-white">
              Buildrs
            </Link>
            <p className="text-sm text-gray-400 mt-1">Developer Collaboration</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="hidden lg:block fixed top-0 left-0 h-full w-64 z-40 bg-black border-r border-gray-800">
      <div className="p-6 h-full flex flex-col">
        <div className="mb-8">
          <Link href="/" className="text-2xl font-bold text-white">
            Buildrs
          </Link>
          <p className="text-sm text-gray-400 mt-1">Developer Collaboration</p>
        </div>
        
        <div className="space-y-2 flex-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <AnimatedButton
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    isActive 
                      ? 'border-gray-500 bg-gray-800 text-white' 
                      : 'border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </AnimatedButton>
              </Link>
            );
          })}
        </div>

        {/* User Section */}
        <div className="border-t border-gray-700 pt-4">
          {isAuthenticated ? (
            <div className="space-y-2">
              {/* User Info */}
              <div className="p-3 bg-gray-900 rounded-lg border border-gray-700 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{user?.fullName}</p>
                    <p className="text-gray-400 text-xs truncate">@{user?.username}</p>
                  </div>
                </div>
              </div>
              
              {/* Profile Link */}
              <Link href="/profile">
                <AnimatedButton
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    pathname === '/profile'
                      ? 'border-gray-500 bg-gray-800 text-white' 
                      : 'border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <User size={18} />
                  <span className="font-medium">Profile</span>
                </AnimatedButton>
              </Link>
              
              {/* Settings Link */}
              <Link href="/settings">
                <AnimatedButton
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    pathname === '/settings'
                      ? 'border-gray-500 bg-gray-800 text-white' 
                      : 'border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Settings size={18} />
                  <span className="font-medium">Settings</span>
                </AnimatedButton>
              </Link>

              {/* Logout Button */}
              <AnimatedButton
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </AnimatedButton>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Login Link */}
              <Link href="/auth/login">
                <AnimatedButton
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    pathname === '/auth/login'
                      ? 'border-gray-500 bg-gray-800 text-white' 
                      : 'border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <LogIn size={18} />
                  <span className="font-medium">Login with GitHub</span>
                </AnimatedButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 