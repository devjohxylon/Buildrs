import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-lg terminal-text">
            ← Back to Buildrs
          </Link>
          <h1 className="text-5xl font-bold terminal-text mt-8 mb-6">Contact</h1>
          <p className="text-gray-300 text-xl">Get in touch with the Buildrs team</p>
        </div>

        {/* Contact Options */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold terminal-text mb-12">How to Reach Us</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="terminal p-10">
              <h3 className="text-2xl font-bold mb-6 text-green-400">💬 General Inquiries</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Questions about Buildrs, partnerships, or just want to say hello?
              </p>
              <a href="mailto:hello@buildrs.dev" className="btn btn-primary text-lg py-4 px-8">
                Email Us
              </a>
            </div>

            <div className="terminal p-10">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">🚀 Business & Partnerships</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Interested in partnerships, integrations, or enterprise solutions?
              </p>
              <a href="mailto:business@buildrs.dev" className="btn btn-secondary text-lg py-4 px-8">
                Contact Business Team
              </a>
            </div>

          </div>
        </div>

        {/* Specialized Contact */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold terminal-text mb-12">Specialized Support</h2>
          
          <div className="space-y-8">
            
            <div className="terminal p-8">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">🛠️ Technical Support</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Need help with the platform or experiencing technical issues? Our support team is here to help.
                <br />
                <a href="mailto:support@buildrs.dev" className="text-blue-400 hover:text-blue-300">support@buildrs.dev</a>
              </p>
            </div>

            <div className="terminal p-8">
              <h3 className="text-xl font-bold mb-4 text-purple-400">🔒 Security & Privacy</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Security vulnerabilities, privacy concerns, or data protection questions.
                <br />
                <a href="mailto:security@buildrs.dev" className="text-blue-400 hover:text-blue-300">security@buildrs.dev</a>
              </p>
            </div>

            <div className="terminal p-8">
              <h3 className="text-xl font-bold mb-4 text-red-400">⚖️ Legal & Compliance</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Legal inquiries, terms of service questions, or compliance matters.
                <br />
                <a href="mailto:legal@buildrs.dev" className="text-blue-400 hover:text-blue-300">legal@buildrs.dev</a>
              </p>
            </div>

            <div className="terminal p-8">
              <h3 className="text-xl font-bold mb-4 text-orange-400">📰 Press & Media</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Journalists, bloggers, or media inquiries about Buildrs and our mission.
                <br />
                <a href="mailto:press@buildrs.dev" className="text-blue-400 hover:text-blue-300">press@buildrs.dev</a>
              </p>
            </div>

          </div>
        </div>

        {/* Social & Community */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold terminal-text mb-12">Join Our Community</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="terminal p-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">GitHub</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Follow our development and contribute to the project.
              </p>
              <a href="https://github.com/devjohxylon/Buildrs" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-lg py-3 px-6">
                View Repository
              </a>
            </div>

            <div className="terminal p-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-indigo-400">Discord</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Chat with other developers and get quick support.
              </p>
              <a href="/discord" className="btn btn-secondary text-lg py-3 px-6">
                Join Server
              </a>
            </div>

            <div className="terminal p-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-pink-400">Twitter</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Stay updated with the latest news and announcements.
              </p>
              <a href="https://twitter.com/buildrsdev" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-lg py-3 px-6">
                Follow Us
              </a>
            </div>

          </div>
        </div>

        {/* Response Time */}
        <div className="mb-20">
          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-400">Response Times</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">24 hours</div>
                <div className="text-gray-300 text-lg">General Inquiries</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">12 hours</div>
                <div className="text-gray-300 text-lg">Technical Support</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-red-400 mb-2">4 hours</div>
                <div className="text-gray-300 text-lg">Security Issues</div>
              </div>

            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <div className="terminal p-12 max-w-3xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Ready to Get in Touch?</h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed text-center">
              We&apos;d love to hear from you. Choose the best way to reach our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="mailto:hello@buildrs.dev" className="btn btn-primary text-lg py-4 px-8 w-full sm:w-auto">
                Send Email
              </a>
              <a href="/support" className="btn btn-secondary text-lg py-4 px-8 w-full sm:w-auto">
                Get Support
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 