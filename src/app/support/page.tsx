import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-lg terminal-text">
            ← Back to Buildrs
          </Link>
          <h1 className="text-5xl font-bold terminal-text mt-8 mb-6">Support</h1>
          <p className="text-gray-300 text-xl">We're here to help you succeed</p>
        </div>

        {/* Quick Help */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold terminal-text mb-12">Quick Help</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="terminal p-8">
              <h3 className="text-2xl font-bold mb-4 text-green-400">📚 Documentation</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Learn how to use Buildrs with our comprehensive guides and tutorials.
              </p>
              <a href="/docs" className="btn btn-secondary text-lg py-3 px-6">
                Read Docs
              </a>
            </div>

            <div className="terminal p-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">❓ FAQ</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Find answers to the most common questions about our platform.
              </p>
              <a href="#faq" className="btn btn-secondary text-lg py-3 px-6">
                View FAQ
              </a>
            </div>

          </div>
        </div>

        {/* Contact Options */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold terminal-text mb-12">Get in Touch</h2>
          
          <div className="space-y-8">
            
            <div className="terminal p-10">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">📧 Email Support</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <a href="mailto:support@buildrs.dev" className="btn btn-primary text-lg py-4 px-8">
                Email Support Team
              </a>
            </div>

            <div className="terminal p-10">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">💬 Community</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Connect with other developers and get help through our platform.
              </p>
              <a href="/community" className="btn btn-secondary text-lg py-4 px-8">
                Join Community
              </a>
            </div>

            <div className="terminal p-10">
              <h3 className="text-2xl font-bold mb-6 text-orange-400">🐛 Bug Reports</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Found a bug? Report it on GitHub and help us improve the platform.
              </p>
              <a href="https://github.com/devjohxylon/Buildrs/issues" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-lg py-4 px-8">
                Report Bug
              </a>
            </div>

          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="mb-20">
          <h2 className="text-4xl font-bold terminal-text mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            
            <div className="terminal p-8">
              <h3 className="text-xl font-bold mb-4 text-white">How do I get started with Buildrs?</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Join our waitlist while we're in alpha development. Once you have access, connect your GitHub account and complete your developer profile to start matching with collaborators.
              </p>
            </div>

            <div className="terminal p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Is Buildrs really free?</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Yes! Our Starter plan is completely free with basic features. Pro plans ($9/mo) unlock unlimited swipes, AI matching, and advanced collaboration tools.
              </p>
            </div>

            <div className="terminal p-8">
              <h3 className="text-xl font-bold mb-4 text-white">How does the matching algorithm work?</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our AI analyzes your skills, interests, and collaboration preferences to suggest compatible developers and relevant projects. The more complete your profile, the better the matches.
              </p>
            </div>

            <div className="terminal p-8">
              <h3 className="text-xl font-bold mb-4 text-white">What if I'm new to programming?</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Welcome! Buildrs is perfect for learning. Many experienced developers enjoy mentoring beginners. Be honest about your skill level in your profile to find the right collaborators.
              </p>
            </div>

            <div className="terminal p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Can I work on existing projects?</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Absolutely! Many developers post existing projects looking for contributors, maintainers, or co-developers. You can also start new projects from scratch.
              </p>
            </div>

          </div>
        </div>

        {/* Contact CTA */}
        <div className="flex justify-center">
          <div className="terminal p-12 max-w-3xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Still Need Help?</h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed text-center">
              Our support team is here to help you succeed on Buildrs.
            </p>
            <div className="flex justify-center">
              <a href="mailto:support@buildrs.dev" className="btn btn-primary text-lg py-4 px-8">
                Contact Support
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 