
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface FooterLink {
  id: string;
  section: string;
  title: string;
  url: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface FooterLinkInput {
  section: string;
  title: string;
  url: string;
  display_order?: number;
}

export const useFooterLinks = () => {
  const queryClient = useQueryClient();

  // Fetch all footer links
  const {
    data: footerLinks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["footer-links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("footer_links")
        .select("*")
        .order("section")
        .order("display_order");

      if (error) {
        console.error("Error fetching footer links:", error);
        throw new Error(error.message);
      }

      return data as FooterLink[];
    },
  });

  // Group footer links by section
  const getFooterLinksBySection = () => {
    const sections: Record<string, FooterLink[]> = {};
    
    footerLinks.forEach(link => {
      if (!sections[link.section]) {
        sections[link.section] = [];
      }
      sections[link.section].push(link);
    });
    
    return sections;
  };

  // Add a new footer link
  const addFooterLink = useMutation({
    mutationFn: async (newLink: FooterLinkInput) => {
      const { data, error } = await supabase
        .from("footer_links")
        .insert(newLink)
        .select()
        .single();

      if (error) {
        console.error("Error adding footer link:", error);
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer-links"] });
      toast.success("Footer link added successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to add footer link: ${error.message}`);
    },
  });

  // Update an existing footer link
  const updateFooterLink = useMutation({
    mutationFn: async ({ id, ...updatedLink }: FooterLink) => {
      const { data, error } = await supabase
        .from("footer_links")
        .update(updatedLink)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating footer link:", error);
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer-links"] });
      toast.success("Footer link updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update footer link: ${error.message}`);
    },
  });

  // Delete a footer link
  const deleteFooterLink = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("footer_links")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting footer link:", error);
        throw new Error(error.message);
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer-links"] });
      toast.success("Footer link deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete footer link: ${error.message}`);
    },
  });

  return {
    footerLinks,
    getFooterLinksBySection,
    isLoading,
    error,
    addFooterLink,
    updateFooterLink,
    deleteFooterLink,
  };
};
