"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout, Users, Globe, Plus, LogOut, ChevronRight, Loader2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const { user, logout, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({
        usersCount: 0,
        templatesCount: 0,
        websitesCount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== 'ADMIN') {
                router.push('/dashboard');
            }
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch stats from real endpoints
                const [usersRes, templatesRes, websitesRes] = await Promise.all([
                    api.get('/users').catch(() => ({ data: [] })),
                    api.get('/templates').catch(() => ({ data: [] })),
                    api.get('/websites').catch(() => ({ data: [] }))
                ]);

                setStats({
                    usersCount: usersRes.data.length || 0,
                    templatesCount: templatesRes.data.length || 0,
                    websitesCount: websitesRes.data.length || 0
                });
            } catch (error) {
                console.error('Failed to fetch admin stats', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.role === 'ADMIN') {
            fetchStats();
        }
    }, [user]);

    if (authLoading || (user && user.role !== 'ADMIN')) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50/50">
            {/* Top Navigation */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary text-white p-2 rounded-xl">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-black tracking-tighter">PIXLO <span className="text-primary">ADMIN</span></span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="font-bold text-sm">{user?.name || user?.email}</p>
                            <Badge className="bg-primary/10 text-primary border-none text-[10px] h-5">SYSTEM ADMINISTRATOR</Badge>
                        </div>
                        <Button variant="ghost" size="icon" onClick={logout} className="rounded-full text-zinc-500 hover:text-red-600 hover:bg-red-50">
                            <LogOut className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-8 max-w-7xl">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight">Control Center</h1>
                    <p className="text-muted-foreground mt-1 text-lg">System-wide overview and management.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <Card className="border-none shadow-xl shadow-zinc-200/50 rounded-2xl p-6 bg-white flex items-center gap-6">
                        <div className="bg-blue-50 p-4 rounded-2xl">
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-zinc-500 font-medium text-sm">Total Users</p>
                            <p className="text-3xl font-black">{loading ? '...' : stats.usersCount}</p>
                        </div>
                    </Card>
                    <Card className="border-none shadow-xl shadow-zinc-200/50 rounded-2xl p-6 bg-white flex items-center gap-6">
                        <div className="bg-indigo-50 p-4 rounded-2xl">
                            <Layout className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-zinc-500 font-medium text-sm">Templates</p>
                            <p className="text-3xl font-black">{loading ? '...' : stats.templatesCount}</p>
                        </div>
                    </Card>
                    <Card className="border-none shadow-xl shadow-zinc-200/50 rounded-2xl p-6 bg-white flex items-center gap-6">
                        <div className="bg-emerald-50 p-4 rounded-2xl">
                            <Globe className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-zinc-500 font-medium text-sm">Active Websites</p>
                            <p className="text-3xl font-black">{loading ? '...' : stats.websitesCount}</p>
                        </div>
                    </Card>
                </div>

                {/* Management Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-none shadow-xl shadow-zinc-200/50 rounded-2xl overflow-hidden bg-white">
                        <CardHeader className="p-8 pb-0">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Layout className="w-5 h-5 text-primary" /> Template Management
                            </CardTitle>
                            <CardDescription>Create and configure website templates for your users.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="space-y-4">
                                <Button asChild className="w-full justify-between h-14 rounded-xl px-6 text-lg font-bold shadow-lg shadow-primary/20">
                                    <Link href="/admin/templates/create">
                                        <span className="flex items-center gap-3"><Plus className="w-5 h-5" /> Create New Template</span>
                                        <ChevronRight className="w-5 h-5 opacity-50" />
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full justify-between h-14 rounded-xl px-6 font-semibold">
                                    <Link href="/admin/templates">
                                        View All Templates
                                        <ChevronRight className="w-5 h-5 opacity-50" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl shadow-zinc-200/50 rounded-2xl overflow-hidden bg-white">
                        <CardHeader className="p-8 pb-0">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Users className="w-5 h-5 text-primary" /> User Oversight
                            </CardTitle>
                            <CardDescription>Monitor user activity and manage assignments.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="space-y-4">
                                <Button variant="outline" asChild className="w-full justify-between h-14 rounded-xl px-6 font-semibold">
                                    <Link href="/admin/users">
                                        Manage Registered Users
                                        <ChevronRight className="w-5 h-5 opacity-50" />
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full justify-between h-14 rounded-xl px-6 font-semibold">
                                    <Link href="/admin/assignments">
                                        Website Assignments
                                        <ChevronRight className="w-5 h-5 opacity-50" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
