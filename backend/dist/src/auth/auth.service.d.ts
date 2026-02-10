import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
    }>;
    register(data: any): Promise<{
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
}
