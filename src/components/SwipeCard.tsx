'use client';

import { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { motion } from 'framer-motion';
import { Profile, Project, SwipeCard as SwipeCardType } from '@/types';
import { 
  MapPin, 
  Clock, 
  Users, 
  Code, 
  Briefcase, 
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Terminal,
  Zap,
  Activity
} from 'lucide-react';

interface SwipeCardProps {
  card: SwipeCardType;
  onSwipe: (direction: 'left' | 'right', card: SwipeCardType) => void;
  onCardLeftScreen: (card: SwipeCardType) => void;
}

export default function SwipeCard({ card, onSwipe, onCardLeftScreen }: SwipeCardProps) {
  const [lastDirection, setLastDirection] = useState<string>('');
  const cardRef = useRef<any>(null);

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (direction === 'left' || direction === 'right') {
      setLastDirection(direction);
      onSwipe(direction, card);
    }
  };

  const handleCardLeftScreen = () => {
    onCardLeftScreen(card);
  };

  const isProfile = card.type === 'profile';
  const data = card.data as Profile | Project;

  const getRandomCodeSnippet = () => {
    const snippets = [
      "const buildCool = async () => {\n  return await collaboration();\n};",
      "function findPartner() {\n  return devs.filter(dev => \n    dev.vibe === 'awesome'\n  );\n}",
      "// TODO: Build something epic\nif (skills.match(yours)) {\n  lets.collaborate();\n}",
      "const match = developers\n  .find(dev => dev.passion)\n  .code.together();"
    ];
    return snippets[Math.floor(Math.random() * snippets.length)];
  };

  const ProfileCard = ({ profile }: { profile: Profile }) => (
    <div className="h-full flex flex-col swipe-card">
      {/* Terminal Header */}
      <div className="card-header">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
          </div>
          <span className="terminal-text text-base text-white font-semibold">
            {profile.githubUsername || profile.name.toLowerCase().replace(' ', '_')}@buildrs:~$
          </span>
        </div>
        <div className="text-gray-300 text-sm font-medium">
          cat /dev/profiles/{profile.name.toLowerCase().replace(' ', '_')}.json
        </div>
      </div>

      {/* Profile Header */}
      <div className="card-content border-b border-gray-800 pb-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gray-800 border border-gray-700 rounded flex items-center justify-center">
            <Code className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white title-text mb-2">{profile.name}</h2>
            <div className="flex items-center gap-3 text-gray-200 text-base font-medium">
              <MapPin size={18} />
              <span>{profile.location || 'Remote'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-base">
          <div className="status-dot status-online"></div>
          <span className="text-white terminal-text font-semibold">
            {profile.isLookingForProjects ? 'SEEKING_PROJECTS' : 'RECRUITING_COLLABORATORS'}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 card-content">
        {/* Bio */}
        <div className="mb-6">
          <div className="text-gray-300 text-sm mb-3 terminal-text font-semibold">/* Developer Bio */</div>
          <p className="text-white text-base leading-relaxed font-medium">
            {profile.bio}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <div className="text-gray-200 text-sm mb-3 terminal-text font-semibold">const skills = [</div>
          <div className="ml-6 flex flex-wrap gap-2 mb-3">
            {profile.skills.slice(0, 6).map((skill, index) => (
              <span key={index} className="tag text-sm text-white font-semibold border-gray-500">
                "{skill}"
              </span>
            ))}
            {profile.skills.length > 6 && (
              <span className="text-gray-300 text-sm font-medium">
                ...{profile.skills.length - 6} more
              </span>
            )}
          </div>
          <div className="text-gray-200 text-sm terminal-text font-semibold">];</div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <div className="flex items-center gap-3 text-white text-base font-semibold">
            <Activity size={18} />
            <span>Available: {profile.availability}</span>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="code-block mb-6">
          <pre className="text-white text-sm terminal-text font-medium">
            {getRandomCodeSnippet()}
          </pre>
        </div>

        {/* Social Links */}
        <div className="flex gap-3 mt-auto">
          {profile.portfolioUrl && (
            <button className="action-btn w-12 h-12">
              <Globe size={20} />
            </button>
          )}
          {profile.linkedinUrl && (
            <button className="action-btn w-12 h-12">
              <Linkedin size={20} />
            </button>
          )}
          <button className="action-btn w-12 h-12">
            <Github size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="h-full flex flex-col swipe-card">
      {/* Terminal Header */}
      <div className="card-header">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
          </div>
          <span className="terminal-text text-base text-white font-semibold">
            user@buildrs:~/projects$
          </span>
        </div>
        <div className="text-gray-300 text-sm font-medium">
          git clone {project.repositoryUrl || `https://github.com/buildrs/${project.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
        </div>
      </div>

      {/* Project Header */}
      <div className="card-content border-b border-gray-800 pb-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <Briefcase className="text-white" size={20} />
            <span className="text-gray-200 terminal-text text-base uppercase font-semibold">
              {project.projectType.replace('-', '_')}
            </span>
          </div>
          <span className={`tag text-sm font-bold ${
            project.difficulty === 'easy' ? 'text-green-400 border-green-400' :
            project.difficulty === 'medium' ? 'text-yellow-400 border-yellow-400' :
            'text-red-400 border-red-400'
          }`}>
            {project.difficulty}
          </span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-6 title-text">
          {project.title}
        </h2>
        
        <div className="flex items-center gap-8 text-gray-200 text-base font-medium">
          <div className="flex items-center gap-3">
            <Users size={18} />
            <span>{project.currentCollaborators}/{project.maxCollaborators}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={18} />
            <span>{project.estimatedDuration}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 card-content">
        {/* Description */}
        <div className="mb-6">
          <div className="text-gray-300 text-sm mb-3 terminal-text font-semibold"># Project Description</div>
          <p className="text-white text-base leading-relaxed font-medium">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <div className="text-gray-200 text-sm mb-3 terminal-text font-semibold">"dependencies": {`{`}</div>
          <div className="ml-6 space-y-2">
            {project.techStack.map((tech, index) => (
              <div key={index} className="text-gray-200 text-sm terminal-text font-medium">
                "{tech}": "latest"{index < project.techStack.length - 1 ? ',' : ''}
              </div>
            ))}
          </div>
          <div className="text-gray-200 text-sm terminal-text font-semibold">{`}`}</div>
        </div>

        {/* Looking For */}
        <div className="mb-6">
          <div className="text-gray-300 text-sm mb-3 terminal-text font-semibold">// TODO: Need these roles</div>
          <div className="space-y-2">
            {project.lookingForRoles.map((role, index) => (
              <div key={index} className="flex items-center gap-3">
                <Terminal size={14} className="text-gray-400" />
                <span className="text-gray-200 text-sm terminal-text font-medium">{role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <div className="flex items-center gap-3 text-white text-base font-semibold">
            <div className="status-dot status-online"></div>
            <span>Status: {project.status.toUpperCase().replace('-', '_')}</span>
          </div>
        </div>

        {/* Project Links */}
        <div className="flex gap-3 mt-auto">
          {project.repositoryUrl && (
            <button className="action-btn w-12 h-12">
              <Github size={20} />
            </button>
          )}
          {project.demoUrl && (
            <button className="action-btn w-12 h-12">
              <ExternalLink size={20} />
            </button>
          )}
          <button className="action-btn w-12 h-12">
            <Zap size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <TinderCard
      ref={cardRef}
      className="absolute"
      onSwipe={handleSwipe}
      onCardLeftScreen={handleCardLeftScreen}
      preventSwipe={['up', 'down']}
      swipeRequirementType="position"
      swipeThreshold={100}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-96 h-[650px] select-none cursor-grab active:cursor-grabbing"
      >
        {isProfile ? (
          <ProfileCard profile={data as Profile} />
        ) : (
          <ProjectCard project={data as Project} />
        )}
        
        {/* Swipe indicators */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-10 right-10 transform rotate-12 bg-red-500 text-white px-6 py-3 rounded font-bold terminal-text border border-red-500 opacity-0 transition-opacity duration-200 text-lg"
          >
            REJECT
          </motion.div>
          <motion.div 
            className="absolute top-10 left-10 transform -rotate-12 bg-green-500 text-white px-6 py-3 rounded font-bold terminal-text border border-green-500 opacity-0 transition-opacity duration-200 text-lg"
          >
            MATCH
          </motion.div>
        </div>
      </motion.div>
    </TinderCard>
  );
} 