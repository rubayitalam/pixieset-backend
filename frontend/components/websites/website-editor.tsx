"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LivePreview } from './live-preview';
import { HeroEditor, GalleryEditor, AboutEditor, ContactEditor } from './editors';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Save, Check, ChevronRight, Layout, Image as ImageIcon, User, Mail, Loader2 } from 'lucide-react';
import api from '@/lib/api';

interface Section {
    id: string;
    type: string;
    content: any;
}

interface WebsiteConfig {
    sections: Section[];
    theme?: any;
}

interface WebsiteEditorProps {
    websiteId: string;
    initialConfig: WebsiteConfig;
}

export function WebsiteEditor({ websiteId, initialConfig }: WebsiteEditorProps) {
    const [config, setConfig] = useState<WebsiteConfig>(initialConfig);
    const [activeSectionId, setActiveSectionId] = useState<string>(initialConfig.sections?.[0]?.id || '');
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const configRef = useRef(config);
    configRef.current = config;

    // Unsaved changes warning
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasChanges]);

    const saveConfig = useCallback(async () => {
        if (!hasChanges && lastSaved) return;

        setIsSaving(true);
        try {
            await api.patch(`/websites/${websiteId}`, { config: configRef.current });
            setLastSaved(new Date());
            setHasChanges(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Failed to save website config', error);
        } finally {
            setIsSaving(false);
        }
    }, [websiteId, hasChanges, lastSaved]);

    // Auto-save every 30 seconds if there are changes
    useEffect(() => {
        const interval = setInterval(() => {
            if (hasChanges) {
                saveConfig();
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [hasChanges, saveConfig]);

    const updateSectionContent = (sectionId: string, newContent: any) => {
        const newSections = config.sections.map(s =>
            s.id === sectionId ? { ...s, content: newContent } : s
        );
        setConfig({ ...config, sections: newSections });
        setHasChanges(true);
    };

    const activeSection = config.sections.find(s => s.id === activeSectionId);

    const renderEditor = () => {
        if (!activeSection) return <div className="p-8 text-center text-zinc-500">Select a section to edit</div>;

        const props = {
            content: activeSection.content || {},
            onChange: (content: any) => updateSectionContent(activeSection.id, content)
        };

        switch (activeSection.type.toLowerCase()) {
            case 'hero': return <HeroEditor {...props} />;
            case 'gallery': return <GalleryEditor {...props} />;
            case 'about': return <AboutEditor {...props} />;
            case 'contact': return <ContactEditor {...props} />;
            default: return <div className="p-8 border rounded-md">No editor for {activeSection.type}</div>;
        }
    };

    const getSectionIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'hero': return <Layout className="h-4 w-4" />;
            case 'gallery': return <ImageIcon className="h-4 w-4" />;
            case 'about': return <User className="h-4 w-4" />;
            case 'contact': return <Mail className="h-4 w-4" />;
            default: return <ChevronRight className="h-4 w-4" />;
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white relative">
            {/* Success Toast */}
            {showSuccess && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
                    <Check className="h-4 w-4" />
                    <span className="font-semibold text-sm">Saved Successfully</span>
                </div>
            )}

            {/* Left Sidebar: Section List */}
            <div className={cn(
                "border-r flex flex-col shrink-0 bg-zinc-50/50 transition-all duration-300",
                sidebarOpen ? "w-64" : "w-0 overflow-hidden"
            )}>
                <div className="p-4 border-b bg-white flex items-center justify-between">
                    <h2 className="font-semibold text-zinc-900">Sections</h2>
                    <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" onClick={() => setSidebarOpen(false)}>
                        <ChevronRight className="rotate-180 h-4 w-4" />
                    </Button>
                </div>
                <div className="flex-grow overflow-y-auto p-2 space-y-1">
                    {config.sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSectionId(section.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors border",
                                activeSectionId === section.id
                                    ? "bg-black text-white shadow-sm"
                                    : "text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900"
                            )}
                        >
                            {getSectionIcon(section.type)}
                            <span className="capitalize">{section.type}</span>
                        </button>
                    ))}
                </div>
                {/* Status Bar */}
                <div className="p-4 border-t bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                        {isSaving ? (
                            <>
                                <Loader2 className="h-3 w-3 animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : lastSaved ? (
                            <>
                                <Check className="h-3 w-3 text-green-500" />
                                <span>Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </>
                        ) : (
                            <span>Not saved yet</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Center: Preview */}
            <div className="flex-grow relative overflow-hidden flex flex-col">
                {!sidebarOpen && (
                    <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-4 top-4 z-40 h-10 w-10 shadow-lg rounded-full"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                )}
                <LivePreview
                    config={config}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />
            </div>

            {/* Right: Content Editor */}
            <div className="w-80 border-l flex flex-col shrink-0">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="font-semibold border">Content Editor</h2>
                    <Button
                        size="sm"
                        className="h-8 gap-2"
                        disabled={!hasChanges || isSaving}
                        onClick={saveConfig}
                    >
                        <Save className="h-3.5 w-3.5" />
                        Save
                    </Button>
                </div>
                <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
                    {activeSection ? (
                        <div className="space-y-6">
                            <div className="pb-4 border-b">
                                <h3 className="text-lg font-bold capitalize">{activeSection.type} Section</h3>
                                <p className="text-xs text-zinc-500">Customize the content and layout</p>
                            </div>
                            {renderEditor()}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                            <div className="p-4 bg-zinc-100 rounded-full">
                                <Layout className="h-8 w-8 text-zinc-400" />
                            </div>
                            <div>
                                <h3 className="font-medium text-zinc-900">No Section Selected</h3>
                                <p className="text-sm text-zinc-500">Choose a section from the left sidebar to start editing its content.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
