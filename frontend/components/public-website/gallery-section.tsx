'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface GallerySectionProps {
  content: {
    title?: string;
    description?: string;
    images?: { url: string; alt?: string; caption?: string }[];
    columns?: number;
    aspectRatio?: 'square' | 'portrait' | 'landscape';
  };
}

export function GallerySection({ content }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = content.images || [];
  const columns = content.columns || 3;
  const aspectRatio = content.aspectRatio || 'square';

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-video',
  };

  const gridClasses = cn(
    'grid gap-4 w-full',
    columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
      columns === 3 ? 'grid-cols-1 md:grid-cols-3' :
        columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
          'grid-cols-1 md:grid-cols-3'
  );

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {content.title || 'Gallery'}
        </h2>
        {content.description && (
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            {content.description}
          </p>
        )}
      </div>

      <div className={gridClasses}>
        {images.length > 0 ? (
          images.map((img, index) => (
            <div
              key={index}
              className={cn(
                'relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer group',
                aspectClasses[aspectRatio]
              )}
              onClick={() => setSelectedImage(img.url)}
            >
              <img
                src={img.url}
                alt={img.alt || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              {img.caption && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">{img.caption}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          // Placeholder grid
          Array(columns * 2)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 font-medium',
                  aspectClasses[aspectRatio]
                )}
              >
                Image {i + 1}
              </div>
            ))
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Full size gallery image"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-2xl font-bold hover:text-gray-300 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
