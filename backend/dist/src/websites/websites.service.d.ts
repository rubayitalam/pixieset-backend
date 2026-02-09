import { PrismaService } from '../prisma/prisma.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
export declare class WebsitesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createWebsiteDto: CreateWebsiteDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    }>;
    findAll(user: any): Promise<({
        template: {
            id: string;
            createdAt: Date;
            name: string;
            description: string | null;
            thumbnail: string | null;
            structure: import("@prisma/client/runtime/library").JsonValue;
            isPublic: boolean;
            createdBy: string;
        };
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    })[]>;
    findOne(id: string, user: any): Promise<{
        user: {
            name: string | null;
            email: string;
        };
        template: {
            id: string;
            createdAt: Date;
            name: string;
            description: string | null;
            thumbnail: string | null;
            structure: import("@prisma/client/runtime/library").JsonValue;
            isPublic: boolean;
            createdBy: string;
        };
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    }>;
    update(id: string, updateWebsiteDto: UpdateWebsiteDto, user: any): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    }>;
    publish(id: string, user: any): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        slug: string;
        config: import("@prisma/client/runtime/library").JsonValue | null;
        isPublished: boolean;
        templateId: string;
    }>;
}
