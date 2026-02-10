'use client';

import React from 'react';
import { HeroSection } from './hero-section';
import { GallerySection } from './gallery-section';
import { AboutSection } from './about-section';
import { ContactSection } from './contact-section';
import type { WebsiteConfig } from '@/types';

interface PublicWebsiteRendererProps {
  config: WebsiteConfig;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    accentColor?: string;
  };
  websiteId: string;
}

export function PublicWebsiteRenderer({
  config,
  theme,
  websiteId,
}: PublicWebsiteRendererProps) {
  const sections = config.sections || [];
  const customCss = config.advanced?.customCss;
  const gaId = config.integrations?.googleAnalyticsId;

  // Apply custom theme if provided
  const bodyStyle = theme?.fontFamily
    ? { fontFamily: theme.fontFamily }
    : {};

  return (
    <div style={bodyStyle}>
      {/* Custom Global CSS */}
      {customCss && (
        <style dangerouslySetInnerHTML={{ __html: customCss }} />
      )}

      {/* Google Analytics Integration */}
      {gaId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `,
            }}
          />
        </>
      )}

      {sections
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((section, index) => {
          const sectionType = section.type?.toLowerCase();
          const content = section.content || {};

          switch (sectionType) {
            case 'hero':
              return <HeroSection key={index} content={content} />;

            case 'gallery':
              return <GallerySection key={index} content={content} />;

            case 'about':
              return <AboutSection key={index} content={content} />;

            case 'contact':
              return <ContactSection key={index} content={content} websiteId={websiteId} />;

            default:
              return (
                <section key={index} className="py-8 px-4 text-center">
                  <p className="text-gray-500">Unknown section type: {section.type}</p>
                </section>
              );
          }
        })}
    </div>
  );
}
