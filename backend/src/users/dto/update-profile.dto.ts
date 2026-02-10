import { IsString, IsOptional, IsEmail, IsObject } from 'class-validator';

export class UpdateProfileDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    profilePhoto?: string;

    @IsString()
    @IsOptional()
    businessName?: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsObject()
    @IsOptional()
    socialLinks?: Record<string, string>;
}
