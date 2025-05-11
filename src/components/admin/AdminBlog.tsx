
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import the components
import BlogForm from "./blog/BlogForm";
import BlogList from "./blog/BlogList";
import { useBlogPosts, BlogPost } from "./blog/useBlogPosts";

const AdminBlog = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    id: "",
    title: "",
    category: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    date: new Date().toISOString().split('T')[0],
    image: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_image: ""
  });
  const { toast } = useToast();
  const { posts, isLoading, deletePost, savePost, fetchPosts } = useBlogPosts();

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentPost({
      id: "",
      title: "",
      category: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "",
      date: new Date().toISOString().split('T')[0],
      image: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      meta_image: ""
    });
  };

  const handleEdit = (post: BlogPost) => {
    setIsEditing(true);
    setCurrentPost({...post});
  };

  const handleSubmit = async (post: BlogPost) => {
    console.log("Submitting blog post:", post);
    
    try {
      // Validate required fields before saving
      if (!post.title) throw new Error("Title is required");
      if (!post.category) throw new Error("Category is required");
      if (!post.excerpt) throw new Error("Short Description is required");
      if (!post.content) throw new Error("Content is required");
      if (!post.author) throw new Error("Author is required");
      if (!post.date) throw new Error("Date is required");
      
      const success = await savePost(post);
      if (success) {
        fetchPosts(); // Refresh the posts after saving
        setIsEditing(false);
        setCurrentPost({ 
          id: "", 
          title: "", 
          category: "", 
          slug: "", 
          excerpt: "", 
          content: "", 
          author: "", 
          date: new Date().toISOString().split('T')[0], 
          image: "",
          meta_title: "",
          meta_description: "",
          meta_keywords: "",
          meta_image: ""
        });
      } else {
        toast({
          title: "Submission failed",
          description: "Unable to save the blog post. Please review the form.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Validation Error",
        description: error.message || "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentPost({ 
      id: "", 
      title: "", 
      category: "", 
      slug: "", 
      excerpt: "", 
      content: "", 
      author: "", 
      date: new Date().toISOString().split('T')[0], 
      image: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      meta_image: ""
    });
  };

  const handlePreview = (post: BlogPost) => {
    toast({
      title: "Post Preview",
      description: "This would show a preview of the post in a real implementation",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add New Post
        </Button>
      </div>

      {isEditing ? (
        <BlogForm 
          initialPost={currentPost} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      ) : (
        <BlogList 
          posts={posts} 
          onEdit={handleEdit} 
          onDelete={deletePost} 
          onPreview={handlePreview} 
          isLoading={isLoading} 
        />
      )}
    </div>
  );
};

export default AdminBlog;
