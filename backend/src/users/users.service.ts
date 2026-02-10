import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });
    }
    async findAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany({
            where: { role: 'USER' },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                // Avoid sending password
            },
        }) as any;
    }

    async getProfile(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                bio: true,
                profilePhoto: true,
                businessName: true,
                location: true,
                socialLinks: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async updateProfile(userId: string, data: any) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                bio: data.bio,
                profilePhoto: data.profilePhoto,
                businessName: data.businessName,
                location: data.location,
                socialLinks: data.socialLinks,
                updatedAt: new Date(),
            },
            select: {
                id: true,
                email: true,
                name: true,
                bio: true,
                profilePhoto: true,
                businessName: true,
                location: true,
                socialLinks: true,
                updatedAt: true,
            },
        });
    }

    async changePassword(userId: string, oldPassword: string, newPassword: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid current password');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
            select: {
                id: true,
                email: true,
                name: true,
                updatedAt: true,
            },
        });
    }
}
