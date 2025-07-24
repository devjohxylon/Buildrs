'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, Users, Github } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white lg:ml-64">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-lg transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Back to Buildrs</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions, feedback, or want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-4">
                  Thanks for reaching out. We'll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="label text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Email</p>
                    <p className="text-gray-400">hello@buildrs.net</p>
                    <p className="text-sm text-gray-500">For general inquiries and support</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <MessageSquare className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Community Forum</p>
                    <Link href="/forums" className="text-blue-400 hover:text-blue-300">
                      Visit Forums
                    </Link>
                    <p className="text-sm text-gray-500">Join discussions and get help from the community</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                    <Github className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">GitHub</p>
                    <a href="https://github.com/devjohxylon/Buildrs" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                      @devjohxylon/Buildrs
                    </a>
                    <p className="text-sm text-gray-500">Open source contributions and issues</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Response Time</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex justify-between">
                  <span>General inquiries</span>
                  <span className="text-green-400">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Technical support</span>
                  <span className="text-blue-400">4-8 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Bug reports</span>
                  <span className="text-orange-400">2-4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Feature requests</span>
                  <span className="text-purple-400">1-2 business days</span>
                </div>
              </div>
            </div>

            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Before You Contact Us</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>• Check our <Link href="/docs" className="text-blue-400 hover:text-blue-300">documentation</Link> for common questions</p>
                <p>• Visit our <Link href="/forums" className="text-blue-400 hover:text-blue-300">community forums</Link> for peer support</p>
                <p>• Review our <Link href="/roadmap" className="text-blue-400 hover:text-blue-300">roadmap</Link> for upcoming features</p>
                <p>• For bugs, please include steps to reproduce and your environment details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 