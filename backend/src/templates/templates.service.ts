import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto, UpdateTemplateDto } from './dto/create-template.dto';

@Injectable()
export class TemplatesService {
    constructor(private prisma: PrismaService) { }

    create(createTemplateDto: CreateTemplateDto, userId: string) {
        return this.prisma.template.create({
            data: {
                ...createTemplateDto,
                createdBy: userId,
            },
        });
    }

    findAll() {
        return this.prisma.template.findMany({
            include: { creator: { select: { name: true, email: true } } },
        });
    }

    findOne(id: string) {
        return this.prisma.template.findUnique({
            where: { id },
            include: { creator: { select: { name: true, email: true } } },
        });
    }

    update(id: string, updateTemplateDto: UpdateTemplateDto) {
        return this.prisma.template.update({
            where: { id },
            data: updateTemplateDto,
        });
    }

    remove(id: string) {
        return this.prisma.template.delete({
            where: { id },
        });
    }
}
