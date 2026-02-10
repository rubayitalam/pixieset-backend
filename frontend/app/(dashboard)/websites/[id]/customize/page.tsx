"use client";

import { useEffect, useState, use } from 'react';
import { WebsiteEditor } from '@/components/websites/website-editor';
import api from '@/lib/api';
import Link from 'next/link';

interface Props {
    params: Promise<{ id: string }>;
}

export default function CustomizeWebsitePage({ params }: Props) {
    const { id } = use(params);
    const [website, setWebsite] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWebsite = async () => {
            try {
                const res = await api.get(`/websites/${id}`);
                setWebsite(res.data);
            } catch (err: any) {
                console.error(err);
                setError('Failed to load website');
            } finally {
                setLoading(false);
            }
        };

        fetchWebsite();
    }, [id],);

    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900"></div>
        </div>
    );

    if (error) return (
        <div className="h-screen flex items-center justify-center text-red-500 font-medium font-sans">
            {error}
        </div>
    );

    const initialConfig = website.config || { sections: [] };

    return (
        <div className="h-screen overflow-hidden flex flex-col font-sans">
            {/* Minimal Header */}
            <div className="h-16 border-b px-6 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => window.history.back()} className="text-zinc-500 hover:text-black transition-colors cursor-pointer">
                        <span className="text-sm font-medium">← Back</span>
                    </button>
                    <div className="h-4 w-[1px] bg-zinc-200" />
                    <h1 className="font-semibold text-lg">{website.slug}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href={`/preview/${website.id}`}
                        target="_blank"
                        className="text-sm font-medium px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                        Preview Changes
                    </a>
                    <Link
                        href={`/websites/${id}/settings`}
                        className="text-sm font-medium px-4 py-2 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                        Settings
                    </Link>
                    {website.isPublished && (
                        <a
                            href={`/sites/${website.slug}`}
                            target="_blank"
                            className="text-sm font-medium px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        >
                            View Live Site
                        </a>
                    )}
                </div>
            </div>

            <WebsiteEditor
                websiteId={id}
                initialConfig={initialConfig}
            />
        </div>
    );
}
