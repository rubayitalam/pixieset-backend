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

        if (website.isPublished) {
            throw new ConflictException('Website is already published');
        }

        return this.prisma.website.update({
            where: { id: website.id },
            data: { isPublished: true },
        });
    }

    async unpublish(id: string, user: any) {
        const website = await this.findOne(id, user);

        if (!website.isPublished) {
            throw new ConflictException('Website is already unpublished');
        }

        return this.prisma.website.update({
            where: { id: website.id },
            data: { isPublished: false },
        });
    }

    async findBySlug(slug: string) {
        const website = await this.prisma.website.findUnique({
            where: { slug },
            include: { user: { select: { name: true } }, template: true },
        });

        if (!website) {
            throw new NotFoundException('Website not found');
        }

        return website;
    }

    async getPublicWebsite(username: string) {
        // Find user by name/username
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { name: username },
                    { email: username.replace(/-/g, '.') }, // Handle email-like usernames
                ],
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Find the primary website for this user (or first published website)
        const website = await this.prisma.website.findFirst({
            where: {
                userId: user.id,
                isPublished: true,
            },
            include: {
                template: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        bio: true,
                        profilePhoto: true,
                        businessName: true,
                        location: true,
                        socialLinks: true,
                    },
                },
            },
        });

        if (!website) {
            throw new NotFoundException('No published website found');
        }

        // Merge template structure with website config
        const template = website.template;
        const config = website.config || {};

        return {
            website: {
                id: website.id,
                userId: website.userId,
                templateId: website.templateId,
                slug: website.slug,
                isPublished: website.isPublished,
                createdAt: website.createdAt,
                updatedAt: website.updatedAt,
            },
            user: website.user,
            template,
            config,
        };
    }

    async remove(id: string, user: any) {
        const website = await this.findOne(id, user);

        return this.prisma.website.delete({
            where: { id: website.id },
        });
    }

    async getPreview(id: string, user: any) {
        // Get website regardless of publish status
        const website = await this.prisma.website.findUnique({
            where: { id },
            include: {
                template: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        bio: true,
                        profilePhoto: true,
                        businessName: true,
                        location: true,
                        socialLinks: true,
                    },
                },
            },
        });

        if (!website) {
            throw new NotFoundException('Website not found');
        }

        // Check authorization: only owner or admin can preview
        if (user.role !== Role.ADMIN && website.userId !== user.userId) {
            throw new ForbiddenException('You do not have permission to preview this website');
        }

        const config = website.config || {};

        return {
            website: {
                id: website.id,
                userId: website.userId,
                templateId: website.templateId,
                slug: website.slug,
                isPublished: website.isPublished,
                createdAt: website.createdAt,
                updatedAt: website.updatedAt,
            },
            user: website.user,
            template: website.template,
            config,
        };
    }}