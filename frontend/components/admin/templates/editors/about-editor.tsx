"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AboutSectionEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export function AboutSectionEditor({ content, onChange }: AboutSectionEditorProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="about-title">Title</Label>
                <Input
                    id="about-title"
                    value={content.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="About Us"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="about-description">Description</Label>
                <Textarea
                    id="about-description"
                    value={content.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Tell your story here..."
                    rows={5}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="about-image">Profile Image URL</Label>
                <Input
                    id="about-image"
                    value={content.profileImage || ''}
                    onChange={(e) => handleChange('profileImage', e.target.value)}
                    placeholder="https://example.com/profile.jpg"
                />
                {content.profileImage && (
                    <div className="mt-2 relative aspect-square w-32 rounded-full overflow-hidden border mx-auto">
                        <img
                            src={content.profileImage}
                            alt="Profile Preview"
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
