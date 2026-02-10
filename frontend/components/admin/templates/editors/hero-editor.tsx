"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HeroSectionEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export function HeroSectionEditor({ content, onChange }: HeroSectionEditorProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="hero-heading">Heading Text</Label>
                <Input
                    id="hero-heading"
                    value={content.heading || ''}
                    onChange={(e) => handleChange('heading', e.target.value)}
                    placeholder="Main heading text"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="hero-subheading">Subheading Text</Label>
                <Input
                    id="hero-subheading"
                    value={content.subheading || ''}
                    onChange={(e) => handleChange('subheading', e.target.value)}
                    placeholder="Subheading text"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="hero-image">Background Image URL</Label>
                <Input
                    id="hero-image"
                    value={content.backgroundImage || ''}
                    onChange={(e) => handleChange('backgroundImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                />
                {content.backgroundImage && (
                    <div className="mt-2 relative aspect-video rounded-md overflow-hidden border">
                        <img
                            src={content.backgroundImage}
                            alt="Hero Background Preview"
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="hero-cta-text">CTA Button Text</Label>
                    <Input
                        id="hero-cta-text"
                        value={content.ctaText || ''}
                        onChange={(e) => handleChange('ctaText', e.target.value)}
                        placeholder="e.g., Learn More"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="hero-cta-link">CTA Button Link</Label>
                    <Input
                        id="hero-cta-link"
                        value={content.ctaLink || ''}
                        onChange={(e) => handleChange('ctaLink', e.target.value)}
                        placeholder="e.g., /about"
                    />
                </div>
            </div>
        </div>
    );
}
