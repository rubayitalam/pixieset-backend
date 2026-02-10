"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
    const router = useRouter();
    const { user, logout } = useAuth();

    useEffect(() => {
        if (user && user.role !== 'ADMIN') {
            router.push('/dashboard');
        }
    }, [user, router]);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span>Welcome, {user?.name || user?.email}</span>
                    <Button variant="outline" onClick={logout}>Logout</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Templates</h2>
                    <p className="text-gray-600">Manage website templates</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Users</h2>
                    <p className="text-gray-600">Manage photographers</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Settings</h2>
                    <p className="text-gray-600">Platform settings</p>
                </div>
            </div>
        </div>
    );
}
