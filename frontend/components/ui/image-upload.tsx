
import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { X, CloudUpload, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import imageCompression from 'browser-image-compression';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove: () => void;
    disabled?: boolean;
    className?: string;
    websiteId?: string;
}

export function ImageUpload({ value, onChange, onRemove, disabled, className, websiteId }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("File too large (max 5MB)");
            return;
        }

        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            alert("Invalid file type. Only JPG, PNG, and WebP are allowed.");
            return;
        }

        setIsUploading(true);
        setProgress(0);

        try {
            // Client-side compression
            const options = {
                maxSizeMB: 1, // Compress to ~1MB
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };
            const compressedFile = await imageCompression(file, options);

            const formData = new FormData();
            formData.append('file', compressedFile);
            if (websiteId) formData.append('websiteId', websiteId);

            const response = await api.post('/media/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                    setProgress(percentCompleted);
                },
            });

            onChange(response.data.url);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
            setProgress(0);
        }
    };

    const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragActive(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragActive(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleUpload(file);
    };

    return (
        <div className={cn("relative w-full", className)}>
            <input
                type="file"
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
                ref={fileInputRef}
                onChange={onFileSelect}
                disabled={disabled || isUploading}
            />

            {value ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-zinc-100 group">
                    <img src={value} alt="Uploaded" className="object-cover w-full h-full" />
                    <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                            type="button"
                            onClick={onRemove}
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                            disabled={disabled}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className={cn(
                        "w-full aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-zinc-50/50",
                        isDragActive ? "border-primary bg-primary/10" : "border-zinc-200 hover:bg-zinc-100",
                        (disabled || isUploading) && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
                    onDragOver={!disabled && !isUploading ? handleDragOver : undefined}
                    onDragLeave={!disabled && !isUploading ? handleDragLeave : undefined}
                    onDrop={!disabled && !isUploading ? handleDrop : undefined}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
                            <div className="text-xs text-zinc-500 font-medium">{progress}% Uploading...</div>
                            <div className="w-24 h-1 bg-zinc-200 rounded-full overflow-hidden">
                                <div className="h-full bg-zinc-900 transition-all duration-300" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-white transition-colors">
                                <CloudUpload className="h-5 w-5 text-zinc-500" />
                            </div>
                            <div className="text-sm text-zinc-500 font-medium">Click or drag image to upload</div>
                            <div className="text-xs text-zinc-400">Max 5MB (JPG, PNG, WebP)</div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
