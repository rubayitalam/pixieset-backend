"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface ServicesSectionEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export function ServicesSectionEditor({ content, onChange }: ServicesSectionEditorProps) {
    const handleChange = (field: string, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const handleItemChange = (index: number, field: string, value: string) => {
        const items = [...(content.items || [])];
        items[index] = { ...items[index], [field]: value };
        handleChange('items', items);
    };

    const addItem = () => {
        const items = [...(content.items || [])];
        items.push({ title: 'New Service', description: 'Service description...' });
        handleChange('items', items);
    };

    const removeItem = (index: number) => {
        const items = [...(content.items || [])];
        items.splice(index, 1);
        handleChange('items', items);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="services-title">Section Title</Label>
                <Input
                    id="services-title"
                    value={content.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Our Services"
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label>Service Items</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addItem}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Service
                    </Button>
                </div>

                <div className="space-y-4">
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg relative space-y-3">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 text-destructive hover:text-destructive"
                                onClick={() => removeItem(index)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>

                            <div className="space-y-2 pr-8">
                                <Label className="text-xs">Service Title</Label>
                                <Input
                                    value={item.title || ''}
                                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                                    placeholder="Service name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs">Description</Label>
                                <Textarea
                                    value={item.description || ''}
                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                    placeholder="Description of the service"
                                    rows={2}
                                />
                            </div>
                        </div>
                    ))}
                    {(content.items || []).length === 0 && (
                        <div className="text-center py-4 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                            No services added. Click "Add Service" to begin.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
