import Link from 'next/link';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-lg terminal-text">
            ← Back to Buildrs
          </Link>
          <h1 className="text-5xl font-bold terminal-text mt-8 mb-6">Security</h1>
          <p className="text-gray-300 text-xl">Keeping your data and collaborations secure</p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          
          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-green-400">Our Security Commitment</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Security is fundamental to everything we build. We use industry-standard practices to protect your data, communications, and collaborations. Your trust is earned through transparency and proven security measures.
            </p>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Data Protection</h2>
            <div className="space-y-6">
              
              <div>
                <h3 className="text-white font-bold mb-4 text-xl">🔒 Encryption</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  All data is encrypted in transit using TLS 1.3 and at rest using AES-256. Your private communications and sensitive information are protected with end-to-end encryption.
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4 text-xl">🛡️ Access Control</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We use role-based access controls and multi-factor authentication. Only authorized personnel can access systems, and all access is logged and monitored.
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4 text-xl">🔑 Authentication</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Secure OAuth integration with GitHub, strong password requirements, and optional two-factor authentication keep your account protected.
                </p>
              </div>

            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Infrastructure Security</h2>
            <div className="space-y-6">
              
              <div>
                <h3 className="text-white font-bold mb-4 text-xl">☁️ Cloud Security</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We deploy on trusted cloud providers with SOC 2 compliance, DDoS protection, and 24/7 monitoring. Our infrastructure is designed for security and reliability.
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4 text-xl">🔍 Application Security</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Regular security audits, automated vulnerability scanning, and secure coding practices protect against common threats like injection attacks and XSS.
                </p>
              </div>

            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Compliance & Standards</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p><strong className="text-white">GDPR Compliant:</strong> We respect your privacy rights and follow European data protection standards</p>
              <p><strong className="text-white">SOC 2 Certified:</strong> Regular third-party audits verify our security controls and practices</p>
              <p><strong className="text-white">ISO 27001:</strong> We follow international information security management standards</p>
            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-red-400">Incident Response</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-6">
              
              <div>
                <h3 className="text-white font-bold mb-3">24/7 Monitoring</h3>
                <p>Our security team monitors for threats around the clock with automated detection and real-time alerts.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-3">Rapid Response</h3>
                <p>Security incidents are escalated immediately with clear procedures for containment, investigation, and user notification.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-3">Transparency</h3>
                <p>We'll notify affected users within 72 hours of any security incident that may impact their data or account.</p>
              </div>

            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-orange-400">Your Security Best Practices</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p><strong className="text-white">Strong passwords:</strong> Use unique, complex passwords and enable two-factor authentication</p>
              <p><strong className="text-white">Keep software updated:</strong> Use the latest browser versions and security patches</p>
              <p><strong className="text-white">Be cautious with sharing:</strong> Only share sensitive information through our secure platform</p>
              <p><strong className="text-white">Report suspicious activity:</strong> Contact us immediately if you notice anything unusual</p>
            </div>
          </div>

          <div className="terminal p-10">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Bug Bounty Program</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We welcome security researchers to help us improve. If you discover a security vulnerability, please report it responsibly through our bug bounty program. We offer rewards for verified security findings.
            </p>
          </div>

        </div>

        {/* Contact */}
        <div className="mt-20 flex justify-center">
          <div className="terminal p-12 max-w-3xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Security Questions?</h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed text-center">
              Our security team is here to address any concerns or questions about platform security.
            </p>
            <div className="flex justify-center">
              <a href="mailto:security@buildrs.dev" className="btn btn-primary text-lg py-4 px-8">
                Contact Security Team
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 