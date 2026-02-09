
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class MediaService {
    constructor(private prisma: PrismaService) { }

    async uploadFile(file: Express.Multer.File, userId: string, websiteId?: string) {
        if (!file) throw new BadRequestException('No file provided');
        if (file.size > 5 * 1024 * 1024) throw new BadRequestException('File size too large (max 5MB)');

        // Cloudinary Upload
        const uploadResult = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'pixieset', resource_type: 'auto' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });

        // Save to DB
        const media = await this.prisma.mediaFile.create({
            data: {
                userId: userId,
                websiteId: websiteId || null,
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
                type: file.mimetype,
                filename: file.originalname,
            },
        });

        return media;
    }

    async deleteFile(id: string, userId: string) {
        const media = await this.prisma.mediaFile.findUnique({ where: { id } });
        if (!media) throw new BadRequestException('File not found');
        if (media.userId !== userId) throw new BadRequestException('Unauthorized');

        if (media.publicId) {
            await cloudinary.uploader.destroy(media.publicId);
        }

        return this.prisma.mediaFile.delete({ where: { id } });
    }
}
