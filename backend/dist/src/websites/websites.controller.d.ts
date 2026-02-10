import { WebsitesService } from './websites.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
export declare class WebsitesController {
    private readonly websitesService;
    constructor(websitesService: WebsitesService);
    create(createWebsiteDto: CreateWebsiteDto): Promise<{
        id: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        templateId: string;
    }>;
    findAll(req: any): Promise<({
        template: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            thumbnail: string | null;
            structure: import("@prisma/client/runtime/library").JsonValue;
            createdBy: string;
            isPublic: boolean;
        };
    } & {
        id: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        templateId: string;
    })[]>;
    findOne(id: string, req: any): Promise<{
        user: {
            name: string | null;
            email: string;
        };
        template: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            thumbnail: string | null;
            structure: import("@prisma/client/runtime/library").JsonValue;
            createdBy: string;
            isPublic: boolean;
        };
    } & {
        id: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        templateId: string;
    }>;
    update(id: string, updateWebsiteDto: UpdateWebsiteDto, req: any): Promise<{
        id: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        templateId: string;
    }>;
    publish(id: string, req: any): Promise<{
        id: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        templateId: string;
    }>;
    unpublish(id: string, req: any): Promise<{
        id: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        templateId: string;
    }>;
    getBySlug(slug: string): Promise<{
        user: {
            name: string | null;
        };
        template: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            thumbnail: string | null;
            structure: import("@prisma/client/runtime/library").JsonValue;
            createdBy: string;
            isPublic: boolean;
        };
    } & {
        id: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        templateId: string;
    }>;
    getPreview(id: string, req: any): Promise<{
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
            name: string | null;
            email: string;
            bio: string | null;
            profilePhoto: string | null;
            businessName: string | null;
            location: string | null;
            socialLinks: import("@prisma/client/runtime/library").JsonValue;
        };
        template: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            thumbnail: string | null;
            structure: import("@prisma/client/runtime/library").JsonValue;
            createdBy: string;
            isPublic: boolean;
        };
        config: string | number | true | import("@prisma/client/runtime/library").JsonObject | import("@prisma/client/runtime/library").JsonArray;
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
            name: string | null;
            email: string;
            bio: string | null;
            profilePhoto: string | null;
            businessName: string | null;
            location: string | null;
            socialLinks: import("@prisma/client/runtime/library").JsonValue;
        };
        template: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            thumbnail: string | null;
            structure: import("@prisma/client/runtime/library").JsonValue;
            createdBy: string;
            isPublic: boolean;
        };
        config: string | number | true | import("@prisma/client/runtime/library").JsonObject | import("@prisma/client/runtime/library").JsonArray;
    }>;
    remove(id: string, req: any): Promise<{
        id: string;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        templateId: string;
    }>;
}
