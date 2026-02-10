"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { SectionBuilder, Section } from '@/components/admin/templates/section-builder';

interface Props {
    params: Promise<{ id: string }>;
}

export default function EditTemplatePage({ params }: Props) {
    const { id } = use(params);
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [sections, setSections] = useState<Section[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const res = await api.get(`/templates/${id}`);
                const template = res.data;
                setName(template.name);
                setDescription(template.description || '');
                setThumbnail(template.thumbnail || '');

                // Map internal structure to Section component format
                if (template.structure?.sections) {
                    const mappedSections = template.structure.sections.map((s: any) => ({
                        id: s.id || Math.random().toString(36).substr(2, 9),
                        type: s.type.charAt(0).toUpperCase() + s.type.slice(1), // Title case for builder
                        content: s.defaultContent || s.content || {} // Support both field names for compatibility
                    }));
                    setSections(mappedSections);
                }
            } catch (err: any) {
                console.error(err);
                setError('Failed to load template data');
            } finally {
                setLoading(false);
            }
        };

        fetchTemplate();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        const structure = {
            sections: sections.map((s, index) => ({
                id: s.id,
                type: s.type.toLowerCase(),
                defaultContent: s.content,
                order: index + 1
            })),
            theme: { primaryColor: '#000000', fontFamily: 'Inter' }
        };

        try {
            await api.patch(`/templates/${id}`, {
                name,
                description,
                thumbnail,
                structure
            });
            router.push('/admin/templates');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to update template');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading template...</div>;

    return (
        <div className="container mx-auto p-8 max-w-5xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Edit Template</h1>
                <p className="text-muted-foreground">Modify your template structure and content.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Template Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                            <div className="space-y-2">
                                <Label htmlFor="name">Template Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                                <Input
                                    id="thumbnail"
                                    value={thumbnail}
                                    onChange={(e) => setThumbnail(e.target.value)}
                                />
                                {thumbnail && (
                                    <div className="mt-2 aspect-video rounded-md overflow-hidden border">
                                        <img src={thumbnail} alt="Thumbnail preview" className="object-cover w-full h-full" />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6 mt-6">
                            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" disabled={saving}>
                                {saving ? 'Saving...' : 'Update Template'}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>Page Structure</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <SectionBuilder
                                sections={sections}
                                onChange={setSections}
                            />
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}
