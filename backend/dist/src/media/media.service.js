"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cloudinary_1 = require("cloudinary");
const streamifier = require("streamifier");
let MediaService = class MediaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadFile(file, userId, websiteId) {
        if (!file)
            throw new common_1.BadRequestException('No file provided');
        if (file.size > 5 * 1024 * 1024)
            throw new common_1.BadRequestException('File size too large (max 5MB)');
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder: 'pixieset', resource_type: 'auto' }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
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
    async deleteFile(id, userId) {
        const media = await this.prisma.mediaFile.findUnique({ where: { id } });
        if (!media)
            throw new common_1.BadRequestException('File not found');
        if (media.userId !== userId)
            throw new common_1.BadRequestException('Unauthorized');
        if (media.publicId) {
            await cloudinary_1.v2.uploader.destroy(media.publicId);
        }
        return this.prisma.mediaFile.delete({ where: { id } });
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MediaService);
//# sourceMappingURL=media.service.js.map