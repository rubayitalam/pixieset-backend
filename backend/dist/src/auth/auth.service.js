"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOne(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
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
    async register(data) {
        console.log('Starting registration for email:', data.email);
        try {
            const existingUser = await this.usersService.findOne(data.email);
            if (existingUser) {
                console.warn('Registration failed: User already exists -', data.email);
                throw new common_1.UnauthorizedException('User already exists');
            }
            const userData = {
                ...data,
                role: data.role || 'USER'
            };
            console.log('Attempting to create user in database with role:', userData.role);
            const user = await this.usersService.create(userData);
            if (user) {
                console.log('Successfully created user in database:', user.email, 'ID:', user.id);
            }
            else {
                console.error('Database returned null user for email:', data.email);
                throw new common_1.InternalServerErrorException('Database failed to return created user');
            }
            const { password, ...result } = user;
            return result;
        }
        catch (error) {
            console.error('Registration error in AuthService:', error.message, error.stack);
            if (error instanceof common_1.UnauthorizedException)
                throw error;
            throw new common_1.InternalServerErrorException(`Failed to create user: ${error.message}`);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map