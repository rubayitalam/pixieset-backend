'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface PublishDialogProps {
  websiteId: string;
  isPublished: boolean;
  slug: string;
  onPublishChange?: (isPublished: boolean) => void;
}

export function PublishDialog({ websiteId, isPublished, slug, onPublishChange }: PublishDialogProps) {
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    try {
      await api.patch(`/websites/${websiteId}/publish`);
      onPublishChange?.(true);
    } catch (error) {
      console.error('Failed to publish website', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnpublish = async () => {
    setLoading(true);
    try {
      await api.patch(`/websites/${websiteId}/unpublish`);
      onPublishChange?.(false);
    } catch (error) {
      console.error('Failed to unpublish website', error);
    } finally {
      setLoading(false);
    }
  };

  if (isPublished) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="rounded-lg" size="sm">
            Unpublish
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unpublish Website?</AlertDialogTitle>
            <AlertDialogDescription>
              Your website at <code className="px-2 py-1 bg-gray-100 rounded">{slug}</code> will no longer be accessible to the public.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-4 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUnpublish} disabled={loading} className="bg-destructive hover:bg-destructive/90">
              {loading ? 'Unpublishing...' : 'Unpublish'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-lg bg-green-600 hover:bg-green-700" size="sm">
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish Website?</AlertDialogTitle>
          <AlertDialogDescription>
            Your website will be live at <code className="px-2 py-1 bg-gray-100 rounded text-black">yourdomain.com/{slug}</code> and visible to anyone on the internet.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-4 justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePublish} disabled={loading} className="bg-green-600 hover:bg-green-700">
            {loading ? 'Publishing...' : 'Publish Live'}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
