import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    uploadFile(file: Express.Multer.File, req: any, websiteId?: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        websiteId: string | null;
        url: string;
        publicId: string | null;
        type: string;
        filename: string | null;
    }>;
    deleteFile(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        websiteId: string | null;
        url: string;
        publicId: string | null;
        type: string;
        filename: string | null;
    }>;
}
