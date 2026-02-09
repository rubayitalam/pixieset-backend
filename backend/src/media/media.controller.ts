
import { Controller, Post, Delete, UseInterceptors, UploadedFile, UseGuards, Request, Param, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { memoryStorage } from 'multer';

@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(),
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    }))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Request() req: any,
        @Body('websiteId') websiteId?: string
    ) {
        if (!file) {
            throw new BadRequestException('File is required');
        }
        return this.mediaService.uploadFile(file, req.user.userId, websiteId);
    }

    @Delete(':id')
    async deleteFile(@Param('id') id: string, @Request() req: any) {
        return this.mediaService.deleteFile(id, req.user.userId);
    }
}
