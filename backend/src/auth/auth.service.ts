import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
        };
    }

    async register(data: any) {
        console.log('Starting registration for email:', data.email);
        try {
            // Check if user exists
            const existingUser = await this.usersService.findOne(data.email);
            if (existingUser) {
                console.warn('Registration failed: User already exists -', data.email);
                throw new UnauthorizedException('User already exists');
            }

            // Explicitly set default role if not provided or to ensure USER
            const userData = {
                ...data,
                role: data.role || 'USER'
            };

            console.log('Attempting to create user in database with role:', userData.role);
            const user = await this.usersService.create(userData);

            if (user) {
                console.log('Successfully created user in database:', user.email, 'ID:', user.id);
            } else {
                console.error('Database returned null user for email:', data.email);
                throw new InternalServerErrorException('Database failed to return created user');
            }

            const { password, ...result } = user;
            return result;
        } catch (error: any) {
            console.error('Registration error in AuthService:', error.message, error.stack);
            if (error instanceof UnauthorizedException) throw error;
            throw new InternalServerErrorException(`Failed to create user: ${error.message}`);
        }
    }
}
