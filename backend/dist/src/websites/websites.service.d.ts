import { PrismaService } from '../prisma/prisma.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
export declare class WebsitesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createWebsiteDto: CreateWebsiteDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    }>;
    findAll(user: any): Promise<({
        template: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            thumbnail: string | null;
            structure: import("@prisma/client/runtime/library").JsonValue;
            isPublic: boolean;
            createdBy: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    })[]>;
    findOne(id: string, user: any): Promise<{
        user: {
            email: string;
            name: string | null;
        };
        template: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            thumbnail: string | null;
            structure: import("@prisma/client/runtime/library").JsonValue;
            isPublic: boolean;
            createdBy: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    }>;
    update(id: string, updateWebsiteDto: UpdateWebsiteDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    }>;
    publish(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    }>;
    unpublish(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    }>;
    findBySlug(slug: string): Promise<{
        user: {
            name: string | null;
        };
        template: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            thumbnail: string | null;
            structure: import("@prisma/client/runtime/library").JsonValue;
            isPublic: boolean;
            createdBy: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    }>;
    getPublicWebsite(username: string): Promise<{
        website: {
            id: string;
            userId: string;
            templateId: string;
            slug: string;
            isPublished: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        user: {
            id: string;
            email: string;
            name: string | null;
            bio: string | null;
            profilePhoto: string | null;
            businessName: string | null;
            location: string | null;
            socialLinks: import("@prisma/client/runtime/library").JsonValue;
        };
        template: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            thumbnail: string | null;
            structure: import("@prisma/client/runtime/library").JsonValue;
            isPublic: boolean;
            createdBy: string;
        };
        config: string | number | true | import("@prisma/client/runtime/library").JsonObject | import("@prisma/client/runtime/library").JsonArray;
    }>;
    remove(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    }>;
    getPreview(id: string, user: any): Promise<{
        website: {
            id: string;
            userId: string;
            templateId: string;
            slug: string;
            isPublished: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        user: {
            id: string;
            email: string;
            name: string | null;
            bio: string | null;
            profilePhoto: string | null;
            businessName: string | null;
            location: string | null;
            socialLinks: import("@prisma/client/runtime/library").JsonValue;
        };
        template: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            thumbnail: string | null;
            structure: import("@prisma/client/runtime/library").JsonValue;
            isPublic: boolean;
            createdBy: string;
        };
        config: string | number | true | import("@prisma/client/runtime/library").JsonObject | import("@prisma/client/runtime/library").JsonArray;
    }>;
}
