
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Blog post interface
interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
}

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
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
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch blog posts from Supabase
  useEffect(() => {
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

    fetchPosts();
  }, [toast]);

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

  const handleDelete = async (id: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (currentPost.id) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: currentPost.title,
            category: currentPost.category,
            excerpt: currentPost.excerpt,
            content: currentPost.content,
            author: currentPost.author,
            date: currentPost.date,
            image: currentPost.image
          })
          .eq('id', currentPost.id);
        
        if (error) {
          throw error;
        }
        
        setPosts(posts.map(p => p.id === currentPost.id ? currentPost : p));
        toast({
          title: "Post updated",
          description: "The blog post has been updated successfully",
        });
      } else {
        // Add new post
        const { data, error } = await supabase
          .from('blog_posts')
          .insert({
            title: currentPost.title,
            category: currentPost.category,
            excerpt: currentPost.excerpt,
            content: currentPost.content,
            author: currentPost.author,
            date: currentPost.date,
            image: currentPost.image
          })
          .select();
        
        if (error) {
          throw error;
        }
        
        setPosts([...posts, data[0]]);
        toast({
          title: "Post added",
          description: "The new blog post has been added successfully",
        });
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error saving blog post",
        description: error.message,
        variant: "destructive"
      });
    }
    
    setIsEditing(false);
    setCurrentPost({ id: "", title: "", category: "", excerpt: "", content: "", author: "", date: "", image: "" });
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
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={currentPost.title} 
                  onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={currentPost.category}
                    onValueChange={(value) => setCurrentPost({...currentPost, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input 
                    id="author" 
                    value={currentPost.author} 
                    onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Publish Date</Label>
                  <Input 
                    id="date" 
                    type="date"
                    value={currentPost.date} 
                    onChange={(e) => setCurrentPost({...currentPost, date: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea 
                  id="excerpt" 
                  value={currentPost.excerpt} 
                  onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  rows={2}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  value={currentPost.content} 
                  onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                  rows={8}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Feature Image URL</Label>
                <Input 
                  id="image" 
                  value={currentPost.image} 
                  onChange={(e) => setCurrentPost({...currentPost, image: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentPost.id ? "Update Post" : "Publish Post"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="w-24">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-20 h-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handlePreview(post)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(post)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(post.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBlog;
