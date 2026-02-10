"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM_TEMPLATES = void 0;
exports.SYSTEM_TEMPLATES = [
    {
        name: 'Minimal',
        description: 'Clean, modern design with focus on large hero imagery and galleries',
        structure: {
            sections: [
                {
                    type: 'hero',
                    order: 1,
                    defaultContent: {
                        heading: 'Your Story',
                        subheading: 'Professional Photography Showcase',
                        backgroundImage: 'https://images.unsplash.com/photo-1579710039144-85d6bae6fdd0?w=1200&h=600&fit=crop',
                        ctaText: 'Explore Gallery',
                        ctaLink: '#gallery',
                        overlayOpacity: 0.3,
                    },
                },
                {
                    type: 'gallery',
                    order: 2,
                    defaultContent: {
                        title: 'Recent Work',
                        columns: 3,
                        aspectRatio: '1/1',
                        images: [],
                        lightbox: true,
                        spacing: 'compact',
                    },
                },
                {
                    type: 'about',
                    order: 3,
                    defaultContent: {
                        title: 'About Me',
                        content: 'Welcome to my photography portfolio. I specialize in capturing moments that matter.',
                        profileImage: null,
                        layout: 'right',
                    },
                },
                {
                    type: 'contact',
                    order: 4,
                    defaultContent: {
                        title: 'Get in Touch',
                        email: 'contact@example.com',
                        phone: null,
                        showForm: true,
                        showInfo: true,
                        socialLinks: [],
                    },
                },
            ],
            theme: {
                primaryColor: '#FFFFFF',
                secondaryColor: '#F5F5F5',
                accentColor: '#000000',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'base',
            },
        },
    },
    {
        name: 'Bold',
        description: 'Dark, modern theme with masonry gallery and animated sections',
        structure: {
            sections: [
                {
                    type: 'hero',
                    order: 1,
                    defaultContent: {
                        heading: 'BOLD',
                        subheading: 'Creative Vision Realized',
                        backgroundImage: 'https://images.unsplash.com/photo-1516035069371-29a08e8be625?w=1200&h=600&fit=crop',
                        videoUrl: null,
                        ctaText: 'View Portfolio',
                        ctaLink: '#gallery',
                        overlayOpacity: 0.6,
                        textColor: '#FFFFFF',
                        animation: 'fade-in',
                    },
                },
                {
                    type: 'gallery',
                    order: 2,
                    defaultContent: {
                        title: 'Portfolio',
                        columns: 'masonry',
                        aspectRatio: 'auto',
                        images: [],
                        lightbox: true,
                        spacing: 'generous',
                        animation: 'stagger',
                    },
                },
                {
                    type: 'about',
                    order: 3,
                    defaultContent: {
                        title: 'My Vision',
                        content: 'Bold, expressive photography that tells your unique story.',
                        profileImage: null,
                        layout: 'left',
                        backgroundColor: '#1a1a1a',
                        textColor: '#FFFFFF',
                    },
                },
                {
                    type: 'contact',
                    order: 4,
                    defaultContent: {
                        title: 'Let´s Create',
                        email: 'contact@example.com',
                        phone: null,
                        showForm: true,
                        showInfo: true,
                        backgroundColor: '#000000',
                        textColor: '#FFFFFF',
                        socialLinks: [],
                    },
                },
            ],
            theme: {
                primaryColor: '#000000',
                secondaryColor: '#1a1a1a',
                accentColor: '#FFFFFF',
                fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                fontSize: 'large',
                textTransform: 'uppercase',
            },
        },
    },
    {
        name: 'Classic',
        description: 'Elegant, timeless design with serif fonts and carousel hero',
        structure: {
            sections: [
                {
                    type: 'hero',
                    order: 1,
                    defaultContent: {
                        heading: 'Timeless Moments',
                        subheading: 'Crafted with care and elegance',
                        backgroundImage: 'https://images.unsplash.com/photo-1502295703733-e45a1e0bc46c?w=1200&h=600&fit=crop',
                        carousel: true,
                        carouselImages: [],
                        ctaText: 'Discover',
                        ctaLink: '#gallery',
                        overlayOpacity: 0.2,
                        textColor: '#2C2C2C',
                    },
                },
                {
                    type: 'gallery',
                    order: 2,
                    defaultContent: {
                        title: 'Collection',
                        columns: 2,
                        aspectRatio: '4/3',
                        images: [],
                        lightbox: true,
                        spacing: 'elegant',
                        borderStyle: 'thin-line',
                    },
                },
                {
                    type: 'about',
                    order: 3,
                    defaultContent: {
                        title: 'Our Story',
                        content: 'With over a decade of experience, we bring elegance and sophistication to every frame.',
                        profileImage: null,
                        layout: 'center',
                        timeline: [
                            { year: '2015', event: 'Started Journey' },
                            { year: '2018', event: 'Award Winner' },
                            { year: '2023', event: 'Expanded Studio' },
                        ],
                    },
                },
                {
                    type: 'contact',
                    order: 4,
                    defaultContent: {
                        title: 'Plan Your Session',
                        email: 'contact@example.com',
                        phone: '+1 (555) 123-4567',
                        showForm: true,
                        showInfo: true,
                        formFields: ['name', 'email', 'phone', 'eventDate', 'message'],
                        socialLinks: [],
                    },
                },
            ],
            theme: {
                primaryColor: '#FEFAF5',
                secondaryColor: '#F5F1E8',
                accentColor: '#4A4A4A',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'medium',
                letterSpacing: 'wide',
            },
        },
    },
];
//# sourceMappingURL=templates-seed.js.map