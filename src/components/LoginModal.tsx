import React from 'react';
import { motion } from 'framer-motion';
import { Github, X, Lock, Users, MessageSquare, Heart } from 'lucide-react';
import { useAuth } from './AuthProvider';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: 'swipe' | 'chat' | 'forums' | 'general';
}

export default function LoginModal({ isOpen, onClose, feature = 'general' }: LoginModalProps) {
  const { login } = useAuth();

  const featureInfo = {
    swipe: {
      title: 'Start Swiping',
      description: 'Connect with developers and discover amazing projects',
      icon: Heart,
      benefits: [
        'Browse developer profiles',
        'Discover new projects',
        'Make meaningful connections'
      ]
    },
    chat: {
      title: 'Join the Conversation',
      description: 'Chat with your matches and collaborate on projects',
      icon: MessageSquare,
      benefits: [
        'Message your matches',
        'Discuss project ideas',
        'Plan collaborations'
      ]
    },
    forums: {
      title: 'Join the Community',
      description: 'Participate in discussions and share your knowledge',
      icon: Users,
      benefits: [
        'Create forum threads',
        'Share your expertise',
        'Learn from others'
      ]
    },
    general: {
      title: 'Welcome to Buildrs',
      description: 'Join the developer community for collaboration and growth',
      icon: Lock,
      benefits: [
        'Connect with developers',
        'Discover projects',
        'Build amazing things together'
      ]
    }
  };

  const currentFeature = featureInfo[feature];
  const Icon = currentFeature.icon;

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-6"
    >
      <div className="max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full bg-gray-800/80"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="terminal p-8 text-center rounded-xl border border-blue-500/30 bg-black/95">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Icon size={48} className="text-blue-400 mx-auto mb-4" />
            
            <h2 className="text-2xl font-bold title-text mb-2">
              {currentFeature.title}
            </h2>
            
            <p className="text-gray-300 text-sm mb-6 terminal-text">
              {currentFeature.description}
            </p>

            <div className="space-y-2 mb-6 text-left">
              {currentFeature.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-green-400 text-sm">●</span>
                  <span className="text-gray-200 terminal-text text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  login();
                  onClose();
                }}
                className="w-full btn btn-primary flex items-center justify-center gap-3 py-3 font-semibold"
              >
                <Github size={20} />
                Continue with GitHub
              </button>
              
              <button
                onClick={onClose}
                className="w-full btn btn-secondary py-2 text-sm"
              >
                Maybe Later
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-xs terminal-text">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 