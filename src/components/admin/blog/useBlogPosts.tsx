
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";

// Blog post interface with SEO fields
export interface BlogPost {
  id: string;
  title: string;
  category: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  meta_image?: string;
}

export type SortField = "title" | "date" | "category" | "author";
export type SortDirection = "asc" | "desc";
export type FilterOptions = {
  category?: string;
  author?: string;
  searchQuery?: string;
};

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const { toast } = useToast();

  // Set up realtime subscription
  useRealtimeSubscription({
    table: 'blog_posts',
    events: ['INSERT', 'UPDATE', 'DELETE'],
    onInsert: (payload) => {
      console.log('New blog post added:', payload);
      fetchPosts(); // Refresh the posts
    },
    onUpdate: (payload) => {
      console.log('Blog post updated:', payload);
      fetchPosts(); // Refresh the posts
    },
    onDelete: (payload) => {
      console.log('Blog post deleted:', payload);
      fetchPosts(); // Refresh the posts
    }
  });

  // Fetch blog posts from Supabase with sorting and filtering
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order(sortField, { ascending: sortDirection === 'asc' });
      
      // Apply category filter if set
      if (filterOptions.category) {
        query = query.eq('category', filterOptions.category);
      }
      
      // Apply author filter if set
      if (filterOptions.author) {
        query = query.eq('author', filterOptions.author);
      }
      
      // Apply search query if set
      if (filterOptions.searchQuery) {
        query = query.or(`title.ilike.%${filterOptions.searchQuery}%,content.ilike.%${filterOptions.searchQuery}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      // Map the data from Supabase to match our BlogPost interface
      const mappedData: BlogPost[] = (data || []).map(post => ({
        id: post.id,
        title: post.title,
        category: post.category,
        slug: post.slug || generateSlugFromTitle(post.title), // Generate slug if not present
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        date: post.date,
        image: post.image,
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
        meta_keywords: post.meta_keywords || '',
        meta_image: post.meta_image || ''
      }));
      
      setPosts(mappedData);
      
      // Extract unique categories and authors for filter dropdowns
      if (data) {
        const uniqueCategories = [...new Set(data.map(post => post.category))];
        const uniqueAuthors = [...new Set(data.map(post => post.author))];
        setCategories(uniqueCategories);
        setAuthors(uniqueAuthors);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error fetching blog posts",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to generate a slug from title
  const generateSlugFromTitle = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-');     // Replace multiple hyphens with a single one
  };

  // Set sort options and refetch
  const sortPosts = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
  };

  // Set filter options and refetch
  const filterPosts = (options: Partial<FilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...options }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterOptions({});
  };

  // Delete a blog post
  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setPosts(posts.filter(post => post.id !== id));
      toast({
        title: "Post deleted",
        description: "The blog post has been removed successfully",
      });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error deleting blog post",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Add or update a blog post
  const savePost = async (post: BlogPost) => {
    try {
      if (post.id) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: post.title,
            category: post.category,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            date: post.date,
            image: post.image,
            meta_title: post.meta_title || null,
            meta_description: post.meta_description || null,
            meta_keywords: post.meta_keywords || null,
            meta_image: post.meta_image || null
          })
          .eq('id', post.id);
        
        if (error) {
          throw error;
        }
        
        toast({
          title: "Post updated",
          description: "The blog post has been updated successfully",
        });
        return true;
      } else {
        // Add new post
        const { data, error } = await supabase
          .from('blog_posts')
          .insert({
            title: post.title,
            category: post.category,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            date: post.date,
            image: post.image,
            meta_title: post.meta_title || null,
            meta_description: post.meta_description || null,
            meta_keywords: post.meta_keywords || null,
            meta_image: post.meta_image || null
          })
          .select();
        
        if (error) {
          throw error;
        }
        
        toast({
          title: "Post added",
          description: "The new blog post has been added successfully",
        });
        return true;
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error saving blog post",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  // Get post by ID
  const getPostById = (id: string): BlogPost | undefined => {
    return posts.find(post => post.id === id);
  };

  useEffect(() => {
    fetchPosts();
  }, [sortField, sortDirection, filterOptions]);

  return {
    posts,
    isLoading,
    fetchPosts,
    deletePost,
    savePost,
    getPostById,
    sortPosts,
    filterPosts,
    clearFilters,
    categories,
    authors,
    sortField,
    sortDirection,
    filterOptions
  };
};
