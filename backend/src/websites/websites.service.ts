import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { Role } from '@prisma/client';

@Injectable()
export class WebsitesService {
    constructor(private prisma: PrismaService) { }

    async create(createWebsiteDto: CreateWebsiteDto) {
        const { userId, templateId, slug } = createWebsiteDto;

        // Check if slug is taken
        const existing = await this.prisma.website.findUnique({ where: { slug } });
        if (existing) {
            throw new ConflictException('Slug already in use');
        }

        // Fetch template to get default structure
        const template = await this.prisma.template.findUnique({ where: { id: templateId } });
        if (!template) {
            throw new NotFoundException('Template not found');
        }

        return this.prisma.website.create({
            data: {
                userId,
                templateId,
                slug,
                config: template.structure as any, // Initial config copied from template
            },
        });
    }

    async findAll(user: any) {
        if (user.role === Role.ADMIN) {
            return this.prisma.website.findMany({
                include: { user: { select: { name: true, email: true } }, template: true },
            });
        }
        return this.prisma.website.findMany({
            where: { userId: user.userId },
            include: { template: true },
        });
    }

    async findOne(id: string, user: any) {
        const website = await this.prisma.website.findUnique({
            where: { id },
            include: { user: { select: { name: true, email: true } }, template: true },
        });

        if (!website) {
            throw new NotFoundException('Website not found');
        }

        if (user.role !== Role.ADMIN && website.userId !== user.userId) {
            throw new ForbiddenException('You do not have permission to access this website');
        }

        return website;
    }

    async update(id: string, updateWebsiteDto: UpdateWebsiteDto, user: any) {
        const website = await this.findOne(id, user);

        return this.prisma.website.update({
            where: { id: website.id },
            data: updateWebsiteDto,
        });
    }

    async publish(id: string, user: any) {
        const website = await this.findOne(id, user);

        return this.prisma.website.update({
            where: { id: website.id },
            data: { isPublished: !website.isPublished },
        });
    }
}
