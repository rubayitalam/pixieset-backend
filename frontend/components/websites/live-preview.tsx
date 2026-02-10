"use client";

import React from 'react';
import { SectionRenderer } from './section-renderer';
import { Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LivePreviewProps {
    config: any;
    viewMode: 'desktop' | 'mobile';
    onViewModeChange: (mode: 'desktop' | 'mobile') => void;
}

export function LivePreview({ config, viewMode, onViewModeChange }: LivePreviewProps) {
    const sections = config?.sections || [];

    return (
        <div className="flex flex-col h-full bg-zinc-100 border-x">
            {/* Toolbar */}
            <div className="h-14 border-b bg-white flex items-center justify-between px-4 shrink-0">
                <span className="text-sm font-medium text-zinc-500">Live Preview</span>
                <div className="flex bg-zinc-100 p-1 rounded-lg">
                    <Button
                        variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
                        size="icon"
                        className={cn("h-8 w-10", viewMode === 'desktop' && "shadow-sm")}
                        onClick={() => onViewModeChange('desktop')}
                    >
                        <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
                        size="icon"
                        className={cn("h-8 w-10", viewMode === 'mobile' && "shadow-sm")}
                        onClick={() => onViewModeChange('mobile')}
                    >
                        <Smartphone className="h-4 w-4" />
                    </Button>
                </div>
                <div className="w-20" /> {/* Spacer */}
            </div>

            {/* Preview Container */}
            <div className="flex-grow overflow-auto p-4 flex justify-center items-start">
                <div
                    className={cn(
                        "bg-white shadow-2xl transition-all duration-300 origin-top overflow-hidden",
                        viewMode === 'desktop' ? "w-full min-h-full" : "w-[375px] min-h-[667px] border-[12px] border-zinc-900 rounded-[3rem]"
                    )}
                >
                    <div className={cn("bg-white h-full", viewMode === 'mobile' && "overflow-y-auto no-scrollbar")}>
                        {sections.length > 0 ? (
                            sections.map((section: any) => (
                                <SectionRenderer
                                    key={section.id}
                                    type={section.type}
                                    content={section.content || section.defaultContent}
                                />
                            ))
                        ) : (
                            <div className="p-12 text-center text-zinc-400">
                                <p>No sections to display.</p>
                                <p className="text-sm">Add sections to start building your site.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
