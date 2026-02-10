import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, res: Response): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
    }>;
    register(createUserDto: any): Promise<{
        name: string | null;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        bio: string | null;
        profilePhoto: string | null;
        businessName: string | null;
        location: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
    getProfile(req: any): any;
}
