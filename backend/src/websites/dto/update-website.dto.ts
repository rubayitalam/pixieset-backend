import { IsObject, IsOptional, IsBoolean } from 'class-validator';

export class UpdateWebsiteDto {
    @IsObject()
    @IsOptional()
    config?: Record<string, any>;

    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;
}
