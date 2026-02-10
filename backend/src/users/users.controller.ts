import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    findAll() {
        return this.usersService.findAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Request() req: any) {
        return this.usersService.getProfile(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('me')
    updateProfile(@Request() req: any, @Body() updateProfileDto: UpdateProfileDto) {
        return this.usersService.updateProfile(req.user.userId, updateProfileDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('me/password')
    changePassword(@Request() req: any, @Body() changePasswordDto: ChangePasswordDto) {
        return this.usersService.changePassword(
            req.user.userId,
            changePasswordDto.oldPassword,
            changePasswordDto.newPassword
        );
    }
}
