
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  is_highlighted: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useFaqs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch FAQs from Supabase
  const fetchFaqs = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast({
        title: "Error fetching FAQs",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a FAQ
  const deleteFaq = async (id: string) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setFaqs(faqs.filter(faq => faq.id !== id));
      toast({
        title: "FAQ deleted",
        description: "The FAQ has been removed successfully",
      });
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: "Error deleting FAQ",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Update FAQ order
  const updateFaqOrder = async (reorderedFaqs: FAQ[]) => {
    try {
      // Update each FAQ one by one instead of using batch upsert
      for (const faq of reorderedFaqs) {
        const { error } = await supabase
          .from('faqs')
          .update({ display_order: faq.display_order })
          .eq('id', faq.id);
          
        if (error) {
          throw error;
        }
      }
      
      setFaqs(reorderedFaqs);
      toast({
        title: "FAQ order updated",
        description: "The FAQ order has been updated successfully",
      });
    } catch (error) {
      console.error('Error updating FAQ order:', error);
      toast({
        title: "Error updating FAQ order",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Add or update a FAQ
  const saveFaq = async (faq: Partial<FAQ>) => {
    try {
      if (faq.id) {
        // Update existing FAQ
        const { error } = await supabase
          .from('faqs')
          .update({
            question: faq.question,
            answer: faq.answer,
            category: faq.category,
            is_highlighted: faq.is_highlighted,
            display_order: faq.display_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', faq.id);
        
        if (error) {
          throw error;
        }
        
        setFaqs(faqs.map(f => f.id === faq.id ? {...f, ...faq, updated_at: new Date().toISOString()} : f));
        toast({
          title: "FAQ updated",
          description: "The FAQ has been updated successfully",
        });
        return true;
      } else {
        // Add new FAQ
        const newFaq = {
          question: faq.question || '',
          answer: faq.answer || '',
          category: faq.category || null,
          is_highlighted: faq.is_highlighted || false,
          display_order: faq.display_order || faqs.length + 1
        };
        
        const { data, error } = await supabase
          .from('faqs')
          .insert(newFaq)
          .select();
        
        if (error) {
          throw error;
        }
        
        setFaqs([...faqs, data[0]]);
        toast({
          title: "FAQ added",
          description: "The new FAQ has been added successfully",
        });
        return true;
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast({
        title: "Error saving FAQ",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return {
    faqs,
    isLoading,
    fetchFaqs,
    deleteFaq,
    saveFaq,
    updateFaqOrder
  };
};
