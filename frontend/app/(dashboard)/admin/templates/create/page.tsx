"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { SectionBuilder, Section } from '@/components/admin/templates/section-builder';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CreateTemplatePage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [sections, setSections] = useState<Section[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
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
            await api.post('/templates', {
                name,
                description,
                thumbnail,
                structure,
                isPublic: false
            });
            router.push('/admin/templates');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to create template');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-5xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Create New Template</h1>
                <p className="text-muted-foreground">Design your template structure and default content.</p>
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
                                    placeholder="e.g., Modern Wedding"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Brief description of the template"
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                                <Input
                                    id="thumbnail"
                                    value={thumbnail}
                                    onChange={(e) => setThumbnail(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6 mt-6">
                            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Template'}
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

