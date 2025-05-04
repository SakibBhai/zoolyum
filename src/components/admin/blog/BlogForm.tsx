
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FileUpload from "../common/FileUpload";
import { PlusCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import RichTextEditor from "./RichTextEditor";

// Blog post interface with additional SEO fields
interface BlogPost {
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

interface BlogFormProps {
  initialPost: BlogPost;
  onSubmit: (post: BlogPost) => void;
  onCancel: () => void;
}

const BlogForm = ({ initialPost, onSubmit, onCancel }: BlogFormProps) => {
  const [post, setPost] = useState<BlogPost>({
    ...initialPost,
    slug: initialPost.slug || '',
    meta_title: initialPost.meta_title || '',
    meta_description: initialPost.meta_description || '',
    meta_keywords: initialPost.meta_keywords || '',
    meta_image: initialPost.meta_image || ''
  });
  const [categories, setCategories] = useState<string[]>([
    "Design", "Development", "Marketing", "Business", "Technology"
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-');     // Replace multiple hyphens with a single one
  };

  // Handle title change and auto-generate slug
  const handleTitleChange = (title: string) => {
    setPost({
      ...post,
      title,
      slug: generateSlug(title)
    });
  };

  // Fetch existing categories from blog_posts table
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('category')
          .order('category');
        
        if (error) {
          console.error('Error fetching categories:', error);
          return;
        }
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        
        // Merge with default categories and deduplicate
        const allCategories = [...new Set([...categories, ...uniqueCategories])];
        
        setCategories(allCategories.sort());
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    setPost({
      ...initialPost,
      slug: initialPost.slug || '',
      meta_title: initialPost.meta_title || '',
      meta_description: initialPost.meta_description || '',
      meta_keywords: initialPost.meta_keywords || '',
      meta_image: initialPost.meta_image || ''
    });
  }, [initialPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!post.title || !post.category || !post.slug || !post.author || !post.date || !post.content) {
        throw new Error("Please fill in all required fields");
      }
      
      // Pass the post data to the parent component
      await onSubmit(post);
      
      toast({
        title: post.id ? "Post updated" : "Post published",
        description: post.id 
          ? "Your blog post has been updated successfully" 
          : "Your new blog post has been published",
      });
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error saving post",
        description: error.message || "There was a problem saving your post",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (url: string, field: 'image' | 'meta_image' = 'image') => {
    setPost({...post, [field]: url});
  };

  const addCustomCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setPost({...post, category: newCategory});
      setNewCategory("");
      setShowCustomCategory(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-md border">
            <h3 className="text-lg font-medium mb-4">Blog Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Blog Title <span className="text-red-500">*</span></Label>
                <Input 
                  id="title" 
                  value={post.title} 
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  placeholder="Blog Title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                <div className="flex gap-2">
                  <Select 
                    value={post.category}
                    onValueChange={(value) => {
                      if (value === "custom") {
                        setShowCustomCategory(true);
                      } else {
                        setPost({...post, category: value});
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                      <SelectItem value="custom">
                        <div className="flex items-center">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Custom
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Popover open={showCustomCategory} onOpenChange={setShowCustomCategory}>
                    <PopoverTrigger className="hidden">Open</PopoverTrigger>
                    <PopoverContent className="p-4 w-72">
                      <div className="space-y-2">
                        <Label htmlFor="new-category">New Category</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="new-category" 
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Enter category name"
                            autoFocus
                          />
                          <Button type="button" onClick={addCustomCategory}>
                            Add
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
                <Input 
                  id="slug" 
                  value={post.slug} 
                  onChange={(e) => setPost({...post, slug: e.target.value})}
                  required
                  placeholder="slug-goes-here"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="banner">Banner <span className="text-gray-500 text-sm">(1300x650)</span></Label>
                <FileUpload 
                  onUploadComplete={(url) => handleImageUpload(url)}
                  currentImageUrl={post.image}
                  label="Choose File"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="short-description">Short Description <span className="text-red-500">*</span></Label>
                <Textarea 
                  id="short-description" 
                  value={post.excerpt} 
                  onChange={(e) => setPost({...post, excerpt: e.target.value})}
                  rows={4}
                  required
                  placeholder="Brief summary of your post"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Description</Label>
                <RichTextEditor 
                  initialValue={post.content}
                  onChange={(content) => setPost({...post, content})}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border">
            <h3 className="text-lg font-medium mb-4">SEO Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input 
                  id="meta-title" 
                  value={post.meta_title || ''} 
                  onChange={(e) => setPost({...post, meta_title: e.target.value})}
                  placeholder="Meta Title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-image">Meta Image <span className="text-gray-500 text-sm">(200x200)+</span></Label>
                <FileUpload 
                  onUploadComplete={(url) => handleImageUpload(url, 'meta_image')}
                  currentImageUrl={post.meta_image || ''}
                  label="Choose File"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta description</Label>
                <Textarea 
                  id="meta-description" 
                  value={post.meta_description || ''} 
                  onChange={(e) => setPost({...post, meta_description: e.target.value})}
                  rows={4}
                  placeholder="Meta description for search engines"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input 
                  id="meta-keywords" 
                  value={post.meta_keywords || ''} 
                  onChange={(e) => setPost({...post, meta_keywords: e.target.value})}
                  placeholder="Meta Keywords"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  {post.id ? "Updating..." : "Saving..."}
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;
