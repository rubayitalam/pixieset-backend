import { IsString, IsNotEmpty, IsObject, IsOptional, IsBoolean } from 'class-validator';

export class CreateWebsiteDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    templateId: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsObject()
    @IsOptional()
    config?: Record<string, any>;
}
