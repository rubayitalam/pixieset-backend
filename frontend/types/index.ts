// User and Auth Types
export interface User {
  id: string;
  email: string;
  password?: string;
  role: 'ADMIN' | 'USER';
  name?: string;
  bio?: string;
  profilePhoto?: string;
  businessName?: string;
  location?: string;
  socialLinks?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

// Template Types
export interface TemplateSection {
  type: 'hero' | 'gallery' | 'about' | 'contact' | 'services';
  order: number;
  defaultContent: Record<string, any>;
}

export interface TemplateTheme {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  accentColor?: string;
  fontSize?: string;
  textTransform?: string;
}

export interface Template {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  sections?: TemplateSection[];
  theme?: TemplateTheme;
  structure?: Record<string, any>;
  thumbnail?: string;
  createdBy?: string;
  isPublic?: boolean;
  previewImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Website Types
export interface WebsiteConfig {
  sections: WebsiteSection[];
  theme?: TemplateTheme;
  seo?: WebsiteSeo;
  integrations?: {
    googleAnalyticsId?: string;
  };
  advanced?: {
    customCss?: string;
  };
  notifications?: {
    contactEmail?: string;
  };
  localization?: {
    language?: string;
  };
}

export interface WebsiteSection {
  type: string;
  order: number;
  content: Record<string, any>;
}

export interface WebsiteSeo {
  title?: string;
  description?: string;
  keywords?: string | string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface Website {
  id: string;
  userId: string;
  templateId: string;
  slug: string;
  config: WebsiteConfig;
  isPublished: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

// Media File Types
export interface MediaFile {
  id: string;
  userId: string;
  url: string;
  secureUrl: string;
  publicId?: string;
  type: 'image' | 'video';
  websiteId?: string;
  createdAt: string;
  updatedAt: string;
}

// Combined Types for Rendering
export interface PublicWebsiteData {
  website: Website;
  template: Template;
  user: User;
  config: WebsiteConfig;
}
