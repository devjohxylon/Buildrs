'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from './LoginModal';
import {
  Send,
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  FileText,
  Image,
  Smile,
  Paperclip,
  X,
  Check,
  CheckCheck,
  Clock,
  User,
  MessageCircle,
  Download,
  File,
  FileImage,
  FileVideo,
  FileAudio,
  AlertCircle,
  Upload,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  Shield,
  VolumeX,
  Flag,
  Ban,
  Settings,
  Eye,
  EyeOff,
  Heart,
  Trash2
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
  file?: {
    name: string;
    size: number;
    type: string;
    url?: string;
    uploadProgress?: number;
  };
}

interface ChatMatch {
  id: string;
  matchedAt: Date;
  otherUser: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    githubUsername?: string;
    isOnline: boolean;
    lastSeen?: Date;
  };
  lastMessage?: {
    content: string;
    timestamp: Date;
    senderId: string;
  };
  unreadCount: number;
}

interface ChatInterfaceProps {
  matchId?: string;
  onBack: () => void;
}

// Emoji data
const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
  '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
  '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
  '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😯', '😦', '😧',
  '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢',
  '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '💩', '🤡', '👹',
  '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼'
];

export default function ChatInterface({ matchId, onBack }: ChatInterfaceProps) {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<ChatMatch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messageCounter, setMessageCounter] = useState(6);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [mutedUsers, setMutedUsers] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUnmatchModal, setShowUnmatchModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  
  const currentUserId = user?.id || 'user-1';

  // Production data - replace with actual API calls
  const match: any = null;

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentMatch(match);
      setMessages(mockMessages);
      setIsLoading(false);
    }, 1000);
  }, [matchId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showUserMenu && !target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  // Drag and drop handlers
  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return () => {}; // Return empty cleanup function

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      
      const files = Array.from(e.dataTransfer?.files || []);
      if (files.length > 0) {
        handleFiles(files);
      }
    };

    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);

    return () => {
      dropZone.removeEventListener('dragover', handleDragOver);
      dropZone.removeEventListener('dragleave', handleDragLeave);
      dropZone.removeEventListener('drop', handleDrop);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentMatch) return;

    const message: Message = {
      id: `msg-${messageCounter}`,
      senderId: currentUserId,
      senderName: user?.name || 'You',
      senderAvatar: user?.avatar,
      content: newMessage.trim(),
      timestamp: new Date(),
      status: 'sending',
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setMessageCounter(prev => prev + 1);
    setNewMessage('');

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      );
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setUploadingFiles(prev => [...prev, ...files]);

    for (const file of files) {
      const messageId = `msg-${messageCounter}`;
      setMessageCounter(prev => prev + 1);

      const message: Message = {
        id: messageId,
        senderId: currentUserId,
        senderName: user?.name || 'You',
        senderAvatar: user?.avatar,
        content: `Sending ${file.name}...`,
        timestamp: new Date(),
        status: 'sending',
        type: file.type.startsWith('image/') ? 'image' : 'file',
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          uploadProgress: 0
        }
      };

      setMessages(prev => [...prev, message]);

      // Simulate file upload with progress
      await simulateFileUpload(messageId, file);
    }

    setUploadingFiles(prev => prev.filter(f => !files.includes(f)));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    await handleFiles(files);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateFileUpload = async (messageId: string, file: File) => {
    const totalSteps = 10;
    
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { 
                ...msg, 
                file: msg.file ? { ...msg.file, uploadProgress: (i / totalSteps) * 100 } : undefined,
                content: `Uploading ${file.name}... ${Math.round((i / totalSteps) * 100)}%`
              }
            : msg
        )
      );
    }

    // Upload complete
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              status: 'sent' as const,
              content: file.type.startsWith('image/') ? '📷 Image sent' : '📎 File sent',
              file: msg.file ? { 
                ...msg.file, 
                uploadProgress: 100,
                url: URL.createObjectURL(file)
              } : undefined
            }
          : msg
      )
    );
  };

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    // Remove the line that closes the emoji picker
    // setShowEmojiPicker(false);
  };

  const openImage = (url: string, name: string) => {
    console.log('openImage called with:', url, name);
    setSelectedImage({ url, name });
    setImageScale(1);
    setImageRotation(0);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const zoomIn = () => {
    setImageScale(prev => Math.min(prev + 0.25, 5)); // Increased max zoom to 500%
  };

  const zoomOut = () => {
    setImageScale(prev => Math.max(prev - 0.25, 0.25)); // Decreased min zoom to 25%
  };

  const rotateImage = () => {
    setImageRotation(prev => prev + 90);
  };

  const downloadFile = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <FileImage size={20} />;
    if (fileType.startsWith('video/')) return <FileVideo size={20} />;
    if (fileType.startsWith('audio/')) return <FileAudio size={20} />;
    return <File size={20} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock size={12} className="text-gray-400" />;
      case 'sent':
        return <Check size={12} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={12} className="text-blue-400" />;
      case 'read':
        return <CheckCheck size={12} className="text-green-400" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Social features functions
  const isUserBlocked = (userId: string) => blockedUsers.includes(userId);
  const isUserMuted = (userId: string) => mutedUsers.includes(userId);

  const handleBlockUser = (userId: string) => {
    setBlockedUsers(prev => [...prev, userId]);
    setShowUserMenu(false);
    // In a real app, this would call an API
    console.log(`Blocked user: ${userId}`);
  };

  const handleUnblockUser = (userId: string) => {
    setBlockedUsers(prev => prev.filter(id => id !== userId));
    setShowUserMenu(false);
    console.log(`Unblocked user: ${userId}`);
  };

  const handleMuteUser = (userId: string) => {
    setMutedUsers(prev => [...prev, userId]);
    setShowUserMenu(false);
    console.log(`Muted user: ${userId}`);
  };

  const handleUnmuteUser = (userId: string) => {
    setMutedUsers(prev => prev.filter(id => id !== userId));
    setShowUserMenu(false);
    console.log(`Unmuted user: ${userId}`);
  };

  const handleReportUser = () => {
    setShowReportModal(true);
    setShowUserMenu(false);
  };

  const submitReport = () => {
    if (reportReason.trim()) {
      console.log(`Reported user: ${currentMatch?.otherUser.id} for: ${reportReason}`);
      setReportReason('');
      setShowReportModal(false);
    }
  };

  const handleDeleteChat = () => {
    console.log(`Deleted chat with: ${currentMatch?.otherUser.id}`);
    setShowDeleteModal(false);
    onBack(); // Go back to chat list
  };

  const handleUnmatch = () => {
    console.log(`Unmatched with: ${currentMatch?.otherUser.id}`);
    setShowUnmatchModal(false);
    onBack(); // Go back to chat list
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!currentMatch) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <MessageCircle size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No match found</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-6xl mb-4">Login Required</div>
            <h1 className="text-2xl font-bold mb-4">Join Buildrs to start chatting</h1>
            <p className="text-gray-400 mb-6">
              Connect with your matches and collaborate on projects.
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
          feature="chat"
        />
      </>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Chat Header */}
      <motion.div 
        className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-white" />
          </motion.button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                {currentMatch.otherUser.name.charAt(0)}
              </div>
              {currentMatch.otherUser.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold">{currentMatch.otherUser.name}</h3>
                {isUserBlocked(currentMatch.otherUser.id) && (
                  <Ban size={14} className="text-red-400" title="Blocked" />
                )}
                {isUserMuted(currentMatch.otherUser.id) && (
                  <VolumeX size={14} className="text-yellow-400" title="Muted" />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">{currentMatch.otherUser.role}</span>
                <span className="text-gray-500">•</span>
                <span className={`text-xs ${currentMatch.otherUser.isOnline ? 'text-green-400' : 'text-gray-500'}`}>
                  {currentMatch.otherUser.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Voice Call"
          >
            <Phone size={18} className="text-gray-400" />
          </motion.button>
          
          <motion.button
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Video Call"
          >
            <Video size={18} className="text-gray-400" />
          </motion.button>
          
          <div className="relative user-menu-container">
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="User Options"
            >
              <MoreVertical size={18} className="text-gray-400" />
            </motion.button>

            {/* User Menu */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 min-w-48"
                >
                  <div className="p-2">
                    {isUserBlocked(currentMatch.otherUser.id) ? (
                      <button
                        onClick={() => handleUnblockUser(currentMatch.otherUser.id)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded transition-colors"
                      >
                        <Eye size={16} className="text-green-400" />
                        <span className="text-white">Unblock User</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockUser(currentMatch.otherUser.id)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded transition-colors"
                      >
                        <Ban size={16} className="text-red-400" />
                        <span className="text-white">Block User</span>
                      </button>
                    )}

                    {isUserMuted(currentMatch.otherUser.id) ? (
                      <button
                        onClick={() => handleUnmuteUser(currentMatch.otherUser.id)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded transition-colors"
                      >
                        <VolumeX size={16} className="text-green-400" />
                        <span className="text-white">Unmute User</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMuteUser(currentMatch.otherUser.id)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded transition-colors"
                      >
                        <VolumeX size={16} className="text-yellow-400" />
                        <span className="text-white">Mute User</span>
                      </button>
                    )}

                    <div className="border-t border-gray-700 my-1" />

                    <button
                      onClick={handleReportUser}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded transition-colors"
                    >
                      <Flag size={16} className="text-orange-400" />
                      <span className="text-white">Report User</span>
                    </button>

                    <button
                      onClick={() => window.open(`https://github.com/${currentMatch.otherUser.githubUsername}`, '_blank')}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded transition-colors"
                    >
                      <ExternalLink size={16} className="text-blue-400" />
                      <span className="text-white">View GitHub Profile</span>
                    </button>

                    <div className="border-t border-gray-700 my-1" />

                    <button
                      onClick={() => setShowUnmatchModal(true)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded transition-colors"
                    >
                      <Heart size={16} className="text-red-400" />
                      <span className="text-white">Unmatch</span>
                    </button>

                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded transition-colors"
                    >
                      <Trash2 size={16} className="text-red-400" />
                      <span className="text-white">Delete Chat</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div 
        ref={dropZoneRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 transition-colors ${
          isDragOver ? 'bg-blue-500/10' : ''
        }`}
      >
        {isDragOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-blue-500/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="bg-black/90 border-2 border-dashed border-blue-500 rounded-xl p-8 text-center">
              <Upload size={48} className="text-blue-400 mx-auto mb-4" />
              <p className="text-white text-lg font-medium">Drop files here to upload</p>
              <p className="text-gray-400 text-sm">Release to send files</p>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages
            .filter(message => !isUserBlocked(message.senderId))
            .map((message, index) => {
            const isOwnMessage = message.senderId === currentUserId;
            const showAvatar = !isOwnMessage && (index === 0 || messages[index - 1]?.senderId !== message.senderId);
            
            return (
              <motion.div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`flex gap-2 max-w-[70%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                  {showAvatar && !isOwnMessage && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {message.senderName.charAt(0)}
                    </div>
                  )}
                  
                  {!showAvatar && !isOwnMessage && (
                    <div className="w-8 flex-shrink-0" />
                  )}
                  
                  <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-3 rounded-2xl max-w-full ${
                      isOwnMessage 
                        ? 'bg-blue-600 text-white rounded-br-md' 
                        : 'bg-gray-800 text-gray-200 rounded-bl-md'
                    }`}>
                      {message.type === 'image' && message.file?.url ? (
                        <div className="space-y-2">
                          <div 
                            className="relative group cursor-pointer"
                            onClick={() => openImage(message.file!.url!, message.file!.name)}
                          >
                            <img 
                              src={message.file.url} 
                              alt={message.file.name}
                              className="max-w-full max-h-64 rounded-lg hover:opacity-90 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                              <Maximize2 size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm opacity-80">{message.file.name}</p>
                            <button 
                              onClick={() => downloadFile(message.file!.url!, message.file!.name)}
                              className="p-1 hover:bg-white/10 rounded transition-colors"
                              title="Download"
                            >
                              <Download size={14} />
                            </button>
                          </div>
                        </div>
                      ) : message.type === 'file' && message.file ? (
                        <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                          {getFileIcon(message.file.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{message.file.name}</p>
                            <p className="text-xs opacity-70">{formatFileSize(message.file.size)}</p>
                          </div>
                          <button 
                            onClick={() => downloadFile(message.file!.url!, message.file!.name)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                            title="Download"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed break-words">{message.content}</p>
                      )}
                      
                      {message.file && message.file.uploadProgress !== undefined && message.file.uploadProgress < 100 && (
                        <div className="mt-2">
                          <div className="w-full bg-black/20 rounded-full h-1">
                            <div 
                              className="bg-white h-1 rounded-full transition-all duration-300"
                              style={{ width: `${message.file.uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex items-center gap-1 mt-1 text-xs ${
                      isOwnMessage ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span>{formatTime(message.timestamp)}</span>
                      {isOwnMessage && getStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {currentMatch.otherUser.name.charAt(0)}
              </div>
              <div className="bg-gray-800 text-gray-200 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <motion.div 
        className="p-4 border-t border-gray-700/50 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message or drag files here..."
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-2xl px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            
            <div className="absolute right-3 bottom-3 flex items-center gap-1">
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Attach file"
              >
                <Paperclip size={16} className="text-gray-400" />
              </motion.button>
              
              <motion.button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Add emoji"
              >
                <Smile size={16} className="text-gray-400" />
              </motion.button>
              
              <motion.button
                onClick={() => openImage('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center', 'test-image.jpg')}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Test image viewer"
              >
                <Image size={16} className="text-gray-400" />
              </motion.button>
            </div>

            {/* Emoji Picker */}
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  ref={emojiPickerRef}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl z-50"
                >
                  <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => addEmoji(emoji)}
                        className="p-2 hover:bg-gray-700 rounded transition-colors text-lg"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full transition-all ${
              newMessage.trim() 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={newMessage.trim() ? { scale: 1.05 } : {}}
            whileTap={newMessage.trim() ? { scale: 0.95 } : {}}
          >
            <Send size={18} />
          </motion.button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
          multiple
        />
      </motion.div>

      {/* Image Viewer Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-full max-h-full"
            >
              {/* Image Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={zoomIn}
                  className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={20} className="text-white" />
                </button>
                <button
                  onClick={zoomOut}
                  className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={20} className="text-white" />
                </button>
                <button
                  onClick={rotateImage}
                  className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                  title="Rotate"
                >
                  <RotateCcw size={20} className="text-white" />
                </button>
                <button
                  onClick={() => downloadFile(selectedImage.url, selectedImage.name)}
                  className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download size={20} className="text-white" />
                </button>
                <button
                  onClick={closeImage}
                  className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                  title="Close"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Image */}
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                style={{
                  transform: `scale(${imageScale}) rotate(${imageRotation}deg)`,
                  transition: 'transform 0.3s ease'
                }}
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 bg-black/50 rounded-lg px-3 py-2">
                <p className="text-white text-sm font-medium">{selectedImage.name}</p>
                <p className="text-gray-300 text-xs">Scale: {Math.round(imageScale * 100)}%</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <Flag size={24} className="text-orange-400" />
                <h3 className="text-white text-lg font-semibold">Report User</h3>
              </div>
              
              <p className="text-gray-300 mb-4">
                Report {currentMatch?.otherUser.name} for inappropriate behavior. Your report will be reviewed by our team.
              </p>
              
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Describe the issue..."
                className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                rows={4}
              />
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReport}
                  disabled={!reportReason.trim()}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    reportReason.trim()
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Chat Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <Trash2 size={24} className="text-red-400" />
                <h3 className="text-white text-lg font-semibold">Delete Chat</h3>
              </div>
              
              <p className="text-gray-300 mb-4">
                Are you sure you want to delete this chat? This action cannot be undone and all messages will be permanently removed.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteChat}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete Chat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unmatch Modal */}
      <AnimatePresence>
        {showUnmatchModal && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart size={24} className="text-red-400" />
                <h3 className="text-white text-lg font-semibold">Unmatch</h3>
              </div>
              
              <p className="text-gray-300 mb-4">
                Are you sure you want to unmatch with {currentMatch?.otherUser.name}? This will remove the match and you won't be able to chat anymore.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUnmatchModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUnmatch}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Unmatch
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 