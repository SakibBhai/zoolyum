
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface UseFileUploadProps {
  onUploadComplete: (url: string) => void;
}

export const useFileUpload = ({ onUploadComplete }: UseFileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const uploadFile = async (file: File) => {
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
      // Check if the user is authenticated before uploading
      if (!isAuthenticated) {
        throw new Error('You must be logged in to upload files');
      }

      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = fileName;

      console.log('Starting file upload:', { fileName, filePath, fileType: file.type });

      // Upload the file to Supabase Storage with content type
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        throw error;
      }

      console.log('Upload successful:', data);

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);
      
      console.log("File public URL:", publicUrl);
      onUploadComplete(publicUrl);
      
      toast({
        title: "Upload complete",
        description: "The image has been uploaded successfully",
      });

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setUploadError(`Error uploading file: ${errorMessage}`);
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadError,
    uploadFile,
    setUploadError
  };
};
