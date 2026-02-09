import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTemplateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    thumbnail?: string;

    @IsObject()
    @IsNotEmpty()
    structure: Record<string, any>; // Allowing flexible JSON for now, can be stricter later

    @IsBoolean()
    @IsOptional()
    isPublic?: boolean;
}

export class UpdateTemplateDto extends CreateTemplateDto { }
