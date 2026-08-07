import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

interface ImageDropzoneProps {
  onImageProcessed: (
    fileData: { name: string; base64: string } | undefined,
    previewUrl: string | null,
  ) => void;
  initialPreview?: string | null;
  className?: string;
}

export function ImageDropzone({
  onImageProcessed,
  initialPreview,
  className = "",
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Canvas compression
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG, 80% quality
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);

          setPreview(dataUrl);
          onImageProcessed({ name: file.name, base64: dataUrl }, dataUrl);
        } else {
          toast.error("Failed to process image.");
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processImage(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processImage(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setPreview(null);
    onImageProcessed(undefined, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div
        className={`relative group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition-all duration-300 overflow-hidden cursor-pointer ${
          isDragging
            ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(0,200,255,0.2)]"
            : "border-border/50 bg-background/20 hover:border-primary/50 hover:bg-background/40"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !preview && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {preview ? (
          <div className="absolute inset-0 w-full h-full group">
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110"
                title="Remove image"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div
              className={`p-3 rounded-full mb-3 transition-colors ${isDragging ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"}`}
            >
              <UploadCloud className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Drag & Drop your image here
            </p>
            <p className="text-xs text-muted-foreground">or click to browse from your computer</p>
          </div>
        )}
      </div>
    </div>
  );
}
