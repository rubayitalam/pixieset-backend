import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto, UpdateTemplateDto } from './dto/create-template.dto';
export declare class TemplatesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTemplateDto: CreateTemplateDto, userId: string): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        thumbnail: string | null;
        structure: import("@prisma/client/runtime/library").JsonValue;
        isPublic: boolean;
        createdBy: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        creator: {
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        thumbnail: string | null;
        structure: import("@prisma/client/runtime/library").JsonValue;
        isPublic: boolean;
        createdBy: string;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TemplateClient<({
        creator: {
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        thumbnail: string | null;
        structure: import("@prisma/client/runtime/library").JsonValue;
        isPublic: boolean;
        createdBy: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateTemplateDto: UpdateTemplateDto): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        thumbnail: string | null;
        structure: import("@prisma/client/runtime/library").JsonValue;
        isPublic: boolean;
        createdBy: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        thumbnail: string | null;
        structure: import("@prisma/client/runtime/library").JsonValue;
        isPublic: boolean;
        createdBy: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
