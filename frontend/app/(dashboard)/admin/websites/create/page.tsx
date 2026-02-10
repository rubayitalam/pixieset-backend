"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle2, Globe, ExternalLink } from 'lucide-react';

interface User {
    id: string;
    email: string;
    name?: string;
}

interface Template {
    id: string;
    name: string;
    thumbnail?: string;
}

export default function CreateWebsitePage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, templatesRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/templates')
                ]);
                setUsers(usersRes.data);
                setTemplates(templatesRes.data);
            } catch (err: any) {
                console.error('Failed to fetch data', err);
                setError('Failed to load users or templates');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess(false);

        try {
            await api.post('/websites', {
                userId: selectedUser,
                templateId: selectedTemplate,
                slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
            });
            setSuccess(true);
            setTimeout(() => router.push('/admin/websites'), 2000);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to create website');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading options...</div>;

    const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

    return (
        <div className="container mx-auto p-8 max-w-2xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Assign Website to Client</h1>
                <p className="text-muted-foreground">Create a new website instance for a client based on a template.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Website Details</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        {error && (
                            <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center gap-2 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-500/10 text-green-500 p-3 rounded-md flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4" />
                                Website created successfully! Redirecting...
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="user">Select Client</Label>
                            <Select value={selectedUser} onValueChange={setSelectedUser} required>
                                <SelectTrigger id="user">
                                    <SelectValue placeholder="Select a user" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map(user => (
                                        <SelectItem key={user.id} value={user.id}>
                                            {user.name || user.email} ({user.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="template">Select Template</Label>
                            <Select value={selectedTemplate} onValueChange={setSelectedTemplate} required>
                                <SelectTrigger id="template">
                                    <SelectValue placeholder="Select a template" />
                                </SelectTrigger>
                                <SelectContent>
                                    {templates.map(template => (
                                        <SelectItem key={template.id} value={template.id}>
                                            {template.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {selectedTemplateData?.thumbnail && (
                                <div className="mt-2 aspect-video rounded-md overflow-hidden border">
                                    <img
                                        src={selectedTemplateData.thumbnail}
                                        alt="Preview"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Website Slug (URL)</Label>
                            <div className="flex items-center gap-2">
                                <div className="bg-muted px-3 py-2 rounded-md text-sm text-muted-foreground flex items-center gap-1">
                                    <Globe className="h-4 w-4" />
                                    platform.com/
                                </div>
                                <Input
                                    id="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                    placeholder="client-portfolio"
                                    required
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                This will be the live URL of the client's website.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                        <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={submitting || !selectedUser || !selectedTemplate || !slug}>
                            {submitting ? 'Creating...' : 'Assign Website'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
