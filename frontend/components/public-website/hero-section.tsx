'use client';

import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  content: {
    heading?: string;
    subheading?: string;
    backgroundImage?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export function HeroSection({ content }: HeroSectionProps) {
  const backgroundImage = content.backgroundImage || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070';

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center space-y-4 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {content.heading || 'Welcome to Your Portfolio'}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto text-gray-100">
          {content.subheading || 'Showcase your best work'}
        </p>
        {content.ctaText && (
          <a
            href={content.ctaLink || '#work'}
            className="inline-block mt-8 px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition transform hover:scale-105"
          >
            {content.ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
