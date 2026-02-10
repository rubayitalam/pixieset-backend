"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GallerySectionEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export function GallerySectionEditor({ content, onChange }: GallerySectionEditorProps) {
    const handleChange = (field: string, value: any) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="gallery-title">Gallery Title</Label>
                <Input
                    id="gallery-title"
                    value={content.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Gallery title"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="gallery-columns">Number of Columns</Label>
                    <Select
                        value={content.columns?.toString() || "3"}
                        onValueChange={(value) => handleChange('columns', parseInt(value))}
                    >
                        <SelectTrigger id="gallery-columns">
                            <SelectValue placeholder="Select columns" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">2 Columns</SelectItem>
                            <SelectItem value="3">3 Columns</SelectItem>
                            <SelectItem value="4">4 Columns</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="gallery-aspect">Aspect Ratio</Label>
                    <Select
                        value={content.aspectRatio || "square"}
                        onValueChange={(value) => handleChange('aspectRatio', value)}
                    >
                        <SelectTrigger id="gallery-aspect">
                            <SelectValue placeholder="Select ratio" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="square">Square (1:1)</SelectItem>
                            <SelectItem value="portrait">Portrait (3:4)</SelectItem>
                            <SelectItem value="landscape">Landscape (4:3)</SelectItem>
                            <SelectItem value="wide">Wide (16:9)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
