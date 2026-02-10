"use client";

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, GripVertical, Trash2, Edit2 } from 'lucide-react';
import { SectionEditor } from '@/components/admin/templates/section-editor';

export interface Section {
    id: string;
    type: 'Hero' | 'Gallery' | 'About' | 'Contact' | 'Services';
    content: any;
}

interface SectionBuilderProps {
    sections: Section[];
    onChange: (sections: Section[]) => void;
}

const SECTION_TYPES = ['Hero', 'Gallery', 'About', 'Contact', 'Services'] as const;

export function SectionBuilder({ sections, onChange }: SectionBuilderProps) {
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(sections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        onChange(items);
    };

    const addSection = (type: Section['type']) => {
        const newSection: Section = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            content: getDefaultContent(type),
        };
        onChange([...sections, newSection]);
        setEditingSectionId(newSection.id);
    };

    const removeSection = (id: string) => {
        onChange(sections.filter((s) => s.id !== id));
    };

    const updateSectionContent = (id: string, content: any) => {
        onChange(
            sections.map((s) => (s.id === id ? { ...s, content } : s))
        );
    };

    const getDefaultContent = (type: Section['type']) => {
        switch (type) {
            case 'Hero':
                return { heading: 'Welcome to our site', subheading: 'We do amazing things', backgroundImage: '', ctaText: 'Get Started', ctaLink: '#' };
            case 'About':
                return { title: 'About Us', description: 'Tell your story here...', profileImage: '' };
            case 'Gallery':
                return { title: 'Our Work', columns: 3, aspectRatio: 'square' };
            case 'Contact':
                return { showForm: true, showEmail: true, showPhone: true, email: '', phone: '', socialLinks: { facebook: '', instagram: '', twitter: '' } };
            case 'Services':
                return { title: 'Our Services', items: [{ title: 'Service 1', description: 'Description 1' }] };
            default:
                return {};
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Sections</h2>
                <div className="flex gap-2">
                    {SECTION_TYPES.map((type) => (
                        <Button
                            key={type}
                            variant="outline"
                            size="sm"
                            onClick={() => addSection(type)}
                            className="flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            {type}
                        </Button>
                    ))}
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="sections">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                            {sections.map((section, index) => (
                                <Draggable key={section.id} draggableId={section.id} index={index}>
                                    {(provided) => (
                                        <Card
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="group relative"
                                        >
                                            <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
                                                <div className="flex items-center gap-4">
                                                    <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing text-muted-foreground">
                                                        <GripVertical className="w-5 h-5" />
                                                    </div>
                                                    <CardTitle className="text-base font-medium">
                                                        {section.type} Section
                                                    </CardTitle>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setEditingSectionId(section.id)}
                                                    >
                                                        <Edit2 className="w-4 h-4 mr-2" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() => removeSection(section.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            {sections.length === 0 && (
                                <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
                                    No sections added yet. Click a button above to add a section.
                                </div>
                            )}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {editingSectionId && (
                <SectionEditor
                    section={sections.find((s) => s.id === editingSectionId)!}
                    onClose={() => setEditingSectionId(null)}
                    onSave={(content: any) => {
                        updateSectionContent(editingSectionId, content);
                        setEditingSectionId(null);
                    }}
                />
            )}
        </div>
    );
}
