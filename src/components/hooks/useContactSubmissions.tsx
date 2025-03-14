
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export const useContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch contact submissions from Supabase
  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      toast({
        title: "Error fetching submissions",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mark a submission as read
  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: true })
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, is_read: true } : sub
      ));
      
      toast({
        title: "Submission marked as read",
      });
    } catch (error) {
      console.error('Error updating submission:', error);
      toast({
        title: "Error updating submission",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Delete a submission
  const deleteSubmission = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setSubmissions(submissions.filter(sub => sub.id !== id));
      toast({
        title: "Submission deleted",
      });
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: "Error deleting submission",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return {
    submissions,
    isLoading,
    fetchSubmissions,
    markAsRead,
    deleteSubmission
  };
};
