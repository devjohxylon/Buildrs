import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-lg terminal-text">
            ← Back to Buildrs
          </Link>
          <h1 className="text-5xl font-bold terminal-text mt-8 mb-6">Privacy Policy</h1>
          <p className="text-gray-300 text-xl">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          
          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-green-400">Our Privacy Commitment</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              At Buildrs, we believe your privacy is fundamental. We don&apos;t sell your data, we minimize what we collect, and we store sensitive information locally on your device whenever possible.
            </p>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Information We Collect</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-6">
              
              <div>
                <h3 className="text-white font-bold mb-3">Account Information</h3>
                <p>• Email address and basic profile details</p>
                <p>• GitHub username and public repository data</p>
                <p>• Skills, interests, and collaboration preferences</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-3">Usage Data</h3>
                <p>• How you interact with profiles and projects</p>
                <p>• Features you use and time spent on platform</p>
                <p>• Error logs and performance metrics</p>
              </div>

            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">How We Use Your Data</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p><strong className="text-white">Matching:</strong> To suggest compatible collaborators and relevant projects</p>
              <p><strong className="text-white">Communication:</strong> To enable chat and collaboration features</p>
              <p><strong className="text-white">Improvement:</strong> To analyze usage patterns and improve our platform</p>
              <p><strong className="text-white">Safety:</strong> To prevent abuse and maintain community standards</p>
            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Data Storage & Security</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-6">
              
              <div>
                <h3 className="text-white font-bold mb-3">Local-First Approach</h3>
                <p>Sensitive data like private messages and personal notes are stored locally on your device when possible, not on our servers.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-3">Server Security</h3>
                <p>Data we do store is encrypted in transit and at rest. We use industry-standard security practices and regularly audit our systems.</p>
              </div>

            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-red-400">Data Sharing</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p><strong className="text-white">We never sell your data.</strong> Your information is not a product.</p>
              <p><strong className="text-white">Public profiles:</strong> Information you choose to display publicly is visible to other users</p>
              <p><strong className="text-white">Service providers:</strong> We may share data with trusted partners who help operate our platform (hosting, analytics)</p>
              <p><strong className="text-white">Legal requirements:</strong> We may disclose data if required by law or to protect user safety</p>
            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-orange-400">Your Rights</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p><strong className="text-white">Access:</strong> Request a copy of all data we have about you</p>
              <p><strong className="text-white">Correction:</strong> Update or correct inaccurate information</p>
              <p><strong className="text-white">Deletion:</strong> Delete your account and associated data</p>
              <p><strong className="text-white">Portability:</strong> Export your data in a machine-readable format</p>
            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Cookies & Tracking</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We use minimal cookies for essential functions like keeping you logged in. We don&apos;t use third-party advertising cookies or tracking scripts. You can disable cookies in your browser, though some features may not work properly.
            </p>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-pink-400">Updates to This Policy</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We may update this privacy policy occasionally. We&apos;ll notify users of significant changes via email or platform notifications. Continued use of Buildrs constitutes acceptance of updated policies.
            </p>
          </div>

        </div>

        {/* Contact */}
        <div className="mt-20 flex justify-center">
          <div className="terminal p-12 max-w-3xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Privacy Questions?</h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed text-center">
              We&apos;re transparent about our privacy practices and happy to answer any questions.
            </p>
            <div className="flex justify-center">
              <a href="mailto:privacy@buildrs.dev" className="btn btn-primary text-lg py-4 px-8">
                Contact Privacy Team
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 