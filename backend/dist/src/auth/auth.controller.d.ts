import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(createUserDto: any): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getProfile(req: any): any;
}
