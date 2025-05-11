
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
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "./RichTextEditor";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
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
    
    // Clear validation error for title if it exists
    if (validationErrors.title) {
      const newErrors = {...validationErrors};
      delete newErrors.title;
      setValidationErrors(newErrors);
    }
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
        const uniqueCategories = [...new Set(data.map(item => item.category).filter(Boolean))];
        
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
    // Reinitialize post state when initialPost changes
    setPost({
      ...initialPost,
      slug: initialPost.slug || '',
      meta_title: initialPost.meta_title || '',
      meta_description: initialPost.meta_description || '',
      meta_keywords: initialPost.meta_keywords || '',
      meta_image: initialPost.meta_image || ''
    });
    
    // Clear validation errors when form resets
    setValidationErrors({});
  }, [initialPost]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!post.title?.trim()) errors.title = "Title is required";
    if (!post.category?.trim()) errors.category = "Category is required";
    if (!post.slug?.trim()) errors.slug = "Slug is required";
    if (!post.excerpt?.trim()) errors.excerpt = "Short description is required";
    if (!post.content?.trim()) errors.content = "Content is required";
    if (!post.author?.trim()) errors.author = "Author is required";
    if (!post.date) errors.date = "Date is required";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      console.log("Validation errors:", validationErrors);
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Pass the post data to the parent component
      await onSubmit(post);
    } catch (error: any) {
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
    // Make sure URL is valid before setting it
    if (url && typeof url === 'string') {
      setPost({...post, [field]: url});
      console.log(`Image uploaded for ${field}:`, url);
    } else {
      console.warn(`Invalid image URL received for ${field}:`, url);
    }
  };

  const addCustomCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setPost({...post, category: newCategory});
      setNewCategory("");
      setShowCustomCategory(false);
      
      // Clear validation error for category if it exists
      if (validationErrors.category) {
        const newErrors = {...validationErrors};
        delete newErrors.category;
        setValidationErrors(newErrors);
      }
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
                  value={post.title || ''} 
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className={validationErrors.title ? "border-red-500" : ""}
                  placeholder="Blog Title"
                />
                {validationErrors.title && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                <div className="flex gap-2">
                  <Select 
                    value={post.category || ''}
                    onValueChange={(value) => {
                      if (value === "custom") {
                        setShowCustomCategory(true);
                      } else {
                        setPost({...post, category: value});
                        
                        // Clear validation error for category if it exists
                        if (validationErrors.category) {
                          const newErrors = {...validationErrors};
                          delete newErrors.category;
                          setValidationErrors(newErrors);
                        }
                      }
                    }}
                  >
                    <SelectTrigger className={`w-full ${validationErrors.category ? "border-red-500" : ""}`}>
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
                {validationErrors.category && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
                <Input 
                  id="slug" 
                  value={post.slug || ''} 
                  onChange={(e) => {
                    setPost({...post, slug: e.target.value});
                    
                    // Clear validation error for slug if it exists
                    if (validationErrors.slug) {
                      const newErrors = {...validationErrors};
                      delete newErrors.slug;
                      setValidationErrors(newErrors);
                    }
                  }}
                  className={validationErrors.slug ? "border-red-500" : ""}
                  placeholder="slug-goes-here"
                />
                {validationErrors.slug && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.slug}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author <span className="text-red-500">*</span></Label>
                <Input 
                  id="author" 
                  value={post.author || ''} 
                  onChange={(e) => {
                    setPost({...post, author: e.target.value});
                    
                    // Clear validation error for author if it exists
                    if (validationErrors.author) {
                      const newErrors = {...validationErrors};
                      delete newErrors.author;
                      setValidationErrors(newErrors);
                    }
                  }}
                  className={validationErrors.author ? "border-red-500" : ""}
                  placeholder="Author name"
                />
                {validationErrors.author && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.author}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
                <Input 
                  id="date" 
                  type="date"
                  value={post.date || new Date().toISOString().split('T')[0]} 
                  onChange={(e) => {
                    setPost({...post, date: e.target.value});
                    
                    // Clear validation error for date if it exists
                    if (validationErrors.date) {
                      const newErrors = {...validationErrors};
                      delete newErrors.date;
                      setValidationErrors(newErrors);
                    }
                  }}
                  className={validationErrors.date ? "border-red-500" : ""}
                />
                {validationErrors.date && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.date}</p>
                )}
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
                  value={post.excerpt || ''} 
                  onChange={(e) => {
                    setPost({...post, excerpt: e.target.value});
                    
                    // Clear validation error for excerpt if it exists
                    if (validationErrors.excerpt) {
                      const newErrors = {...validationErrors};
                      delete newErrors.excerpt;
                      setValidationErrors(newErrors);
                    }
                  }}
                  rows={4}
                  className={validationErrors.excerpt ? "border-red-500" : ""}
                  placeholder="Brief summary of your post"
                />
                {validationErrors.excerpt && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.excerpt}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Description <span className="text-red-500">*</span></Label>
                <div className={validationErrors.content ? "border border-red-500 rounded-md" : ""}>
                  <RichTextEditor 
                    initialValue={post.content || ''}
                    onChange={(content) => {
                      setPost({...post, content});
                      
                      // Clear validation error for content if it exists
                      if (validationErrors.content && content?.trim()) {
                        const newErrors = {...validationErrors};
                        delete newErrors.content;
                        setValidationErrors(newErrors);
                      }
                    }}
                  />
                </div>
                {validationErrors.content && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.content}</p>
                )}
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
          
          {/* Error Summary */}
          {Object.keys(validationErrors).length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>
                Please fill in all required fields marked with an asterisk (*).
              </AlertDescription>
            </Alert>
          )}
          
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
              ) : post.id ? (
                "Update"
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;
