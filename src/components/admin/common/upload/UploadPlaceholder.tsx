
import { ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UploadPlaceholderProps {
  isUploading: boolean;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadPlaceholder = ({ isUploading, onFileSelect }: UploadPlaceholderProps) => {
  return (
    <div className="border rounded-md p-4 bg-gray-50">
      <div className="flex flex-col items-center gap-2">
        <ImageIcon className="h-10 w-10 text-gray-400" />
        <div className="text-center">
          <Label 
            htmlFor="file-upload" 
            className="text-primary hover:underline cursor-pointer"
          >
            Click to upload
          </Label>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG or WEBP (max. 2MB)
          </p>
        </div>
        <Input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onFileSelect}
          disabled={isUploading}
        />
        {isUploading && <p className="text-sm text-gray-500">Uploading...</p>}
      </div>
    </div>
  );
};

export default UploadPlaceholder;
