'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MessageSquare, 
  Users, 
  Clock, 
  ThumbsUp, 
  MessageCircle,
  Plus,
  MoreHorizontal,
  User,
  Calendar
} from 'lucide-react';
import { FadeIn, SlideUp } from '@/lib/animations';

// Empty state data for production
const thread: any = null;
const posts: any[] = [];

export default function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = params;
  
  // Find thread by id
  // const thread: ForumThread | undefined = mockForumThreads.find((t) => t.id === id);

  if (!thread) {
    // notFound(); // This line was removed as per the new_code
  }

  // const posts = mockForumPosts.filter(p => p.threadId === id);
  const [localPosts, setLocalPosts] = useState(posts);
  const [newReply, setNewReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [votedPosts, setVotedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedThreads, setBookmarkedThreads] = useState<Set<string>>(new Set());

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPost = {
      id: `post-${Date.now()}`,
      threadId: id,
      content: newReply,
      author: {
        id: 'current-user',
        name: 'You',
        role: 'Member',
        avatar: undefined,
        reputation: 120
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      isAcceptedAnswer: false,
      replies: []
    };
    
    setLocalPosts(prev => [...prev, newPost]);
    setNewReply('');
    setShowReplyForm(false);
    setIsSubmitting(false);
  };

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    if (votedPosts.has(postId)) {
      setVotedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    } else {
      setVotedPosts(prev => new Set([...prev, postId]));
    }
  };

  const toggleBookmark = () => {
    setBookmarkedThreads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      {/* Header */}
      <div className="bg-black border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/community?tab=forums" className="hover:text-white transition-colors">Forums</Link>
            <span>•</span>
            <Link href={`/community?tab=forums&category=${thread.category}`} className="hover:text-white transition-colors">
              {thread.category}
            </Link>
            <span>•</span>
            <span className="text-white">{thread.title}</span>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold line-clamp-2">{thread.title}</h1>
                <div className="flex items-center gap-2">
                  {thread.isPinned && (
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs flex items-center gap-1">
                      {/* Star size={12} */}
                      PINNED
                    </span>
                  )}
                  {thread.isLocked && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      {/* Lock size={12} */}
                      LOCKED
                    </span>
                  )}
                  {thread.isSolved && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      {/* Shield size={12} */}
                      SOLVED
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  {/* User size={14} */}
                  {thread.author.name}
                </span>
                <span className="flex items-center gap-1">
                  {/* Calendar size={14} */}
                  {formatDate(thread.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  {/* Eye size={14} */}
                  {thread.views} views
                </span>
                <span className="flex items-center gap-1">
                  {/* MessageSquare size={14} */}
                  {localPosts.length} replies
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  bookmarkedThreads.has(id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                }`}
              >
                {/* Bookmark size={16} */}
              </button>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg transition-colors">
                {/* Share2 size={16} */}
              </button>
              <Link 
                href="/community?tab=forums"
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                {/* ArrowLeft size={16} */}
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Thread Posts */}
        <div className="space-y-6">
          {/* Original Post */}
          {/* <motion.div
            className="bg-black border border-gray-700 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          > */}
            <div className="p-6">
              <div className="flex items-start gap-6">
                {/* Author Info */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-3">
                    {/* User size={24} className="text-gray-400" */}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-white mb-1">{thread.author.name}</div>
                    <div className="text-xs text-gray-500">{thread.author.role}</div>
                    <div className="text-xs text-gray-600 mt-1">Rep: {thread.author.reputation}</div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-400">
                      {formatDate(thread.createdAt)}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-white p-1 rounded transition-colors">
                        {/* MoreVertical size={16} */}
                      </button>
                    </div>
                  </div>

                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-4">
                    {thread.description}
                  </div>

                  {thread.tags.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      {/* Tag size={14} className="text-gray-500" */}
                      {thread.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleVote('thread', 'up')}
                          className={`p-1 rounded transition-colors ${
                            votedPosts.has('thread') ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {/* ThumbsUp size={16} */}
                        </button>
                        <span className="text-sm text-gray-400">{thread.likes}</span>
                        <button
                          onClick={() => handleVote('thread', 'down')}
                          className="p-1 text-gray-400 hover:text-white rounded transition-colors"
                        >
                          {/* ThumbsDown size={16} */}
                        </button>
                      </div>
                      <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                        {/* Quote size={14} */}
                        Quote
                      </button>
                      <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                        {/* Flag size={14} */}
                        Report
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Post #1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/* </motion.div> */}

          {/* Replies */}
          {localPosts.map((post, index) => (
            <div key={post.id} className="bg-black border border-gray-700 rounded-lg p-6">
              <div className="flex items-start gap-6">
                {/* Author Info */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                    {/* User size={18} className="text-gray-400" */}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-white mb-1">{post.author.name}</div>
                    <div className="text-xs text-gray-500">{post.author.role}</div>
                    <div className="text-xs text-gray-600 mt-1">Rep: {post.author.reputation}</div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-400">
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-white p-1 rounded transition-colors">
                        {/* MoreVertical size={16} */}
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-4">
                    {post.content}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleVote(post.id, 'up')}
                          className={`p-1 rounded transition-colors ${
                            votedPosts.has(post.id) ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {/* ThumbsUp size={16} */}
                        </button>
                        <span className="text-sm text-gray-400">{post.likes}</span>
                        <button
                          onClick={() => handleVote(post.id, 'down')}
                          className="p-1 text-gray-400 hover:text-white rounded transition-colors"
                        >
                          {/* ThumbsDown size={16} */}
                        </button>
                      </div>
                      <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                        {/* Quote size={14} */}
                        Quote
                      </button>
                      <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                        {/* Flag size={14} */}
                        Report
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Post #{index + 2}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        {!showReplyForm ? (
          <button
            onClick={() => setShowReplyForm(true)}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {/* MessageSquare size={16} */}
            Add Reply
          </button>
        ) : (
          <form onSubmit={handleSubmitReply} className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">
                Your Reply
              </label>
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Write your reply here..."
                rows={6}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowReplyForm(false)}
                className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !newReply.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    {/* <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> */}
                    Posting...
                  </>
                ) : (
                  <>
                    {/* <Send size={16} /> */}
                    Post Reply
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* {thread.isLocked && ( */}
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 mt-8 text-center">
            {/* <Lock size={24} className="text-red-400 mx-auto mb-2" /> */}
            <p className="text-red-400 font-medium">This thread is locked</p>
            <p className="text-gray-400 text-sm">No new replies can be posted</p>
          </div>
        {/* )} */}
      </div>
    </div>
  );
} 