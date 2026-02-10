"use client";

import { useState, useEffect, use } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUpload } from '@/components/ui/image-upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Share2, BarChart3, Code2, Mail, Globe, Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
    params: Promise<{ id: string }>;
}

export default function WebsiteSettingsPage({ params }: Props) {
    const { id } = use(params);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [website, setWebsite] = useState<any>(null);
    const [settings, setSettings] = useState<any>({
        seo: {
            title: '',
            description: '',
            keywords: '',
            ogImage: ''
        },
        integrations: {
            googleAnalyticsId: ''
        },
        advanced: {
            customCss: ''
        },
        notifications: {
            contactEmail: ''
        },
        localization: {
            language: 'en'
        }
    });

    useEffect(() => {
        const fetchWebsite = async () => {
            try {
                const res = await api.get(`/websites/${id}`);
                setWebsite(res.data);
                const config = res.data.config || {};
                setSettings({
                    seo: config.seo || { title: '', description: '', keywords: '', ogImage: '' },
                    integrations: config.integrations || { googleAnalyticsId: '' },
                    advanced: config.advanced || { customCss: '' },
                    notifications: config.notifications || { contactEmail: '' },
                    localization: config.localization || { language: 'en' }
                });
            } catch (error) {
                console.error('Failed to fetch website settings', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWebsite();
    }, [id]);

    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            const updatedConfig = {
                ...(website.config || {}),
                ...settings
            };
            await api.patch(`/websites/${id}`, { config: updatedConfig });
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Failed to save settings', error);
            alert('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 max-w-4xl font-sans">
            <div className="flex justify-between items-center mb-10 pb-6 border-b">
                <div className="flex items-center gap-4">
                    <Link href={`/websites/${id}/customize`} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Website Settings</h1>
                        <p className="text-muted-foreground mt-1 text-lg">Configure SEO, analytics, and advanced options for <span className="text-foreground font-semibold">/{website.slug}</span></p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" asChild className="rounded-full px-6">
                        <Link href={`/preview/${id}`} target="_blank">Preview Site</Link>
                    </Button>
                    <Button onClick={handleSave} disabled={saving} className="rounded-full px-8 shadow-lg shadow-black/10">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Save All Settings
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="seo" className="space-y-8">
                <TabsList className="bg-zinc-100 p-1 rounded-xl h-auto flex flex-wrap lg:flex-nowrap">
                    <TabsTrigger value="seo" className="rounded-lg px-6 py-2.5 flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Search className="w-4 h-4 mr-2" /> SEO
                    </TabsTrigger>
                    <TabsTrigger value="integrations" className="rounded-lg px-6 py-2.5 flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <BarChart3 className="w-4 h-4 mr-2" /> Integrations
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-lg px-6 py-2.5 flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Mail className="w-4 h-4 mr-2" /> Notifications
                    </TabsTrigger>
                    <TabsTrigger value="localization" className="rounded-lg px-6 py-2.5 flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Globe className="w-4 h-4 mr-2" /> Localization
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="rounded-lg px-6 py-2.5 flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Code2 className="w-4 h-4 mr-2" /> Advanced
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="seo">
                    <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                        <CardHeader className="bg-zinc-50/50">
                            <CardTitle className="flex items-center gap-2"><Share2 className="w-5 h-5 text-primary" /> Search Engine Optimization</CardTitle>
                            <CardDescription>Control how your website appears in search results and social shares.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="seoTitle">Page Title</Label>
                                        <Input
                                            id="seoTitle"
                                            value={settings.seo.title}
                                            onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, title: e.target.value } })}
                                            className="rounded-xl h-11"
                                            placeholder="e.g. Luna Photography | Professional Wedding Photographer"
                                        />
                                        <p className="text-[11px] text-muted-foreground">Optimal length: 50-60 characters.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="seoDesc">Meta Description</Label>
                                        <Textarea
                                            id="seoDesc"
                                            value={settings.seo.description}
                                            onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, description: e.target.value } })}
                                            className="rounded-xl min-h-[100px]"
                                            placeholder="Provide a brief summary of your website for search engines..."
                                        />
                                        <p className="text-[11px] text-muted-foreground">Optimal length: 150-160 characters.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="seoKeywords">Keywords</Label>
                                        <Input
                                            id="seoKeywords"
                                            value={settings.seo.keywords}
                                            onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, keywords: e.target.value } })}
                                            className="rounded-xl h-11"
                                            placeholder="photography, wedding, portfolio, etc. (comma separated)"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Label>Social Sharing Image (OG Image)</Label>
                                    <CardDescription className="mb-4">This image is displayed when your link is shared on social media.</CardDescription>
                                    <ImageUpload
                                        value={settings.seo.ogImage}
                                        onChange={(url) => setSettings({ ...settings, seo: { ...settings.seo, ogImage: url } })}
                                        onRemove={() => setSettings({ ...settings, seo: { ...settings.seo, ogImage: '' } })}
                                        className="aspect-[1.91/1]"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="integrations">
                    <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                        <CardHeader className="bg-zinc-50/50">
                            <CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> Third-Party Integrations</CardTitle>
                            <CardDescription>Track your website performance and connect external tools.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-4 max-w-md">
                                <div className="space-y-2">
                                    <Label htmlFor="gaId">Google Analytics Measurement ID</Label>
                                    <Input
                                        id="gaId"
                                        value={settings.integrations.googleAnalyticsId}
                                        onChange={(e) => setSettings({ ...settings, integrations: { ...settings.integrations, googleAnalyticsId: e.target.value } })}
                                        className="rounded-xl h-11"
                                        placeholder="e.g. G-XXXXXXXXXX"
                                    />
                                    <p className="text-xs text-muted-foreground">Paste your GA4 Measurement ID here to track visits.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                        <CardHeader className="bg-zinc-50/50">
                            <CardTitle className="flex items-center gap-2"><Mail className="w-5 h-5 text-primary" /> Form Notifications</CardTitle>
                            <CardDescription>Configure where you receive contact form submissions.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-4 max-w-md">
                                <div className="space-y-2">
                                    <Label htmlFor="contactEmail">Recipient Email Address</Label>
                                    <Input
                                        id="contactEmail"
                                        type="email"
                                        value={settings.notifications.contactEmail}
                                        onChange={(e) => setSettings({ ...settings, notifications: { ...settings.notifications, contactEmail: e.target.value } })}
                                        className="rounded-xl h-11"
                                        placeholder="your-email@example.com"
                                    />
                                    <p className="text-xs text-muted-foreground">All contact form inquiries from your website will be sent to this email.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="localization">
                    <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                        <CardHeader className="bg-zinc-50/50">
                            <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> Language & Regional</CardTitle>
                            <CardDescription>Adjust your website language and display settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-4 max-w-sm">
                                <div className="space-y-2">
                                    <Label htmlFor="language">Website Language</Label>
                                    <Select
                                        value={settings.localization.language}
                                        onValueChange={(val) => setSettings({ ...settings, localization: { ...settings.localization, language: val } })}
                                    >
                                        <SelectTrigger className="rounded-xl h-11">
                                            <SelectValue placeholder="Select Language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Español</SelectItem>
                                            <SelectItem value="fr">Français</SelectItem>
                                            <SelectItem value="de">Deutsch</SelectItem>
                                            <SelectItem value="it">Italiano</SelectItem>
                                            <SelectItem value="pt">Português</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">This sets the primary language for your website visitors.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="advanced">
                    <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                        <CardHeader className="bg-zinc-50/50">
                            <CardTitle className="flex items-center gap-2"><Code2 className="w-5 h-5 text-primary" /> Advanced Options</CardTitle>
                            <CardDescription>Customization options for advanced users.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="customCss">Custom Global CSS</Label>
                                <Textarea
                                    id="customCss"
                                    value={settings.advanced.customCss}
                                    onChange={(e) => setSettings({ ...settings, advanced: { ...settings.advanced, customCss: e.target.value } })}
                                    className="rounded-xl min-h-[300px] font-mono text-xs p-4 bg-zinc-950 text-emerald-400"
                                    placeholder="/* Add your custom CSS here */"
                                />
                                <p className="text-xs text-muted-foreground">Danger zone: Custom CSS can break your layout. Use with caution.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
