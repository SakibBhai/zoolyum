
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
}

const ImagePreview = ({ imageUrl, onRemove }: ImagePreviewProps) => {
  return (
    <div className="relative">
      <div className="border rounded-md overflow-hidden h-48 bg-gray-50 flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt="Preview" 
          className="h-full object-contain"
          onError={(e) => {
            console.error("Image failed to load:", imageUrl);
            e.currentTarget.src = "/placeholder.svg";
          }} 
        />
      </div>
      <Button 
        size="sm" 
        variant="destructive" 
        className="absolute top-2 right-2 p-1 h-8 w-8" 
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ImagePreview;
