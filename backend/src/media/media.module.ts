
import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
    imports: [PrismaModule],
    controllers: [MediaController],
    providers: [MediaService, CloudinaryProvider],
    exports: [MediaService],
})
export class MediaModule { }
