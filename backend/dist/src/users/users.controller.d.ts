import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        bio: string | null;
        profilePhoto: string | null;
        businessName: string | null;
        location: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    getProfile(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        email: string;
        bio: string | null;
        profilePhoto: string | null;
        businessName: string | null;
        location: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue;
    } | null>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<{
        id: string;
        updatedAt: Date;
        name: string | null;
        email: string;
        bio: string | null;
        profilePhoto: string | null;
        businessName: string | null;
        location: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue;
    }>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<{
        id: string;
        updatedAt: Date;
        name: string | null;
        email: string;
    }>;
}
