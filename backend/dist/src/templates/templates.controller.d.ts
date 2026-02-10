import { TemplatesService } from './templates.service';
import { CreateTemplateDto, UpdateTemplateDto } from './dto/create-template.dto';
export declare class TemplatesController {
    private readonly templatesService;
    constructor(templatesService: TemplatesService);
    create(createTemplateDto: CreateTemplateDto, req: any): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        thumbnail: string | null;
        structure: import("@prisma/client/runtime/library").JsonValue;
        createdBy: string;
        isPublic: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        creator: {
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        thumbnail: string | null;
        structure: import("@prisma/client/runtime/library").JsonValue;
        createdBy: string;
        isPublic: boolean;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TemplateClient<({
        creator: {
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        thumbnail: string | null;
        structure: import("@prisma/client/runtime/library").JsonValue;
        createdBy: string;
        isPublic: boolean;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateTemplateDto: UpdateTemplateDto): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        thumbnail: string | null;
        structure: import("@prisma/client/runtime/library").JsonValue;
        createdBy: string;
        isPublic: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        thumbnail: string | null;
        structure: import("@prisma/client/runtime/library").JsonValue;
        createdBy: string;
        isPublic: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
