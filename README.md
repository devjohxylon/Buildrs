# Buildrs - Developer Collaboration Platform

A Tinder-style platform for developers to find collaborators for fun, casual projects. Swipe through developer profiles and project ideas to discover your next coding partner!

## 🚀 Features

### Currently Implemented
- ✅ **PWA-Ready Next.js App** - Installable, offline-capable progressive web app
- ✅ **Tinder-Style Swipe Interface** - Smooth card swiping with react-tinder-card
- ✅ **Developer Profiles** - Rich profiles with skills, interests, and availability
- ✅ **Project Cards** - Project listings with tech stack and collaboration needs
- ✅ **Multiple Modes** - Swipe through profiles, projects, or mixed feed
- ✅ **Modern UI** - Dark theme with gradients and smooth animations
- ✅ **Mobile-First** - Responsive design optimized for mobile devices
- ✅ **TypeScript** - Full type safety throughout the application

### Coming Soon
- 🔄 FastAPI Backend with PostgreSQL and Redis
- 🔄 GitHub Authentication with NextAuth.js
- 🔄 AI-Powered Matching Algorithm
- 🔄 Real-time Chat System
- 🔄 Collaboration Tools (Whiteboard, Task Lists)
- 🔄 Gamification & Badges
- 🔄 Deployment to Vercel & Railway

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- react-tinder-card
- Lucide React Icons

**Backend (Planned):**
- FastAPI (Python)
- PostgreSQL
- Redis
- JWT Authentication

**Deployment:**
- Vercel (Frontend)
- Railway (Backend)

## 🏗️ Project Structure

```
buildrs/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── swipe/
│   │   │   └── page.tsx            # Swipe interface
│   │   ├── layout.tsx              # Root layout with PWA setup
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── SwipeCard.tsx           # Individual swipe card
│   │   └── SwipeInterface.tsx      # Main swipe interface
│   ├── types/
│   │   └── index.ts                # TypeScript definitions
│   └── lib/
│       └── mockData.ts             # Sample data for testing
├── public/
│   └── manifest.json               # PWA manifest
├── next.config.ts                  # Next.js config with PWA
└── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone and setup:**
   ```bash
   cd buildrs
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

### Usage

1. **Landing Page** - Visit the homepage to learn about Buildrs
2. **Swipe Interface** - Click "Start Building" to access the swipe interface
3. **Mode Selection** - Choose between profiles, projects, or mixed mode
4. **Swiping** - Swipe cards left (pass) or right (like), or use the buttons

## 🎨 Design Philosophy

**Tech-Bro Vibe:** Playful, casual atmosphere inspired by the viral X post about "Tinder for guys to find other guys to do cool projects with."

**Developer-First:** Every feature is designed with developers in mind - showcasing skills, tech stacks, and project interests prominently.

**Mobile PWA:** Optimized for mobile-first usage with PWA capabilities for native-app-like experience.

## 📱 PWA Features

- **Installable:** Add to home screen on mobile devices
- **Offline Support:** Service worker caching for offline functionality
- **App-like Experience:** Standalone display mode
- **Cross-Platform:** Works on iOS, Android, and desktop

## 🧪 Sample Data

The app includes rich sample data:
- **6 Developer Profiles** with diverse skills and backgrounds
- **4 Project Ideas** ranging from AI tools to DeFi dashboards
- **Realistic Tech Stacks** covering web, mobile, AI/ML, and blockchain

## 🔮 Roadmap

### Phase 1: MVP (Current)
- [x] Basic swipe interface
- [x] Profile and project cards
- [x] PWA setup
- [ ] FastAPI backend
- [ ] Basic matching logic

### Phase 2: Core Features
- [ ] User authentication
- [ ] Real user profiles
- [ ] Match system
- [ ] Basic chat

### Phase 3: Advanced Features
- [ ] AI matching algorithm
- [ ] Collaboration tools
- [ ] Gamification
- [ ] Video introductions

### Phase 4: Growth
- [ ] Advanced filters
- [ ] Team formation
- [ ] Project showcases
- [ ] Integration with GitHub

## 🤝 Contributing

This is currently a demo/prototype. For the next phases:

1. **Backend Development** - FastAPI setup with Railway
2. **Authentication** - GitHub OAuth integration
3. **Database Design** - PostgreSQL schema design
4. **AI Integration** - OpenAI API for smart matching
5. **Real-time Features** - WebSocket implementation

## 📄 License

MIT License - Feel free to use this code for your own projects!

## 🎯 Inspiration

Based on the viral X post: "I want Tinder but for guys to find other guys to do cool projects with."

Building a platform where developers can:
- Find coding collaborators
- Discover interesting projects
- Build meaningful connections
- Create amazing things together

---

**Built with ❤️ by developers, for developers. Let's build something cool together!**
