"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
    type: string;
    content: any;
}

export function SectionRenderer({ type, content }: SectionProps) {
    switch (type.toLowerCase()) {
        case 'hero':
            return <HeroSection content={content} />;
        case 'gallery':
            return <GallerySection content={content} />;
        case 'about':
            return <AboutSection content={content} />;
        case 'contact':
            return <ContactSection content={content} />;
        default:
            return <div className="p-8 text-center border">Unknown section type: {type}</div>;
    }
}

function HeroSection({ content }: { content: any }) {
    return (
        <section
            className="relative h-[500px] flex items-center justify-center text-white bg-cover bg-center"
            style={{ backgroundImage: `url(${content.backgroundImage || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070'})` }}
        >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 text-center space-y-4 px-4">
                <h1 className="text-4xl md:text-6xl font-bold">{content.heading || 'Your Heading'}</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">{content.subheading || 'Your Subheading'}</p>
                {content.ctaText && (
                    <a
                        href={content.ctaLink || '#'}
                        className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition"
                    >
                        {content.ctaText}
                    </a>
                )}
            </div>
        </section>
    );
}

function GallerySection({ content }: { content: any }) {
    const images = content.images || [];// Assume images are in content for now
    const columns = content.columns || 3;

    return (
        <section className="py-16 px-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{content.title || 'Gallery'}</h2>
            <div className={cn(
                "grid gap-4",
                columns === 2 ? "grid-cols-1 md:grid-cols-2" :
                    columns === 3 ? "grid-cols-1 md:grid-cols-3" :
                        "grid-cols-1 md:grid-cols-4"
            )}>
                {images.length > 0 ? images.map((img: any, i: number) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img src={img.url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                    </div>
                )) : (
                    Array(columns * 2).fill(0).map((_, i) => (
                        <div key={i} className="aspect-square bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400">
                            Image {i + 1}
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

function AboutSection({ content }: { content: any }) {
    return (
        <section className="py-16 px-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold">{content.title || 'About Us'}</h2>
                <div className="text-zinc-600 space-y-4 whitespace-pre-wrap">
                    {content.text || content.description || 'Add some information about yourself or your business.'}
                </div>
            </div>
            {(content.profilePhoto || content.profileImage) && (
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <img src={content.profilePhoto || content.profileImage} alt="About Profile" className="w-full h-full object-cover" />
                </div>
            )}
        </section>
    );
}

function ContactSection({ content }: { content: any }) {
    const social = content.social || content.socialLinks || {};
    return (
        <section className="py-16 bg-zinc-50 px-4">
            <div className="max-w-xl mx-auto text-center space-y-8">
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <div className="grid gap-6">
                    {content.email && (
                        <div className="p-4 bg-white rounded-xl shadow-sm border">
                            <p className="text-sm text-zinc-500 mb-1">Email</p>
                            <p className="font-medium">{content.email}</p>
                        </div>
                    )}
                    {content.phone && (
                        <div className="p-4 bg-white rounded-xl shadow-sm border">
                            <p className="text-sm text-zinc-500 mb-1">Phone</p>
                            <p className="font-medium">{content.phone}</p>
                        </div>
                    )}
                </div>
                {Object.keys(social).length > 0 && (
                    <div className="flex justify-center gap-4">
                        {Object.entries(social).map(([key, val]: any) => (
                            val && (
                                <a key={key} href={val} className="capitalize text-zinc-600 hover:text-black transition">
                                    {key}
                                </a>
                            )
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
