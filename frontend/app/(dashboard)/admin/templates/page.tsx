"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Plus, Edit, Trash } from 'lucide-react';
import Link from 'next/link';

interface Template {
    id: string;
    name: string;
    description?: string;
    thumbnail?: string;
    isPublic: boolean;
}

export default function AdminTemplatesPage() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const res = await api.get('/templates');
            setTemplates(res.data);
        } catch (error) {
            console.error('Failed to fetch templates', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTemplate = async (id: string) => {
        if (!confirm('Are you sure you want to delete this template?')) return;
        try {
            await api.delete(`/templates/${id}`);
            fetchTemplates();
        } catch (error) {
            console.error('Failed to delete template', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Templates</h1>
                <Button asChild>
                    <Link href="/admin/templates/create">
                        <Plus className="mr-2 h-4 w-4" /> Create Template
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <Card key={template.id}>
                        <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                            {/* Placeholder for thumbnail */}
                            {template.thumbnail ? (
                                <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">No Preview</div>
                            )}
                        </div>
                        <CardHeader>
                            <CardTitle>{template.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">{template.description || "No description"}</p>
                            <div className="mt-2 text-xs font-semibold px-2 py-1 bg-gray-100 rounded inline-block">
                                {template.isPublic ? 'Public' : 'Draft'}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/templates/${template.id}/edit`}>
                                    <Edit className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => deleteTemplate(template.id)}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {templates.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No templates found. Create one to get started.
                </div>
            )}
        </div>
    );
}
