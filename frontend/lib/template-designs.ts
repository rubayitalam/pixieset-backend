// Template design metadata with color schemes, typography, and features
export const TEMPLATE_DESIGNS = {
  Minimal: {
    colors: ['#FFFFFF', '#F5F5F5', '#000000'],
    features: ['Clean white design', '3-column gallery', 'Simple contact form'],
    description: 'Clean, modern design with focus on large hero imagery',
    typography: 'system-ui, sans-serif',
    layoutType: 'grid',
  },
  Bold: {
    colors: ['#000000', '#1a1a1a', '#FFFFFF'],
    features: ['Dark theme', 'Masonry gallery', 'Animated sections'],
    description: 'Dark, modern theme with masonry gallery and bold typography',
    typography: 'Inter, Helvetica Neue, sans-serif',
    layoutType: 'masonry',
  },
  Classic: {
    colors: ['#FEFAF5', '#F5F1E8', '#4A4A4A'],
    features: ['Serif typography', '2-column gallery', 'Timeline support'],
    description: 'Elegant, timeless design with serif fonts and carousel hero',
    typography: 'Playfair Display, Georgia, serif',
    layoutType: '2-column',
  },
};

export function getTemplateDesign(templateName?: string) {
  if (!templateName || !TEMPLATE_DESIGNS[templateName as keyof typeof TEMPLATE_DESIGNS]) {
    return { colors: [], features: [], description: '', typography: '', layoutType: '' };
  }
  return TEMPLATE_DESIGNS[templateName as keyof typeof TEMPLATE_DESIGNS];
}

export function getTemplateColors(templateName?: string) {
  const design = getTemplateDesign(templateName);
  return design.colors || [];
}

export function getTemplateFeatures(templateName?: string) {
  const design = getTemplateDesign(templateName);
  return design.features || [];
}
