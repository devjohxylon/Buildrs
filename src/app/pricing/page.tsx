import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-lg terminal-text">
            ← Back to Buildrs
          </Link>
          <h1 className="text-5xl font-bold terminal-text mt-8 mb-6">Pricing</h1>
          <p className="text-gray-300 text-xl">Simple pricing for every developer</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          
          {/* Free Plan */}
          <div className="terminal p-10">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 text-green-400">Starter</h3>
              <div className="text-5xl font-bold mb-6">Free</div>
              <p className="text-gray-300 text-lg mb-8">Perfect for getting started</p>
              
              <div className="space-y-4 mb-10 text-lg">
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">5 swipes per day</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Basic profile</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Chat with matches</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">1 active project</span>
                </div>
              </div>
              
              <button className="btn btn-secondary w-full text-lg py-4">
                Get Started Free
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="terminal p-10 border-blue-500 border-2">
            <div className="text-center">
              <div className="text-blue-400 font-bold mb-4 text-lg">MOST POPULAR</div>
              <h3 className="text-3xl font-bold mb-4 text-blue-400">Pro</h3>
              <div className="text-5xl font-bold mb-2">$9</div>
              <div className="text-gray-400 text-lg mb-6">per month</div>
              <p className="text-gray-300 text-lg mb-8">For serious collaborators</p>
              
              <div className="space-y-4 mb-10 text-lg">
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Everything in Starter</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Unlimited swipes</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">AI-powered matching</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">5 active projects</span>
                </div>
              </div>
              
              <button className="btn btn-primary w-full text-lg py-4">
                Start 14-Day Trial
              </button>
            </div>
          </div>

          {/* Team Plan */}
          <div className="terminal p-10">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 text-purple-400">Team</h3>
              <div className="text-5xl font-bold mb-2">$25</div>
              <div className="text-gray-400 text-lg mb-6">per month</div>
              <p className="text-gray-300 text-lg mb-8">For development teams</p>
              
              <div className="space-y-4 mb-10 text-lg">
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Everything in Pro</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Team management</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Unlimited projects</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Advanced analytics</span>
                </div>
              </div>
              
              <button className="btn btn-secondary w-full text-lg py-4">
                Contact Sales
              </button>
            </div>
          </div>

        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold terminal-text text-center mb-16">Questions?</h2>
          
          <div className="space-y-8">
            <div className="terminal p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Can I cancel anytime?</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Yes! Cancel your subscription anytime. You&apos;ll keep Pro features until your billing period ends.
              </p>
            </div>
            
            <div className="terminal p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Is there a free trial?</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Absolutely! Pro users get a 14-day free trial. No credit card required to start.
              </p>
            </div>
            
            <div className="terminal p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">What payment methods do you accept?</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                We accept all major credit cards and PayPal. Payments are processed securely through Stripe.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="flex justify-center">
          <div className="terminal p-12 max-w-3xl w-full">
            <h2 className="text-3xl font-bold mb-6 text-center">Need Help Choosing?</h2>
            <p className="text-gray-300 mb-8 text-xl leading-relaxed text-center">
              Our team is here to help you find the right plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="mailto:sales@buildrs.dev" className="btn btn-secondary text-xl py-4 px-8 w-full sm:w-auto">
                Contact Sales
              </a>
              <a href="/docs" className="btn btn-primary text-xl py-4 px-8 w-full sm:w-auto">
                Read Docs
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 