
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
    if (!file) return null;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      return null;
    }

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('File size must be less than 2MB');
      return null;
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
      const filePath = `uploads/${fileName}`;

      console.log('Starting file upload:', { fileName, filePath, fileType: file.type, fileSize: file.size });

      // First, check if the bucket exists and create it if it doesn't
      const { data: bucketData, error: bucketError } = await supabase.storage
        .getBucket('uploads');
        
      if (bucketError && bucketError.message.includes('The resource was not found')) {
        // Create the bucket if it doesn't exist
        console.log('Creating uploads bucket...');
        const { error: createError } = await supabase.storage.createBucket('uploads', {
          public: true, // Make the bucket public
          fileSizeLimit: 2097152, // 2MB
        });
        
        if (createError) {
          console.error('Error creating bucket:', createError);
          throw new Error(`Failed to create storage bucket: ${createError.message}`);
        }
      } else if (bucketError) {
        console.error('Error checking bucket:', bucketError);
        throw bucketError;
      }

      // Set up the right content type
      const options = {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true
      };

      // Try the upload
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, options);

      if (error) {
        console.error('Supabase storage upload error:', error);
        
        // Handle specific RLS policy errors with user-friendly messages
        // StorageError object doesn't have statusCode property, so we check the message
        if (error.message.includes('row-level security') || 
            error.message.includes('permission denied') || 
            error.message.includes('403')) {
          throw new Error('Permission denied. Make sure you are logged in and have the right permissions.');
        }
        
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
    } catch (error: any) {
      console.error('Error uploading file:', error);
      
      let errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      
      // Handle specific errors with user-friendly messages
      if (errorMessage.includes('row-level security') || 
          errorMessage.includes('new row violates') || 
          errorMessage.includes('403')) {
        errorMessage = 'Permission denied. Contact your administrator to set up proper storage permissions.';
      }
      
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
