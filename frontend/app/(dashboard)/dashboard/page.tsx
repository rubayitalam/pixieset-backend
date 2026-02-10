"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Palette, Globe, Layout, AreaChart, Eye, Settings } from 'lucide-react';
import Link from 'next/link';
import { PublishDialog } from '@/components/publish-dialog';

interface Website {
    id: string;
    slug: string;
    template: {
        name: string;
        thumbnail?: string;
    };
    isPublished: boolean;
}

export default function UserDashboard() {
    const router = useRouter();
    const { user, loading, logout } = useAuth();
    const [websites, setWebsites] = useState<Website[]>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        if (loading || !user) return;

        // Redirection for Admins who accidentally land here
        if (user.role === 'ADMIN') {
            router.push('/admin/dashboard');
            return;
        }

        const fetchWebsites = async () => {
            try {
                const res = await api.get('/websites');
                setWebsites(res.data);
            } catch (error) {
                console.error('Failed to fetch websites', error);
            } finally {
                setDataLoading(false);
            }
        };
        fetchWebsites();
    }, [refreshKey, user, loading, router]);

    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <div className="flex justify-between items-center mb-10 border-b pb-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Client Dashboard</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Manage your digital presence and portfolio.</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                        <p className="font-semibold text-foreground">{user?.name || user?.email}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">{user?.role}</p>
                    </div>
                    <Button variant="outline" asChild className="rounded-full px-6">
                        <Link href="/profile">Profile</Link>
                    </Button>
                    <Button variant="ghost" onClick={logout} className="rounded-full px-6">Logout</Button>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Layout className="h-6 w-6 text-primary" />
                My Portfolio Websites
            </h2>

            {dataLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-[350px] bg-muted animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {websites.map((website) => (
                        <Card key={website.id} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 group rounded-2xl bg-card/50 backdrop-blur-sm">
                            <div className="h-56 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 relative overflow-hidden">
                                {website.template?.thumbnail ? (
                                    <img
                                        src={website.template.thumbnail}
                                        alt={website.template.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        <Globe className="h-12 w-12 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 animate-in fade-in zoom-in duration-300">
                                    <Badge variant={website.isPublished ? "default" : "secondary"} className="shadow-lg backdrop-blur-md px-3 py-1 bg-background/80 text-foreground border-none">
                                        {website.isPublished ? (
                                            <span className="flex items-center gap-1.5 ring-offset-background">
                                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                                Live
                                            </span>
                                        ) : 'Draft'}
                                    </Badge>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{website.slug}</CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">Template: <span className="text-foreground font-medium">{website.template.name}</span></p>
                                    </div>
                                    <div className="bg-primary/10 p-2 rounded-xl group-hover:rotate-12 transition-transform">
                                        <Layout className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-primary font-medium hover:underline cursor-pointer transition-all">
                                    <Globe className="h-4 w-4" />
                                    <span>platform.com/{website.slug}</span>
                                    <ExternalLink className="h-3 w-3" />
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 pt-0 flex gap-2 flex-wrap">
                                <Button className="flex-1 rounded-xl h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all bg-primary hover:bg-primary/90 min-w-[130px]" asChild>
                                    <Link href={`/websites/${website.id}/customize`}>
                                        <Palette className="mr-2 h-4 w-4" /> Customize
                                    </Link>
                                </Button>
                                <Button variant="outline" className="rounded-xl h-12 px-4" size="sm" asChild>
                                    <Link href={`/preview/${website.id}`} target="_blank">
                                        <Eye className="h-4 w-4 mr-2" /> Preview
                                    </Link>
                                </Button>
                                <Button variant="outline" className="rounded-xl h-12 px-4" size="sm" asChild>
                                    <Link href={`/websites/${website.id}/settings`}>
                                        <Settings className="h-4 w-4 mr-2" /> Settings
                                    </Link>
                                </Button>
                                <PublishDialog
                                    websiteId={website.id}
                                    isPublished={website.isPublished}
                                    slug={website.slug}
                                    onPublishChange={() => setRefreshKey(prev => prev + 1)}
                                />
                            </CardFooter>
                        </Card>
                    ))}
                    {websites.length === 0 && (
                        <Card className="col-span-full border-dashed border-2 bg-transparent p-12 flex flex-col items-center justify-center text-center opacity-70">
                            <div className="bg-muted p-6 rounded-full mb-6">
                                <Layout className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <CardTitle className="mb-2">No Websites Assigned Yet</CardTitle>
                            <p className="text-muted-foreground max-w-sm">
                                Your assigned portfolio websites will appear here. Contact your administrator if you believe this is an error.
                            </p>
                        </Card>
                    )}
                </div>
            )}

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-none shadow-xl shadow-indigo-200">
                    <h3 className="font-bold flex items-center gap-2 mb-2">
                        <AreaChart className="h-5 w-5" />
                        Total Visits
                    </h3>
                    <p className="text-3xl font-black">2,482</p>
                    <p className="text-xs text-indigo-200 mt-2">+12% from last week</p>
                </Card>
                <Card className="p-6 bg-white border-none shadow-xl backdrop-blur-md">
                    <h3 className="font-bold text-muted-foreground flex items-center gap-2 mb-2">
                        <Palette className="h-5 w-5 text-primary" />
                        Storage Used
                    </h3>
                    <p className="text-3xl font-black text-foreground">84%</p>
                    <div className="w-full bg-muted h-2 rounded-full mt-3 overflow-hidden">
                        <div className="bg-primary h-full w-[84%]" />
                    </div>
                </Card>
                <Card className="p-6 bg-white border-none shadow-xl">
                    <h3 className="font-bold text-muted-foreground flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        Security Status
                    </h3>
                    <p className="text-xl font-bold text-foreground">All Systems GO</p>
                    <p className="text-xs text-muted-foreground mt-2">Protected by Pixlo Guard</p>
                </Card>
            </div>
        </div>
    );
}

// Helper icons
function CheckCircle2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}

