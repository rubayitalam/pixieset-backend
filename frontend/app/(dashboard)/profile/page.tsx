"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth-provider';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUpload } from '@/components/ui/image-upload';
import { User, Shield, Briefcase, Globe, Save, Loader2, Key } from 'lucide-react';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<any>({
        name: '',
        bio: '',
        profilePhoto: '',
        businessName: '',
        location: '',
        socialLinks: {
            instagram: '',
            twitter: '',
            facebook: '',
            linkedin: ''
        }
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/users/me');
                const data = res.data;
                setProfile({
                    ...data,
                    socialLinks: data.socialLinks || { instagram: '', twitter: '', facebook: '', linkedin: '' }
                });
            } catch (error) {
                console.error('Failed to fetch profile', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put('/users/me', profile);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile', error);
            alert('Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        setSaving(true);
        try {
            await api.put('/users/me/password', {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            });
            setPasswordSuccess('Password changed successfully!');
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            setPasswordError(error.response?.data?.message || 'Failed to change password');
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
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Account Settings</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Manage your profile, business info, and security.</p>
                </div>
                <Button variant="outline" onClick={() => window.history.back()} className="rounded-full px-6">Back to Dashboard</Button>
            </div>

            <Tabs defaultValue="personal" className="space-y-8">
                <TabsList className="bg-zinc-100 p-1 rounded-xl h-auto">
                    <TabsTrigger value="personal" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <User className="w-4 h-4 mr-2" /> Personal
                    </TabsTrigger>
                    <TabsTrigger value="business" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Briefcase className="w-4 h-4 mr-2" /> Business
                    </TabsTrigger>
                    <TabsTrigger value="social" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Globe className="w-4 h-4 mr-2" /> Social Links
                    </TabsTrigger>
                    <TabsTrigger value="security" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Shield className="w-4 h-4 mr-2" /> Security
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    <form onSubmit={handleProfileSubmit}>
                        <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                            <CardHeader className="bg-zinc-50/50">
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Update your personal details and bio.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <Label>Profile Photo</Label>
                                    <div className="flex items-start gap-6">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-zinc-100 shrink-0">
                                            {profile.profilePhoto ? (
                                                <img src={profile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                                    <User className="w-12 h-12" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 max-w-xs">
                                            <ImageUpload
                                                value={profile.profilePhoto}
                                                onChange={(url) => setProfile({ ...profile, profilePhoto: url })}
                                                onRemove={() => setProfile({ ...profile, profilePhoto: '' })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={profile.name || ''}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="rounded-xl h-11"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            value={profile.email || ''}
                                            disabled
                                            className="rounded-xl h-11 bg-zinc-50"
                                        />
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest px-1">Email cannot be changed</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">About Me / Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={profile.bio || ''}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                        className="rounded-xl min-h-[120px]"
                                        placeholder="Tell people about yourself and your photography style..."
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="p-8 border-t bg-zinc-50/50 flex justify-end gap-3">
                                <Button type="submit" disabled={saving} className="rounded-full px-8 h-12 shadow-lg shadow-black/10">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>

                <TabsContent value="business">
                    <form onSubmit={handleProfileSubmit}>
                        <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                            <CardHeader className="bg-zinc-50/50">
                                <CardTitle>Business Details</CardTitle>
                                <CardDescription>Manage your professional identity.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="businessName">Business Name</Label>
                                        <Input
                                            id="businessName"
                                            value={profile.businessName || ''}
                                            onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                                            className="rounded-xl h-11"
                                            placeholder="e.g. Luna Photography"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Base Location</Label>
                                        <Input
                                            id="location"
                                            value={profile.location || ''}
                                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                            className="rounded-xl h-11"
                                            placeholder="e.g. London, UK"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-8 border-t bg-zinc-50/50 flex justify-end gap-3">
                                <Button type="submit" disabled={saving} className="rounded-full px-8 h-12 shadow-lg shadow-black/10">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                    Save Business Info
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>

                <TabsContent value="social">
                    <form onSubmit={handleProfileSubmit}>
                        <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                            <CardHeader className="bg-zinc-50/50">
                                <CardTitle>Social Media Presence</CardTitle>
                                <CardDescription>Link your social accounts for clients to find you.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {['instagram', 'twitter', 'facebook', 'linkedin'].map((platform) => (
                                        <div key={platform} className="space-y-2">
                                            <Label htmlFor={platform} className="capitalize">{platform} URL</Label>
                                            <Input
                                                id={platform}
                                                value={profile.socialLinks[platform] || ''}
                                                onChange={(e) => setProfile({
                                                    ...profile,
                                                    socialLinks: { ...profile.socialLinks, [platform]: e.target.value }
                                                })}
                                                className="rounded-xl h-11"
                                                placeholder={`https://${platform}.com/username`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="p-8 border-t bg-zinc-50/50 flex justify-end gap-3">
                                <Button type="submit" disabled={saving} className="rounded-full px-8 h-12 shadow-lg shadow-black/10">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                    Update Social Links
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>

                <TabsContent value="security">
                    <form onSubmit={handlePasswordSubmit}>
                        <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                            <CardHeader className="bg-zinc-50/50">
                                <CardTitle>Security & Password</CardTitle>
                                <CardDescription>Keep your account secure by updating your password regularly.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                {passwordError && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">{passwordError}</div>}
                                {passwordSuccess && <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm font-medium border border-emerald-100">{passwordSuccess}</div>}

                                <div className="space-y-4 max-w-md">
                                    <div className="space-y-2">
                                        <Label htmlFor="oldPassword">Current Password</Label>
                                        <Input
                                            id="oldPassword"
                                            type="password"
                                            value={passwordData.oldPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                            className="rounded-xl h-11"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            className="rounded-xl h-11"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                            className="rounded-xl h-11"
                                            required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-8 border-t bg-zinc-50/50 flex justify-end gap-3">
                                <Button type="submit" disabled={saving} className="rounded-full px-8 h-12 shadow-lg shadow-black/10">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Key className="w-4 h-4 mr-2" />}
                                    Change Password
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    );
}
