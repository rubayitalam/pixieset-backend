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
exports.WebsitesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let WebsitesService = class WebsitesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createWebsiteDto) {
        const { userId, templateId, slug } = createWebsiteDto;
        const existing = await this.prisma.website.findUnique({ where: { slug } });
        if (existing) {
            throw new common_1.ConflictException('Slug already in use');
        }
        const template = await this.prisma.template.findUnique({ where: { id: templateId } });
        if (!template) {
            throw new common_1.NotFoundException('Template not found');
        }
        return this.prisma.website.create({
            data: {
                userId,
                templateId,
                slug,
                config: template.structure,
            },
        });
    }
    async findAll(user) {
        if (user.role === client_1.Role.ADMIN) {
            return this.prisma.website.findMany({
                include: { user: { select: { name: true, email: true } }, template: true },
            });
        }
        return this.prisma.website.findMany({
            where: { userId: user.userId },
            include: { template: true },
        });
    }
    async findOne(id, user) {
        const website = await this.prisma.website.findUnique({
            where: { id },
            include: { user: { select: { name: true, email: true } }, template: true },
        });
        if (!website) {
            throw new common_1.NotFoundException('Website not found');
        }
        if (user.role !== client_1.Role.ADMIN && website.userId !== user.userId) {
            throw new common_1.ForbiddenException('You do not have permission to access this website');
        }
        return website;
    }
    async update(id, updateWebsiteDto, user) {
        const website = await this.findOne(id, user);
        return this.prisma.website.update({
            where: { id: website.id },
            data: updateWebsiteDto,
        });
    }
    async publish(id, user) {
        const website = await this.findOne(id, user);
        return this.prisma.website.update({
            where: { id: website.id },
            data: { isPublished: !website.isPublished },
        });
    }
};
exports.WebsitesService = WebsitesService;
exports.WebsitesService = WebsitesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WebsitesService);
//# sourceMappingURL=websites.service.js.map