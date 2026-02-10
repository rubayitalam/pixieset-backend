import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    findAllUsers(): Promise<User[]>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        bio: string | null;
        profilePhoto: string | null;
        businessName: string | null;
        location: string | null;
        socialLinks: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateProfile(userId: string, data: any): Promise<{
        id: string;
        email: string;
        name: string | null;
        bio: string | null;
        profilePhoto: string | null;
        businessName: string | null;
        location: string | null;
        socialLinks: Prisma.JsonValue;
        updatedAt: Date;
    }>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        updatedAt: Date;
    }>;
}
