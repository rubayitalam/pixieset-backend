"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, GripVertical, User, Mail, Layout, Image as ImageIcon } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ImageUpload } from '@/components/ui/image-upload';

// --- Hero Editor ---
export function HeroEditor({ content, onChange }: { content: any, onChange: (c: any) => void }) {
    const handleChange = (field: string, value: any) => onChange({ ...content, [field]: value });

    const handleUpload = () => {
        // Simulating Cloudinary Upload Widget
        const url = prompt("Upload Image via Cloudinary (simulated):\nEnter image URL:");
        if (url) handleChange('backgroundImage', url);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label className="text-sm font-semibold">Heading</Label>
                <Input
                    value={content.heading || ''}
                    onChange={(e) => handleChange('heading', e.target.value)}
                    placeholder="Welcome to our site"
                />
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-semibold">Subheading</Label>
                <Textarea
                    value={content.subheading || ''}
                    onChange={(e) => handleChange('subheading', e.target.value)}
                    placeholder="Tell your story..."
                />
            </div>
            <div className="space-y-3">
                <Label className="text-sm font-semibold">Hero Background</Label>
                <ImageUpload
                    value={content.backgroundImage}
                    onChange={(url) => handleChange('backgroundImage', url)}
                    onRemove={() => handleChange('backgroundImage', '')}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase text-zinc-500">CTA Button Text</Label>
                    <Input value={content.ctaText || ''} onChange={(e) => handleChange('ctaText', e.target.value)} placeholder="e.g. Learn More" />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase text-zinc-500">CTA Link</Label>
                    <Input value={content.ctaLink || ''} onChange={(e) => handleChange('ctaLink', e.target.value)} placeholder="e.g. /contact" />
                </div>
            </div>
        </div>
    );
}

// --- Gallery Editor ---
export function GalleryEditor({ content, onChange }: { content: any, onChange: (c: any) => void }) {
    const images = content.images || [];

    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        const items = Array.from(images);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        onChange({ ...content, images: items });
    };

    const addImages = () => {
        // Simulating multiple image select
        const urlsString = prompt("Enter image URLs (comma separated):");
        if (urlsString) {
            const newUrls = urlsString.split(',').map(url => ({ url: url.trim(), id: Math.random().toString(36).substr(2, 9) }));
            onChange({ ...content, images: [...images, ...newUrls] });
        }
    };

    const removeImage = (id: string) => {
        const items = images.filter((img: any) => img.id !== id);
        onChange({ ...content, images: items });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Gallery Title</Label>
                <Input value={content.title || ''} onChange={(e) => onChange({ ...content, title: e.target.value })} placeholder="e.g. Portfolio Highlights" />
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold">Images</Label>
                    <Button variant="outline" size="sm" onClick={addImages} className="h-8">
                        <Plus className="h-4 w-4 mr-1" /> Upload Images
                    </Button>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="gallery-images">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-2 gap-3">
                                {images.map((img: any, index: number) => (
                                    <Draggable key={img.id || index} draggableId={img.id || `img-${index}`} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="relative aspect-square bg-zinc-100 border rounded-lg group overflow-hidden cursor-grab active:cursor-grabbing"
                                            >
                                                <img src={img.url} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="absolute top-2 left-2 p-1 bg-white/80 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <GripVertical className="h-3 w-3 text-zinc-600" />
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                {images.length === 0 && (
                                    <div className="col-span-2 py-8 text-center rounded-lg text-zinc-400 text-sm flex flex-col items-center justify-center gap-2">
                                        <p>No images yet.</p>
                                    </div>
                                )}
                                <div className="col-span-2 mt-2">
                                    <Label className="text-xs font-semibold uppercase text-zinc-500 mb-2 block">Upload New Image</Label>
                                    <ImageUpload
                                        onChange={addImages}
                                        onRemove={() => { }}
                                        className="h-24"
                                    />
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}

// --- About Editor ---
export function AboutEditor({ content, onChange }: { content: any, onChange: (c: any) => void }) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label className="text-sm font-semibold">Title</Label>
                <Input value={content.title || ''} onChange={(e) => onChange({ ...content, title: e.target.value })} placeholder="e.g. About Me" />
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-semibold">About Text</Label>
                <Textarea
                    value={content.text || ''}
                    onChange={(e) => onChange({ ...content, text: e.target.value })}
                    className="min-h-[150px] placeholder:text-zinc-400"
                    placeholder="Describe yourself or your studio..."
                />
                <p className="text-[10px] text-zinc-400 italic">Tip: You can use new lines to separate paragraphs.</p>
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-semibold">Profile Photo</Label>
                <ImageUpload
                    value={content.profilePhoto}
                    onChange={(url) => onChange({ ...content, profilePhoto: url })}
                    onRemove={() => onChange({ ...content, profilePhoto: '' })}
                    className="w-40 aspect-square mx-auto rounded-full overflow-hidden"
                />
            </div>
        </div>
    );
}

// --- Contact Editor ---
export function ContactEditor({ content, onChange }: { content: any, onChange: (c: any) => void }) {
    const setSocial = (key: string, val: string) => {
        const social = { ...(content.social || {}) };
        social[key] = val;
        onChange({ ...content, social });
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex items-center gap-2 pb-1 border-b">
                    <Mail className="h-4 w-4 text-zinc-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Contact Information</h3>
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Email Address</Label>
                    <Input value={content.email || ''} onChange={(e) => onChange({ ...content, email: e.target.value })} placeholder="hello@example.com" />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Phone Number</Label>
                    <Input value={content.phone || ''} onChange={(e) => onChange({ ...content, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 pb-1 border-b">
                    <Layout className="h-4 w-4 text-zinc-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Social Media</h3>
                </div>
                <div className="grid gap-3">
                    <div className="space-y-1.5">
                        <Label className="text-[11px] text-zinc-500">Facebook URL</Label>
                        <Input
                            value={content.social?.facebook || ''}
                            onChange={(e) => setSocial('facebook', e.target.value)}
                            className="h-8 text-sm"
                            placeholder="facebook.com/..."
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[11px] text-zinc-500">Instagram URL</Label>
                        <Input
                            value={content.social?.instagram || ''}
                            onChange={(e) => setSocial('instagram', e.target.value)}
                            className="h-8 text-sm"
                            placeholder="instagram.com/..."
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[11px] text-zinc-500">Twitter URL</Label>
                        <Input
                            value={content.social?.twitter || ''}
                            onChange={(e) => setSocial('twitter', e.target.value)}
                            className="h-8 text-sm"
                            placeholder="twitter.com/..."
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[11px] text-zinc-500">LinkedIn URL (Optional)</Label>
                        <Input
                            value={content.social?.linkedin || ''}
                            onChange={(e) => setSocial('linkedin', e.target.value)}
                            className="h-8 text-sm"
                            placeholder="linkedin.com/..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
