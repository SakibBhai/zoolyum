
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";

// Blog post interface
export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  // Fetch blog posts from Supabase
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setPosts(data || []);
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
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            date: post.date,
            image: post.image
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
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            date: post.date,
            image: post.image
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

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    isLoading,
    fetchPosts,
    deletePost,
    savePost
  };
};
