'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { PublicWebsiteRenderer } from '@/components/public-website';

export default function PreviewPage() {
  const params = useParams();
  const websiteId = params.websiteId as string;
  const [previewData, setPreviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await api.get(`/websites/${websiteId}/preview`);
        setPreviewData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load preview');
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [websiteId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold text-gray-900">Preview Not Available</h1>
          <p className="text-gray-600">{error}</p>
          <a
            href="/dashboard"
            className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  if (!previewData) {
    return null;
  }

  const { website, config, template, user } = previewData;

  return (
    <main className="w-full bg-white">
      {/* Preview Header Banner */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">Preview Mode</span> - This is an unpublished preview. Changes made will not appear on the live site.
          </p>
          <a
            href={`/websites/${website.id}/customize`}
            className="text-sm text-yellow-900 hover:text-yellow-700 font-medium underline"
          >
            Continue Editing
          </a>
        </div>
      </div>

      {/* Render the website */}
      <PublicWebsiteRenderer
        config={config}
        theme={config.theme || template?.theme}
        websiteId={website.id}
      />

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} {user?.businessName || user?.name}. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-2">Powered by Pixieset</p>
      </footer>
    </main>
  );
}
