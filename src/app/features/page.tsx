import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-lg terminal-text">
            ← Back to Buildrs
          </Link>
          <h1 className="text-5xl font-bold terminal-text mt-8 mb-6">Features</h1>
          <p className="text-gray-300 text-xl">Everything you need to find coding collaborators</p>
        </div>

        {/* Hero Feature */}
        <div className="mb-24">
          <div className="terminal p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">🔄 Smart Swipe Matching</h2>
            <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto">
              Swipe through developer profiles and project ideas. Match with compatible partners and start building together.
            </p>
          </div>
        </div>

        {/* Core Features */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold terminal-text text-center mb-16">Core Features</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            
            <div className="terminal p-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">👥 Developer Profiles</h3>
              <div className="text-gray-300 space-y-3 text-lg leading-relaxed">
                <p>• GitHub integration and activity</p>
                <p>• Skills and experience level</p>
                <p>• Portfolio and project history</p>
                <p>• Availability preferences</p>
              </div>
            </div>

            <div className="terminal p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-400">🎯 Project Discovery</h3>
              <div className="text-gray-300 space-y-3 text-lg leading-relaxed">
                <p>• Browse exciting project ideas</p>
                <p>• Filter by technology</p>
                <p>• Match with your interests</p>
                <p>• Post your own proposals</p>
              </div>
            </div>

            <div className="terminal p-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">🧠 AI Matching</h3>
              <div className="text-gray-300 space-y-3 text-lg leading-relaxed">
                <p>• Intelligent compatibility</p>
                <p>• Skill analysis</p>
                <p>• Project-developer fit</p>
                <p>• Learning style matching</p>
              </div>
            </div>

            <div className="terminal p-8">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">💬 Collaboration</h3>
              <div className="text-gray-300 space-y-3 text-lg leading-relaxed">
                <p>• Real-time chat</p>
                <p>• Code sharing</p>
                <p>• Project management</p>
                <p>• Video calls</p>
              </div>
            </div>

          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold terminal-text text-center mb-16">Simple Pricing</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="terminal p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Starter</h3>
              <div className="text-4xl font-bold mb-4">Free</div>
              <div className="text-gray-300 space-y-2 text-lg">
                <p>5 swipes daily</p>
                <p>Basic chat</p>
                <p>1 active project</p>
              </div>
            </div>

            <div className="terminal p-8 text-center border-blue-500">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Pro</h3>
              <div className="text-4xl font-bold mb-4">$9/mo</div>
              <div className="text-gray-300 space-y-2 text-lg">
                <p>Unlimited swipes</p>
                <p>AI matching</p>
                <p>5 active projects</p>
              </div>
            </div>

            <div className="terminal p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Team</h3>
              <div className="text-4xl font-bold mb-4">$25/mo</div>
              <div className="text-gray-300 space-y-2 text-lg">
                <p>Team management</p>
                <p>Unlimited projects</p>
                <p>Analytics</p>
              </div>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <div className="terminal p-12 max-w-3xl w-full">
            <h2 className="text-3xl font-bold mb-6 text-center">Ready to Start Building?</h2>
            <p className="text-gray-300 mb-8 text-xl leading-relaxed text-center">
              Join thousands of developers building amazing projects together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="/" className="btn btn-primary text-xl py-4 px-8 w-full sm:w-auto">
                Join Waitlist
              </a>
              <a href="/pricing" className="btn btn-secondary text-xl py-4 px-8 w-full sm:w-auto">
                View Pricing
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 