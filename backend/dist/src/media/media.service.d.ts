import { PrismaService } from '../prisma/prisma.service';
export declare class MediaService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadFile(file: Express.Multer.File, userId: string, websiteId?: string): Promise<{
        id: string;
        userId: string;
        websiteId: string | null;
        url: string;
        publicId: string | null;
        type: string;
        filename: string | null;
        createdAt: Date;
    }>;
    deleteFile(id: string, userId: string): Promise<{
        id: string;
        userId: string;
        websiteId: string | null;
        url: string;
        publicId: string | null;
        type: string;
        filename: string | null;
        createdAt: Date;
    }>;
}
