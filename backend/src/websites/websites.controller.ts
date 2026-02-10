import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('websites')
export class WebsitesController {
    constructor(private readonly websitesService: WebsitesService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    create(@Body() createWebsiteDto: CreateWebsiteDto) {
        return this.websitesService.create(createWebsiteDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req: any) {
        return this.websitesService.findAll(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req: any) {
        return this.websitesService.findOne(id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateWebsiteDto: UpdateWebsiteDto, @Request() req: any) {
        return this.websitesService.update(id, updateWebsiteDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/publish')
    publish(@Param('id') id: string, @Request() req: any) {
        return this.websitesService.publish(id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/unpublish')
    unpublish(@Param('id') id: string, @Request() req: any) {
        return this.websitesService.unpublish(id, req.user);
    }

    @Get('slug/:slug')
    getBySlug(@Param('slug') slug: string) {
        return this.websitesService.findBySlug(slug);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/preview')
    getPreview(@Param('id') id: string, @Request() req: any) {
        return this.websitesService.getPreview(id, req.user);
    }

    @Get('public/:username')
    getPublicWebsite(@Param('username') username: string) {
        return this.websitesService.getPublicWebsite(username);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.USER)
    remove(@Param('id') id: string, @Request() req: any) {
        return this.websitesService.remove(id, req.user);
    }
}
