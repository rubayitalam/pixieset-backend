export declare class CreateTemplateDto {
    name: string;
    description?: string;
    thumbnail?: string;
    structure: Record<string, any>;
    isPublic?: boolean;
}
export declare class UpdateTemplateDto extends CreateTemplateDto {
}
