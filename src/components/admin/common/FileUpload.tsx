
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useFileUpload } from "./upload/useFileUpload";
import ImagePreview from "./upload/ImagePreview";
import UploadPlaceholder from "./upload/UploadPlaceholder";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  currentImageUrl?: string;
  label?: string;
}

const FileUpload = ({ onUploadComplete, currentImageUrl, label = "Image" }: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const { isAuthenticated } = useAuth();
  const { isUploading, uploadError, uploadFile, setUploadError } = useFileUpload({
    onUploadComplete
  });

  useEffect(() => {
    // Update preview when currentImageUrl changes
    if (currentImageUrl) {
      setPreview(currentImageUrl);
    }
  }, [currentImageUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    console.log('File selected:', { name: file.name, type: file.type, size: file.size });
    
    // Clear any previous error before attempting upload
    setUploadError(null);

    // Check authentication before trying upload
    if (!isAuthenticated) {
      setUploadError('You must be logged in to upload files');
      return;
    }

    const uploadedUrl = await uploadFile(file);
    if (uploadedUrl) {
      setPreview(uploadedUrl);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onUploadComplete('');
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="file-upload">{label}</Label>
      
      {preview ? (
        <ImagePreview 
          imageUrl={preview}
          onRemove={handleRemoveImage}
        />
      ) : (
        <UploadPlaceholder
          isUploading={isUploading}
          onFileSelect={handleFileChange}
        />
      )}

      {uploadError && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}
      
      {!isAuthenticated && (
        <Alert variant="destructive">
          <AlertDescription>
            You must be logged in to upload files. Please log in first.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FileUpload;
