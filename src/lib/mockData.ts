import { Profile, Project, ProjectType } from '@/types';

export const mockProfiles: Profile[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Alex Chen',
    bio: '🚀 Full-stack wizard who loves building scalable web apps. Currently obsessed with Next.js and PostgreSQL. Looking for someone to build the next big SaaS with!',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    interests: ['SaaS', 'AI/ML', 'Web3'],
    availability: 'evenings',
    experienceLevel: 'advanced',
    preferredProjectTypes: ['web-app', 'startup', 'api'],
    location: 'San Francisco, CA',
    timezone: 'PST',
    portfolioUrl: 'https://alexchen.dev',
    linkedinUrl: 'https://linkedin.com/in/alexchen',
    isLookingForProjects: true,
    isLookingForCollaborators: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    userId: 'user2',
    name: 'Maria Rodriguez',
    bio: '🎮 Game dev by day, indie hacker by night. Unity expert with a passion for creating immersive experiences. Let\'s build something that makes people smile!',
    skills: ['C#', 'Unity', 'Blender', 'Python', 'Firebase'],
    interests: ['Gaming', 'VR/AR', 'Mobile Apps'],
    availability: 'weekends',
    experienceLevel: 'intermediate',
    preferredProjectTypes: ['game', 'mobile-app', 'vr-ar'],
    location: 'Austin, TX',
    timezone: 'CST',
    portfolioUrl: 'https://mariagames.io',
    isLookingForProjects: true,
    isLookingForCollaborators: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    userId: 'user3',
    name: 'David Kim',
    bio: '🤖 AI/ML engineer who dreams in neural networks. Published researcher with 50+ papers. Looking to build practical AI tools that solve real problems.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Jupyter', 'Docker'],
    interests: ['AI/ML', 'Research', 'Automation'],
    availability: 'full-time',
    experienceLevel: 'expert',
    preferredProjectTypes: ['ai-ml', 'tool', 'open-source'],
    location: 'Seattle, WA',
    timezone: 'PST',
    portfolioUrl: 'https://davidkim-ai.com',
    linkedinUrl: 'https://linkedin.com/in/davidkim-ai',
    isLookingForProjects: false,
    isLookingForCollaborators: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '4',
    userId: 'user4',
    name: 'Sarah Johnson',
    bio: '🌐 Blockchain enthusiast and DeFi developer. Solidity expert who believes in decentralized everything. Ready to revolutionize finance together!',
    skills: ['Solidity', 'Web3.js', 'React', 'Hardhat', 'Ethers.js'],
    interests: ['Blockchain', 'DeFi', 'NFTs'],
    availability: 'part-time',
    experienceLevel: 'advanced',
    preferredProjectTypes: ['blockchain', 'web-app', 'startup'],
    location: 'New York, NY',
    timezone: 'EST',
    portfolioUrl: 'https://sarahblockchain.dev',
    isLookingForProjects: true,
    isLookingForCollaborators: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
  },
  {
    id: '5',
    userId: 'user5',
    name: 'Jake Thompson',
    bio: '📱 Mobile-first developer with a keen eye for UX. Flutter and React Native specialist. Let\'s create apps that users actually want to use!',
    skills: ['Flutter', 'Dart', 'React Native', 'Swift', 'Kotlin'],
    interests: ['Mobile Apps', 'UX Design', 'Startups'],
    availability: 'evenings',
    experienceLevel: 'intermediate',
    preferredProjectTypes: ['mobile-app', 'startup', 'tool'],
    location: 'Denver, CO',
    timezone: 'MST',
    portfolioUrl: 'https://jakethompson.app',
    isLookingForProjects: true,
    isLookingForCollaborators: false,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-21'),
  },
  {
    id: '6',
    userId: 'user6',
    name: 'Emma Wilson',
    bio: '🔧 DevOps guru who makes infrastructure sing. Kubernetes wizard and CI/CD enthusiast. Looking for someone to automate the world with!',
    skills: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'Python'],
    interests: ['DevOps', 'Cloud', 'Automation'],
    availability: 'weekends',
    experienceLevel: 'advanced',
    preferredProjectTypes: ['tool', 'open-source', 'api'],
    location: 'Portland, OR',
    timezone: 'PST',
    portfolioUrl: 'https://emmawilson.cloud',
    linkedinUrl: 'https://linkedin.com/in/emmawilson-devops',
    isLookingForProjects: false,
    isLookingForCollaborators: true,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-20'),
  },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    creatorId: 'user1',
    title: 'AI-Powered Code Review Tool',
    description: 'Building an intelligent code review assistant that provides real-time feedback and suggestions. Think GitHub Copilot meets SonarQube!',
    techStack: ['TypeScript', 'React', 'Node.js', 'OpenAI API', 'PostgreSQL'],
    projectType: 'tool' as ProjectType,
    difficulty: 'medium',
    estimatedDuration: '3-4 months',
    lookingForRoles: ['Frontend Developer', 'AI/ML Engineer'],
    maxCollaborators: 3,
    currentCollaborators: 1,
    status: 'recruiting',
    tags: ['AI', 'Developer Tools', 'Code Quality'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: 'p2',
    creatorId: 'user2',
    title: 'Multiplayer Puzzle Game',
    description: 'Creating a real-time multiplayer puzzle game with custom physics engine. Perfect for casual gaming sessions with friends!',
    techStack: ['Unity', 'C#', 'Photon', 'Blender'],
    projectType: 'game' as ProjectType,
    difficulty: 'hard',
    estimatedDuration: '6-8 months',
    lookingForRoles: ['3D Artist', 'Game Developer', 'Sound Designer'],
    maxCollaborators: 4,
    currentCollaborators: 2,
    status: 'recruiting',
    repositoryUrl: 'https://github.com/maria/puzzle-game',
    tags: ['Unity', 'Multiplayer', 'Casual Gaming'],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-21'),
  },
  {
    id: 'p3',
    creatorId: 'user3',
    title: 'Open Source ML Library',
    description: 'Developing a lightweight machine learning library focused on time series prediction. Aiming for PyPI release!',
    techStack: ['Python', 'NumPy', 'Pandas', 'Scikit-learn'],
    projectType: 'library' as ProjectType,
    difficulty: 'hard',
    estimatedDuration: '4-6 months',
    lookingForRoles: ['ML Engineer', 'Python Developer', 'Technical Writer'],
    maxCollaborators: 5,
    currentCollaborators: 1,
    status: 'recruiting',
    repositoryUrl: 'https://github.com/davidkim/ml-timeseries',
    tags: ['Machine Learning', 'Open Source', 'Python'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'p4',
    creatorId: 'user4',
    title: 'DeFi Yield Farming Dashboard',
    description: 'Building a comprehensive dashboard for tracking DeFi yields across multiple protocols. Real-time data, beautiful charts!',
    techStack: ['React', 'Web3.js', 'Solidity', 'The Graph', 'Chart.js'],
    projectType: 'web-app' as ProjectType,
    difficulty: 'medium',
    estimatedDuration: '2-3 months',
    lookingForRoles: ['Frontend Developer', 'Smart Contract Developer'],
    maxCollaborators: 3,
    currentCollaborators: 1,
    status: 'recruiting',
    demoUrl: 'https://defi-dashboard-demo.vercel.app',
    tags: ['DeFi', 'Blockchain', 'Dashboard'],
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-22'),
  },
];

export const skillSuggestions = [
  'JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'Vue.js', 'Angular',
  'Next.js', 'Express.js', 'Django', 'Flask', 'FastAPI', 'PostgreSQL', 'MongoDB',
  'Redis', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Terraform', 'CI/CD',
  'GraphQL', 'REST API', 'WebSockets', 'Socket.io', 'Prisma', 'Sequelize',
  'TailwindCSS', 'Styled Components', 'Material-UI', 'Chakra UI', 'Framer Motion',
  'Three.js', 'D3.js', 'Chart.js', 'Electron', 'React Native', 'Flutter', 'Swift',
  'Kotlin', 'Java', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Solidity', 'Web3.js',
  'Ethers.js', 'Unity', 'Unreal Engine', 'Blender', 'Figma', 'Adobe Creative Suite',
  'Machine Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
  'Jupyter', 'R', 'MATLAB', 'OpenCV', 'NLP', 'Computer Vision', 'Deep Learning',
];

export const interestSuggestions = [
  'Web Development', 'Mobile Apps', 'Game Development', 'AI/ML', 'Blockchain',
  'DevOps', 'Cloud Computing', 'Cybersecurity', 'Data Science', 'IoT',
  'AR/VR', 'Desktop Applications', 'Browser Extensions', 'APIs', 'Microservices',
  'Serverless', 'JAMstack', 'PWAs', 'E-commerce', 'FinTech', 'EdTech', 'HealthTech',
  'Social Media', 'Content Management', 'Analytics', 'Automation', 'Productivity Tools',
  'Developer Tools', 'Open Source', 'Startups', 'Hackathons', 'Code Challenges',
]; 