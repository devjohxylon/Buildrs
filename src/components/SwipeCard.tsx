'use client';

import { useRef } from 'react';
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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (direction === 'left' || direction === 'right') {
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
      "if (skills.match(yours)) {\n  lets.collaborate();\n}",
      "const match = developers\n  .find(dev => dev.passion)\n  .code.together();"
    ];
    return snippets[Math.floor(Math.random() * snippets.length)];
  };

  if (isProfile) {
    const profile = data as Profile;
    return (
      <TinderCard
        ref={cardRef}
        className="absolute inset-0"
        onSwipe={handleSwipe}
        onCardLeftScreen={handleCardLeftScreen}
        preventSwipe={['up', 'down']}
        swipeRequirementType="position"
        swipeThreshold={200}
      >
        <motion.div
          className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden cursor-grab active:cursor-grabbing"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Profile Header */}
          <div className="p-8 border-b border-slate-700">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
                {profile.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{profile.name}</h3>
                <p className="text-blue-400 text-lg font-semibold mb-3">{profile.role}</p>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span className="text-sm">{profile.experience} exp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code snippet */}
          <div className="p-6 bg-slate-950 border-b border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={16} className="text-green-400" />
              <span className="text-green-400 text-sm font-mono">~/current-vibe.js</span>
            </div>
            <pre className="text-green-400 font-mono text-sm overflow-hidden">
              <code>{getRandomCodeSnippet()}</code>
            </pre>
          </div>

          {/* Skills */}
          <div className="p-6 border-b border-slate-700">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Code size={18} />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.skills.slice(0, 8).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-800 text-gray-300 rounded-full text-sm border border-slate-600"
                >
                  {skill}
                </span>
              ))}
              {profile.skills.length > 8 && (
                <span className="px-3 py-1 bg-slate-700 text-gray-400 rounded-full text-sm">
                  +{profile.skills.length - 8} more
                </span>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="p-6 border-b border-slate-700">
            <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
          </div>

          {/* Interests & Goals */}
          <div className="p-6 border-b border-slate-700">
            <h4 className="text-white font-semibold mb-3">Looking to build</h4>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="p-6">
            <div className="flex items-center gap-4">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={18} />
                  <span className="text-sm">GitHub</span>
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={18} />
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
              {profile.portfolio && (
                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Globe size={18} />
                  <span className="text-sm">Portfolio</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </TinderCard>
    );
  } else {
    // Project card
    const project = data as Project;
    return (
      <TinderCard
        ref={cardRef}
        className="absolute inset-0"
        onSwipe={handleSwipe}
        onCardLeftScreen={handleCardLeftScreen}
        preventSwipe={['up', 'down']}
        swipeRequirementType="position"
        swipeThreshold={200}
      >
        <motion.div
          className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden cursor-grab active:cursor-grabbing"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Project Header */}
          <div className="p-8 border-b border-slate-700">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl">
                <Briefcase className="text-white" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-green-400 text-lg font-semibold mb-3">{project.category}</p>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span className="text-sm">{project.teamSize} people needed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span className="text-sm">{project.timeline}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code snippet for project */}
          <div className="p-6 bg-slate-950 border-b border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={16} className="text-green-400" />
              <span className="text-green-400 text-sm font-mono">~/project-idea.md</span>
            </div>
            <pre className="text-green-400 font-mono text-sm overflow-hidden">
              <code>
                {`const projectIdea = {\n  name: &quot;${project.title}&quot;,\n  status: &quot;seeking collaborators&quot;,\n  vibe: &quot;let's build something cool&quot;\n};`}
              </code>
            </pre>
          </div>

          {/* Tech Stack */}
          <div className="p-6 border-b border-slate-700">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Code size={18} />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 8).map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-800 text-gray-300 rounded-full text-sm border border-slate-600"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 8 && (
                <span className="px-3 py-1 bg-slate-700 text-gray-400 rounded-full text-sm">
                  +{project.techStack.length - 8} more
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="p-6 border-b border-slate-700">
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Looking for */}
          <div className="p-6 border-b border-slate-700">
            <h4 className="text-white font-semibold mb-3">Looking for</h4>
            <div className="flex flex-wrap gap-2">
              {project.lookingFor.map((role, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Project Links */}
          <div className="p-6">
            <div className="flex items-center gap-4">
              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={18} />
                  <span className="text-sm">Repository</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
                  <span className="text-sm">Demo</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </TinderCard>
    );
  }
} 