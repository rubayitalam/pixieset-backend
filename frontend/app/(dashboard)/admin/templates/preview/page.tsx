'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function TemplatePreviewPage() {
  const templates = [
    {
      name: 'Minimal',
      description: 'Clean, modern design with focus on large hero imagery and galleries',
      colors: ['#FFFFFF', '#F5F5F5', '#000000'],
      features: ['Clean white design', '3-column gallery', 'Simple contact form', 'Responsive'],
      preview: (
        <div className="bg-white">
          {/* Hero */}
          <div className="bg-gradient-to-b from-gray-200 to-gray-100 h-64 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-light mb-2">Your Story</h1>
              <p className="text-gray-600 font-light">Professional Photography</p>
            </div>
          </div>
          {/* Gallery */}
          <div className="px-6 py-12">
            <h2 className="text-3xl font-light mb-8">Recent Work</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 aspect-square"></div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Bold',
      description: 'Dark, modern theme with masonry gallery and animated sections',
      colors: ['#000000', '#1a1a1a', '#FFFFFF'],
      features: ['Dark theme', 'Masonry gallery', 'Bold typography', 'Animated sections'],
      preview: (
        <div className="bg-black text-white">
          {/* Hero */}
          <div className="bg-gray-800 h-64 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold uppercase tracking-widest mb-2">BOLD</h1>
              <p className="text-xl uppercase tracking-wider">Creative Vision</p>
            </div>
          </div>
          {/* Gallery */}
          <div className="px-6 py-12">
            <h2 className="text-5xl font-bold uppercase tracking-widest mb-8">Portfolio</h2>
            <div className="grid grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-700 aspect-square"></div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Classic',
      description: 'Elegant, timeless design with serif fonts and carousel hero',
      colors: ['#FEFAF5', '#F5F1E8', '#4A4A4A'],
      features: ['Serif typography', '2-column gallery', 'Timeline support', 'Elegant'],
      preview: (
        <div className="bg-amber-50 text-amber-900">
          {/* Hero */}
          <div className="bg-gradient-to-b from-amber-100 to-amber-50 h-64 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-serif font-semibold mb-2">Timeless Moments</h1>
              <p className="text-lg font-serif italic font-light">Crafted with care and elegance</p>
            </div>
          </div>
          {/* Gallery */}
          <div className="px-6 py-12">
            <h2 className="text-4xl font-serif font-semibold mb-8">Collection</h2>
            <div className="grid grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-amber-200 aspect-video border-2 border-amber-900/20"></div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/admin/templates">
            <Button variant="outline" className="mb-4">← Back to Templates</Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Template Previews</h1>
          <p className="text-gray-600">Select a template to see how it looks</p>
        </div>

        <div className="space-y-12">
          {templates.map((template) => (
            <div key={template.name} className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{template.name}</h2>
                  <p className="text-gray-600">{template.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Preview */}
                <div className="lg:col-span-2 border rounded-lg overflow-hidden bg-white shadow-md">
                  <div className="max-h-96 overflow-auto">
                    {template.preview}
                  </div>
                </div>

                {/* Info */}
                <Card className="p-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Colors */}
                    <div>
                      <h4 className="font-semibold mb-2">Color Palette</h4>
                      <div className="flex gap-2">
                        {template.colors.map((color) => (
                          <div
                            key={color}
                            className="flex-1 h-12 rounded border border-gray-200"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold mb-2">Features</h4>
                      <ul className="space-y-1">
                        {template.features.map((feature, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center">
                            <span className="mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button className="w-full mt-6">Use This Template</Button>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
