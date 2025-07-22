import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-lg terminal-text">
            ← Back to Buildrs
          </Link>
          <h1 className="text-5xl font-bold terminal-text mt-8 mb-6">Terms of Service</h1>
          <p className="text-gray-300 text-xl">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          
          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-green-400">About Buildrs</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Buildrs is a platform where developers can discover collaboration opportunities, connect with like-minded builders, and work together on coding projects. By using our service, you agree to these terms.
            </p>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Your Account</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>• You must be at least 13 years old to use Buildrs</p>
              <p>• Provide accurate information when creating your account</p>
              <p>• Keep your account secure and don&apos;t share login credentials</p>
              <p>• You&apos;re responsible for all activity on your account</p>
            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Platform Rules</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p><strong className="text-white">Be respectful:</strong> Treat all community members with kindness and professionalism.</p>
              <p><strong className="text-white">No spam or self-promotion:</strong> Focus on genuine collaboration, not promotion.</p>
              <p><strong className="text-white">Respect intellectual property:</strong> Don&apos;t share or use others' code without permission.</p>
              <p><strong className="text-white">Keep it relevant:</strong> Share content related to development and collaboration.</p>
            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Your Content</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>You retain ownership of any code, ideas, or content you share on Buildrs.</p>
              <p>By posting content, you grant us permission to display it on our platform.</p>
              <p>You&apos;re responsible for ensuring you have the right to share any content you post.</p>
            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-red-400">Service Availability</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>We strive for 99.9% uptime but can&apos;t guarantee uninterrupted service.</p>
              <p>We may need to perform maintenance or updates that temporarily affect availability.</p>
              <p>We reserve the right to modify or discontinue features with reasonable notice.</p>
            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-orange-400">Limitation of Liability</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Buildrs is provided "as is" without warranties. We&apos;re not liable for any damages arising from your use of the platform or interactions with other users. Always use good judgment when collaborating with others online.
            </p>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Changes to Terms</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We may update these terms occasionally. We&apos;ll notify users of significant changes via email or platform notifications. Continued use of Buildrs constitutes acceptance of updated terms.
            </p>
          </div>

        </div>

        {/* Contact */}
        <div className="mt-20 flex justify-center">
          <div className="terminal p-12 max-w-3xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Questions About These Terms?</h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed text-center">
              We&apos;re happy to clarify anything about our terms of service.
            </p>
            <div className="flex justify-center">
              <a href="mailto:legal@buildrs.dev" className="btn btn-primary text-lg py-4 px-8">
                Contact Legal Team
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 