'use client';

import React from 'react';
import Image from 'next/image';

interface AboutSectionProps {
  content: {
    title?: string;
    text?: string;
    description?: string;
    profilePhoto?: string;
    profileImage?: string;
    layout?: 'left' | 'right';
  };
}

export function AboutSection({ content }: AboutSectionProps) {
  const profileImage = content.profilePhoto || content.profileImage;
  const layout = content.layout || 'left';
  const text = content.text || content.description || 'Add some information about yourself or your business.';

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${
            layout === 'right' ? 'md:grid-cols-2-reverse' : ''
          }`}
        >
          {/* Text Content */}
          <div className={`space-y-6 ${layout === 'right' ? 'md:order-last' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold">{content.title || 'About'}</h2>
            <div className="text-zinc-600 text-lg space-y-4 leading-relaxed whitespace-pre-wrap">
              {text}
            </div>
          </div>

          {/* Image */}
          {profileImage && (
            <div className={`${layout === 'right' ? 'md:order-first' : ''}`}>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={profileImage}
                  alt="About Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
