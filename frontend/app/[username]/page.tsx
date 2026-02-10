import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import api from '@/lib/api';
import { PublicWebsiteRenderer } from '@/components/public-website';

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

// Fetch website data from backend
async function getWebsiteData(username: string) {
  try {
    const response = await api.get(`/websites/public/${username}`);
    return response.data;
  } catch {
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const data = await getWebsiteData(username);

  if (!data) {
    return {
      title: 'Not Found',
      description: 'Website not found',
    };
  }

  const { website, user, config } = data;
  const seoConfig = config?.seo || {};
  const siteName = user?.businessName || user?.name || username;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  
  return {
    title: seoConfig.title || `${siteName} - Photography Portfolio`,
    description:
      seoConfig.description || `Explore ${siteName}'s photography portfolio and gallery`,
    keywords: seoConfig.keywords || ['photography', 'portfolio', 'gallery'],
    openGraph: {
      title: seoConfig.ogTitle || seoConfig.title || `${siteName} - Photography`,
      description:
        seoConfig.ogDescription || seoConfig.description || `Explore ${siteName}'s work`,
      images: seoConfig.ogImage
        ? [
            {
              url: seoConfig.ogImage,
              width: 1200,
              height: 630,
              alt: `${siteName} Portfolio`,
            },
          ]
        : [],
      type: 'website',
      url: `${baseUrl}/${username}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoConfig.ogTitle || seoConfig.title || `${siteName}`,
      description: seoConfig.ogDescription || seoConfig.description,
      images: seoConfig.ogImage ? [seoConfig.ogImage] : [],
    },
    robots: {
      index: website.isPublished,
      follow: website.isPublished,
    },
  };
}

export default async function PublicWebsitePage({ params }: PageProps) {
  const { username } = await params;
  const data = await getWebsiteData(username);

  if (!data || !data.website.isPublished) {
    notFound();
  }

  const { website, user, config, template } = data;

  return (
    <main className="w-full bg-white">
      {/* Render the public website using fetched data */}
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
