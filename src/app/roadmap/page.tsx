import Link from 'next/link';

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-lg terminal-text">
            ← Back to Buildrs
          </Link>
          <h1 className="text-5xl font-bold terminal-text mt-8 mb-6">Roadmap</h1>
          <p className="text-gray-300 text-xl">Building the future of developer collaboration</p>
        </div>

        {/* Current Status */}
        <div className="mb-24">
          <div className="terminal p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">🚀 Currently in Alpha Development</h2>
            <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto">
              We&apos;re building the core platform and gathering feedback from early users. Join our waitlist to get early access!
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-20">

          {/* Q1 2025 */}
          <div>
            <div className="flex items-center gap-6 mb-12">
              <div className="text-4xl font-bold terminal-text">Q1 2025</div>
              <div className="flex-1 h-1 bg-green-400"></div>
              <div className="px-6 py-3 bg-green-400 text-black text-lg font-bold rounded">
                IN PROGRESS
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              
              <div className="terminal p-10 border-green-500">
                <h3 className="text-2xl font-bold mb-6 text-green-400">✅ Foundation Complete</h3>
                <div className="space-y-4 text-lg text-gray-300">
                  <p>✓ Landing page and brand</p>
                  <p>✓ Terminal UI design</p>
                  <p>✓ Next.js setup</p>
                  <p>✓ Legal pages</p>
                </div>
              </div>

              <div className="terminal p-10 border-yellow-500">
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">🚧 Core Platform</h3>
                <div className="space-y-4 text-lg text-gray-300">
                  <p>⚠ Swipe interface</p>
                  <p>○ User profiles</p>
                  <p>○ GitHub OAuth</p>
                  <p>○ Real-time chat</p>
                </div>
              </div>

            </div>
          </div>

          {/* Q2 2025 */}
          <div>
            <div className="flex items-center gap-6 mb-12">
              <div className="text-4xl font-bold terminal-text">Q2 2025</div>
              <div className="flex-1 h-1 bg-blue-400"></div>
              <div className="px-6 py-3 bg-blue-400 text-black text-lg font-bold rounded">
                BETA LAUNCH
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="terminal p-8">
                <h3 className="text-xl font-bold mb-4 text-blue-400">🧠 AI Matching</h3>
                <div className="space-y-3 text-lg text-gray-300">
                  <p>• Smart compatibility</p>
                  <p>• Skill analysis</p>
                  <p>• Project matching</p>
                </div>
              </div>

              <div className="terminal p-8">
                <h3 className="text-xl font-bold mb-4 text-green-400">🛠️ Collaboration</h3>
                <div className="space-y-3 text-lg text-gray-300">
                  <p>• Project boards</p>
                  <p>• Git integration</p>
                  <p>• File sharing</p>
                </div>
              </div>

              <div className="terminal p-8">
                <h3 className="text-xl font-bold mb-4 text-purple-400">💰 Pro Plans</h3>
                <div className="space-y-3 text-lg text-gray-300">
                  <p>• Stripe payments</p>
                  <p>• Feature controls</p>
                  <p>• Analytics</p>
                </div>
              </div>

            </div>
          </div>

          {/* Q3 2025 */}
          <div>
            <div className="flex items-center gap-6 mb-12">
              <div className="text-4xl font-bold terminal-text">Q3 2025</div>
              <div className="flex-1 h-1 bg-purple-400"></div>
              <div className="px-6 py-3 bg-purple-400 text-black text-lg font-bold rounded">
                COMMUNITY
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="terminal p-8">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">🌍 Community</h3>
                <div className="space-y-3 text-lg text-gray-300">
                  <p>• Developer forums</p>
                  <p>• Knowledge sharing</p>
                  <p>• Mentorship programs</p>
                </div>
              </div>

              <div className="terminal p-8">
                <h3 className="text-xl font-bold mb-4 text-blue-400">📱 Mobile Apps</h3>
                <div className="space-y-3 text-lg text-gray-300">
                  <p>• iOS application</p>
                  <p>• Android application</p>
                  <p>• Push notifications</p>
                </div>
              </div>

            </div>
          </div>

          {/* Q4 2025 */}
          <div>
            <div className="flex items-center gap-6 mb-12">
              <div className="text-4xl font-bold terminal-text">Q4 2025</div>
              <div className="flex-1 h-1 bg-yellow-400"></div>
              <div className="px-6 py-3 bg-yellow-400 text-black text-lg font-bold rounded">
                ENTERPRISE
              </div>
            </div>

            <div className="terminal p-10">
              <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">🏢 Team Features</h3>
              <div className="grid md:grid-cols-3 gap-8 text-lg text-gray-300">
                <div className="space-y-3">
                  <p>• Team management</p>
                  <p>• Organization profiles</p>
                </div>
                <div className="space-y-3">
                  <p>• Advanced integrations</p>
                  <p>• Custom dashboards</p>
                </div>
                <div className="space-y-3">
                  <p>• Enterprise analytics</p>
                  <p>• Dedicated support</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Progress Stats */}
        <div className="mt-24 mb-20">
          <h2 className="text-4xl font-bold terminal-text text-center mb-16">Development Progress</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            
            <div className="terminal p-8 text-center">
              <div className="text-4xl font-bold text-green-400 mb-4">85%</div>
              <div className="text-gray-300 text-lg">Frontend</div>
            </div>

            <div className="terminal p-8 text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-4">15%</div>
              <div className="text-gray-300 text-lg">Backend</div>
            </div>

            <div className="terminal p-8 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-4">1,247</div>
              <div className="text-gray-300 text-lg">Waitlist</div>
            </div>

            <div className="terminal p-8 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-4">Q2</div>
              <div className="text-gray-300 text-lg">Beta Launch</div>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <div className="terminal p-12 max-w-3xl w-full">
            <h2 className="text-3xl font-bold mb-6 text-center">Want to Help Shape the Future?</h2>
            <p className="text-gray-300 mb-8 text-xl leading-relaxed text-center">
              Join our waitlist to get early access and help us build the best developer collaboration platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="/" className="btn btn-primary text-xl py-4 px-8 w-full sm:w-auto">
                Join Waitlist
              </a>
              <a href="https://github.com/devjohxylon/Buildrs" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-xl py-4 px-8 w-full sm:w-auto">
                Follow on GitHub
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 