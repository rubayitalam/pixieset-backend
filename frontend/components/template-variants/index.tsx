'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Template variant component wrapper with theme support
interface TemplateWrapperProps {
  variant: 'minimal' | 'bold' | 'classic';
  children: React.ReactNode;
  className?: string;
}

export function TemplateWrapper({ variant, children, className }: TemplateWrapperProps) {
  const baseClasses = 'w-full';

  const variantClasses = {
    minimal: 'bg-white text-gray-900 font-sans',
    bold: 'bg-black text-white font-inter text-lg uppercase',
    classic: 'bg-amber-50 text-amber-900 font-serif tracking-wide',
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
}

// Hero section variants
interface HeroVariantProps {
  heading: string;
  subheading: string;
  backgroundImage: string;
  ctaText?: string;
  variant: 'minimal' | 'bold' | 'classic';
}

export function HeroSectionVariant({
  heading,
  subheading,
  backgroundImage,
  ctaText,
  variant,
}: HeroVariantProps) {
  const variantStyles = {
    minimal: {
      container: 'relative h-screen bg-cover bg-center',
      overlay: 'absolute inset-0 bg-black/30',
      content: 'relative z-10 flex flex-col items-center justify-center h-full px-4 text-center',
      heading: 'text-5xl font-light mb-2 tracking-tight',
      subheading: 'text-xl font-light text-gray-600 mb-8',
      button: 'px-8 py-3 bg-black text-white hover:bg-gray-800',
    },
    bold: {
      container: 'relative h-screen bg-cover bg-center',
      overlay: 'absolute inset-0 bg-black/60',
      content: 'relative z-10 flex flex-col items-center justify-center h-full px-4 text-center',
      heading: 'text-7xl font-bold mb-4 uppercase tracking-widest',
      subheading: 'text-2xl font-bold uppercase mb-12 tracking-wider',
      button: 'px-12 py-4 bg-white text-black hover:bg-gray-200 font-bold uppercase',
    },
    classic: {
      container: 'relative h-screen bg-cover bg-center',
      overlay: 'absolute inset-0 bg-gradient-to-b from-black/20 to-black/40',
      content: 'relative z-10 flex flex-col items-center justify-center h-full px-4 text-center',
      heading: 'text-6xl font-serif mb-3 tracking-wide font-semibold',
      subheading: 'text-xl font-serif italic mb-8 font-light',
      button: 'px-12 py-4 border-2 border-current hover:bg-current hover:text-amber-50 transition',
    },
  };

  const style = variantStyles[variant];

  return (
    <div className={style.container} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={style.overlay} />
      <div className={style.content}>
        <h1 className={style.heading}>{heading}</h1>
        <p className={style.subheading}>{subheading}</p>
        {ctaText && <button className={style.button}>{ctaText}</button>}
      </div>
    </div>
  );
}

// Gallery section variants
interface GalleryVariantProps {
  title: string;
  variant: 'minimal' | 'bold' | 'classic';
  images: string[];
}

export function GallerySectionVariant({ title, variant, images }: GalleryVariantProps) {
  const variantStyles = {
    minimal: {
      container: 'px-6 py-20 max-w-6xl mx-auto',
      title: 'text-4xl font-light mb-12 text-center',
      grid: 'grid grid-cols-3 gap-4',
      image: 'w-full aspect-square object-cover',
    },
    bold: {
      container: 'px-6 py-32 bg-black',
      title: 'text-5xl font-bold mb-16 text-center uppercase tracking-widest',
      grid: 'grid grid-cols-2 md:grid-cols-3 gap-8 auto-rows-max',
      image: 'w-full object-cover',
    },
    classic: {
      container: 'px-6 py-24 max-w-6xl mx-auto',
      title: 'text-4xl font-serif mb-12 text-center font-semibold',
      grid: 'grid grid-cols-2 gap-8',
      image: 'w-full aspect-video object-cover border-2 border-amber-900/20',
    },
  };

  const style = variantStyles[variant];

  return (
    <section className={style.container}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.grid}>
        {images.map((img, i) => (
          <img key={i} src={img} alt={`Gallery ${i}`} className={style.image} />
        ))}
      </div>
    </section>
  );
}

// About section variants
interface AboutVariantProps {
  title: string;
  content: string;
  variant: 'minimal' | 'bold' | 'classic';
  profileImage?: string;
}

export function AboutSectionVariant({
  title,
  content,
  variant,
  profileImage,
}: AboutVariantProps) {
  const variantStyles = {
    minimal: {
      container: 'px-6 py-20 max-w-4xl mx-auto grid grid-cols-2 gap-12 items-center',
      title: 'text-3xl font-light mb-6',
      content: 'text-lg font-light leading-relaxed text-gray-700',
      image: 'w-full aspect-square object-cover',
    },
    bold: {
      container: 'px-6 py-32 bg-gray-900 text-white grid grid-cols-2 gap-16 items-center max-w-6xl mx-auto',
      title: 'text-4xl font-bold mb-8 uppercase tracking-widest',
      content: 'text-lg leading-relaxed font-light',
      image: 'w-full aspect-square object-cover border-4 border-white',
    },
    classic: {
      container: 'px-6 py-24 max-w-5xl mx-auto',
      title: 'text-4xl font-serif mb-8 text-center font-semibold',
      content: 'text-lg font-serif leading-relaxed text-center max-w-3xl mx-auto mb-12',
      image: 'w-full max-w-md mx-auto aspect-square object-cover border-4 border-amber-900/30',
    },
  };

  const style = variantStyles[variant];

  return (
    <section className={style.container}>
      <div>
        <h2 className={style.title}>{title}</h2>
        <p className={style.content}>{content}</p>
      </div>
      {profileImage && <img src={profileImage} alt="Profile" className={style.image} />}
    </section>
  );
}
