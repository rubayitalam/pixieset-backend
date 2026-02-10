'use client';

import React, { useState } from 'react';
import api from '@/lib/api';

interface ContactSectionProps {
  content: {
    title?: string;
    email?: string;
    phone?: string;
    social?: Record<string, string>;
    socialLinks?: Record<string, string>;
    enableForm?: boolean;
  };
  websiteId: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactSection({ content, websiteId }: ContactSectionProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const socialLinks = content.social || content.socialLinks || {};

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await api.post('/contact', {
        ...formData,
        websiteId,
      });
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {content.title || 'Get in Touch'}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {content.email && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                <p className="text-sm text-gray-500 mb-2 font-semibold">EMAIL</p>
                <a href={`mailto:${content.email}`} className="text-lg font-medium text-black hover:text-blue-600 transition">
                  {content.email}
                </a>
              </div>
            )}

            {content.phone && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                <p className="text-sm text-gray-500 mb-2 font-semibold">PHONE</p>
                <a href={`tel:${content.phone}`} className="text-lg font-medium text-black hover:text-blue-600 transition">
                  {content.phone}
                </a>
              </div>
            )}

            {Object.keys(socialLinks).length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500 mb-4 font-semibold">FOLLOW</p>
                <div className="flex gap-4 flex-wrap">
                  {Object.entries(socialLinks).map(([key, url]: [string, any]) =>
                    url ? (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="capitalize px-4 py-2 bg-gray-100 hover:bg-black hover:text-white transition rounded-lg font-medium text-sm"
                      >
                        {key}
                      </a>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          {content.enableForm !== false && (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Message subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                  {submitMessage}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  {submitMessage}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
