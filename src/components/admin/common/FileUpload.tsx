
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  currentImageUrl?: string;
  label?: string;
}

const FileUpload = ({ onUploadComplete, currentImageUrl, label = "Image" }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      return;
    }

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('File size must be less than 2MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      
      // Upload to public folder to simplify access
      const filePath = `public/${fileName}`;

      // Check if the user is authenticated before uploading
      if (!isAuthenticated) {
        throw new Error('You must be logged in to upload files');
      }

      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, {
          upsert: true,
          cacheControl: '3600',
        });

      if (error) throw error;

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(filePath);
      
      setPreview(publicUrl);
      onUploadComplete(publicUrl);
      
      toast({
        title: "Upload complete",
        description: "The image has been uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError(`Error uploading file: ${error.message || 'Please try again.'}`);
      toast({
        title: "Upload failed",
        description: error.message || "An error occurred during upload",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
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
        <div className="relative">
          <div className="border rounded-md overflow-hidden h-48 bg-gray-50 flex items-center justify-center">
            <img src={preview} alt="Preview" className="h-full object-contain" />
          </div>
          <Button 
            size="sm" 
            variant="destructive" 
            className="absolute top-2 right-2 p-1 h-8 w-8" 
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
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
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {isUploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>
        </div>
      )}

      {uploadError && (
        <Alert variant="destructive">
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
