
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Import the new components
import BlogForm from "./blog/BlogForm";
import BlogList from "./blog/BlogList";
import { useBlogPosts, BlogPost } from "./blog/useBlogPosts";

const AdminBlog = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    id: "",
    title: "",
    category: "",
    excerpt: "",
    content: "",
    author: "",
    date: "",
    image: "",
  });
  const { toast } = useToast();
  const { posts, isLoading, deletePost, savePost } = useBlogPosts();

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentPost({
      id: "",
      title: "",
      category: "",
      excerpt: "",
      content: "",
      author: "",
      date: new Date().toISOString().split('T')[0],
      image: "",
    });
  };

  const handleEdit = (post: BlogPost) => {
    setIsEditing(true);
    setCurrentPost(post);
  };

  const handleSubmit = async (post: BlogPost) => {
    const success = await savePost(post);
    if (success) {
      setIsEditing(false);
      setCurrentPost({ id: "", title: "", category: "", excerpt: "", content: "", author: "", date: "", image: "" });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentPost({ id: "", title: "", category: "", excerpt: "", content: "", author: "", date: "", image: "" });
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
