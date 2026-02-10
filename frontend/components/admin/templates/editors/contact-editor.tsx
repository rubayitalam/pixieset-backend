"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface ContactSectionEditorProps {
    content: any;
    onChange: (content: any) => void;
}

export function ContactSectionEditor({ content, onChange }: ContactSectionEditorProps) {
    const handleChange = (field: string, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const handleSocialChange = (field: string, value: string) => {
        const socialLinks = { ...(content.socialLinks || {}) };
        socialLinks[field] = value;
        handleChange('socialLinks', socialLinks);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label htmlFor="show-form">Contact Form</Label>
                    <p className="text-sm text-muted-foreground">Show a contact form in this section</p>
                </div>
                <Switch
                    id="show-form"
                    checked={content.showForm !== false}
                    onCheckedChange={(checked) => handleChange('showForm', checked)}
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="show-email">Email Field</Label>
                    </div>
                    <Switch
                        id="show-email"
                        checked={content.showEmail !== false}
                        onCheckedChange={(checked) => handleChange('showEmail', checked)}
                    />
                </div>
                {content.showEmail !== false && (
                    <div className="space-y-2">
                        <Label htmlFor="contact-email">Email Address</Label>
                        <Input
                            id="contact-email"
                            value={content.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="hello@example.com"
                        />
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="show-phone">Phone Field</Label>
                    </div>
                    <Switch
                        id="show-phone"
                        checked={content.showPhone !== false}
                        onCheckedChange={(checked) => handleChange('showPhone', checked)}
                    />
                </div>
                {content.showPhone !== false && (
                    <div className="space-y-2">
                        <Label htmlFor="contact-phone">Phone Number</Label>
                        <Input
                            id="contact-phone"
                            value={content.phone || ''}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <Label>Social Media Links</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="social-facebook" className="text-xs">Facebook</Label>
                        <Input
                            id="social-facebook"
                            value={content.socialLinks?.facebook || ''}
                            onChange={(e) => handleSocialChange('facebook', e.target.value)}
                            placeholder="https://facebook.com/..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="social-instagram" className="text-xs">Instagram</Label>
                        <Input
                            id="social-instagram"
                            value={content.socialLinks?.instagram || ''}
                            onChange={(e) => handleSocialChange('instagram', e.target.value)}
                            placeholder="https://instagram.com/..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="social-twitter" className="text-xs">Twitter / X</Label>
                        <Input
                            id="social-twitter"
                            value={content.socialLinks?.twitter || ''}
                            onChange={(e) => handleSocialChange('twitter', e.target.value)}
                            placeholder="https://twitter.com/..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
