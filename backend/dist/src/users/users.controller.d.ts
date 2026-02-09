import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
}
