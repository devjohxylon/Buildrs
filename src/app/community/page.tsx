import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-lg terminal-text">
            ← Back to Buildrs
          </Link>
          <h1 className="text-5xl font-bold terminal-text mt-8 mb-6">Community Guidelines</h1>
          <p className="text-gray-300 text-xl">Building a respectful developer community</p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          
          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-green-400">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Buildrs exists to help developers find meaningful collaborations and build amazing projects together. We believe the best code comes from diverse, respectful, and supportive communities.
            </p>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Core Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              <div>
                <h3 className="text-white font-bold mb-4 text-xl">🤝 Respect</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Treat everyone with kindness, regardless of experience level, background, or technology preferences.
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4 text-xl">🚀 Growth</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Support each other's learning journey. Share knowledge and celebrate wins together.
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4 text-xl">💡 Innovation</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Encourage creative solutions and bold ideas. The best projects come from thinking differently.
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4 text-xl">🎯 Collaboration</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Focus on building together. Great software is rarely built alone.
                </p>
              </div>

            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Expected Behavior</h2>
            <div className="space-y-8">
              
              <div>
                <h3 className="text-white font-bold mb-4 text-xl">✅ Do</h3>
                <div className="text-gray-300 text-lg leading-relaxed space-y-3">
                  <p>• Be helpful and constructive in your feedback</p>
                  <p>• Ask questions when you're unsure</p>
                  <p>• Share knowledge and resources generously</p>
                  <p>• Respect others' time and commitments</p>
                  <p>• Communicate clearly about project expectations</p>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4 text-xl">❌ Don't</h3>
                <div className="text-gray-300 text-lg leading-relaxed space-y-3">
                  <p>• Use offensive, discriminatory, or harmful language</p>
                  <p>• Spam or self-promote excessively</p>
                  <p>• Share others' code without permission</p>
                  <p>• Harass or intimidate other users</p>
                  <p>• Ghost collaborators without communication</p>
                </div>
              </div>

            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Project Collaboration</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p><strong className="text-white">Set clear expectations:</strong> Discuss goals, timelines, and commitment levels upfront</p>
              <p><strong className="text-white">Communicate regularly:</strong> Keep your collaborators informed about progress and blockers</p>
              <p><strong className="text-white">Be reliable:</strong> Follow through on commitments or communicate when things change</p>
              <p><strong className="text-white">Give constructive feedback:</strong> Help each other improve through thoughtful code reviews</p>
            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-red-400">Reporting & Enforcement</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-6">
              
              <div>
                <h3 className="text-white font-bold mb-3">How to Report</h3>
                <p>If you encounter behavior that violates these guidelines, please report it immediately through our platform or email us at abuse@buildrs.dev</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-3">Our Response</h3>
                <p>We investigate all reports promptly and take appropriate action, which may include warnings, temporary suspensions, or permanent bans depending on severity.</p>
              </div>

            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-orange-400">For New Developers</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              New to coding? Welcome! Our community is here to support your journey. Don't hesitate to ask questions, share your learning projects, or look for mentorship opportunities. Everyone was a beginner once.
            </p>
          </div>

        </div>

        {/* Contact */}
        <div className="mt-20 flex justify-center">
          <div className="terminal p-12 max-w-3xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Questions or Concerns?</h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed text-center">
              Help us maintain a positive community for everyone.
            </p>
            <div className="flex justify-center">
              <a href="mailto:community@buildrs.dev" className="btn btn-primary text-lg py-4 px-8">
                Contact Community Team
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 