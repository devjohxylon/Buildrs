import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-lg terminal-text">
            ← Back to Buildrs
          </Link>
          <h1 className="text-5xl font-bold terminal-text mt-8 mb-6">Documentation</h1>
          <p className="text-gray-300 text-xl">Everything you need to get started</p>
        </div>

        {/* Quick Start */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold terminal-text mb-12">Quick Start</h2>
          
          <div className="terminal p-12 mb-12">
            <h3 className="text-2xl font-bold mb-8 text-green-400">Getting Started</h3>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p><strong className="text-white">1. Join the Waitlist</strong><br />
              Sign up for early access while we're in alpha development.</p>
              
              <p><strong className="text-white">2. Create Your Profile</strong><br />
              Connect your GitHub and showcase your skills and interests.</p>
              
              <p><strong className="text-white">3. Start Swiping</strong><br />
              Browse developer profiles and project ideas to find matches.</p>
              
              <p><strong className="text-white">4. Collaborate</strong><br />
              Chat with matches and start building amazing projects together.</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold terminal-text mb-12">How Buildrs Works</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            
            <div className="terminal p-10">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">🔄 Swipe & Match</h3>
              <div className="text-gray-300 text-lg leading-relaxed space-y-4">
                <p>Browse through developer profiles and project ideas. Swipe right on people you'd like to collaborate with.</p>
                <p>When both users swipe right, you get a match and can start chatting!</p>
              </div>
            </div>

            <div className="terminal p-10">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">👥 Build Together</h3>
              <div className="text-gray-300 text-lg leading-relaxed space-y-4">
                <p>Use our collaboration tools to manage projects, share code, and track progress.</p>
                <p>From weekend hackathons to long-term side projects.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Features */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold terminal-text mb-12">Key Features</h2>
          
          <div className="space-y-8">
            
            <div className="terminal p-10">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Developer Profiles</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Showcase your GitHub activity, skills, and project interests. Let others know what you're passionate about building.
              </p>
            </div>

            <div className="terminal p-10">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Smart Matching</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our AI analyzes your skills and interests to suggest compatible collaborators and relevant projects.
              </p>
            </div>

            <div className="terminal p-10">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Project Tools</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Built-in chat, file sharing, and project management tools to keep your collaboration organized.
              </p>
            </div>

          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold terminal-text mb-12">FAQ</h2>
          
          <div className="space-y-8">
            
            <div className="terminal p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Is Buildrs free to use?</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Yes! We offer a free Starter plan with basic features. Pro plans ($9/mo) unlock unlimited swipes, AI matching, and advanced collaboration tools.
              </p>
            </div>

            <div className="terminal p-8">
              <h3 className="text-xl font-bold mb-4 text-white">How do I find good collaborators?</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Be specific about your interests and skills in your profile. The more detailed you are, the better our matching algorithm works.
              </p>
            </div>

            <div className="terminal p-8">
              <h3 className="text-xl font-bold mb-4 text-white">What types of projects work best?</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Any coding project! From weekend hackathons to long-term open source contributions. The key is clear communication about goals and time commitment.
              </p>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <div className="terminal p-12 max-w-3xl w-full">
            <h2 className="text-3xl font-bold mb-6 text-center">Ready to Start?</h2>
            <p className="text-gray-300 mb-8 text-xl leading-relaxed text-center">
              Join the waitlist and be among the first to try Buildrs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="/" className="btn btn-primary text-xl py-4 px-8 w-full sm:w-auto">
                Join Waitlist
              </a>
              <a href="/features" className="btn btn-secondary text-xl py-4 px-8 w-full sm:w-auto">
                View Features
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 