"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Section } from './section-builder';
import { HeroSectionEditor } from '@/components/admin/templates/editors/hero-editor';
import { GallerySectionEditor } from '@/components/admin/templates/editors/gallery-editor';
import { AboutSectionEditor } from '@/components/admin/templates/editors/about-editor';
import { ContactSectionEditor } from '@/components/admin/templates/editors/contact-editor';
import { ServicesSectionEditor } from '@/components/admin/templates/editors/services-editor';

interface SectionEditorProps {
    section: Section;
    onClose: () => void;
    onSave: (content: any) => void;
}

export function SectionEditor({ section, onClose, onSave }: SectionEditorProps) {
    const [content, setContent] = React.useState(section.content);

    const renderEditor = () => {
        switch (section.type) {
            case 'Hero':
                return <HeroSectionEditor content={content} onChange={setContent} />;
            case 'Gallery':
                return <GallerySectionEditor content={content} onChange={setContent} />;
            case 'About':
                return <AboutSectionEditor content={content} onChange={setContent} />;
            case 'Contact':
                return <ContactSectionEditor content={content} onChange={setContent} />;
            case 'Services':
                return <ServicesSectionEditor content={content} onChange={setContent} />;
            default:
                return <div>No editor found for this section type.</div>;
        }
    };

    return (
        <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit {section.type} Section</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    {renderEditor()}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={() => onSave(content)}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
