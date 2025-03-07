
import { useState } from "react";
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

// Sample data
const initialPosts = [
  {
    id: 1,
    title: "10 Web Design Trends for 2023",
    category: "Design",
    excerpt: "Discover the latest trends shaping the web design landscape in 2023.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.",
    author: "Jane Smith",
    date: "2023-06-15",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "How to Optimize Your Site for SEO",
    category: "Marketing",
    excerpt: "Learn proven strategies to improve your website's search engine rankings.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.",
    author: "John Doe",
    date: "2023-05-22",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const AdminBlog = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    id: 0,
    title: "",
    category: "",
    excerpt: "",
    content: "",
    author: "",
    date: "",
    image: "",
  });
  const { toast } = useToast();

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentPost({
      id: Date.now(),
      title: "",
      category: "",
      excerpt: "",
      content: "",
      author: "",
      date: new Date().toISOString().split('T')[0],
      image: "",
    });
  };

  const handleEdit = (post: typeof currentPost) => {
    setIsEditing(true);
    setCurrentPost(post);
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Post deleted",
      description: "The blog post has been removed successfully",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (posts.some(p => p.id === currentPost.id)) {
      // Update existing post
      setPosts(posts.map(p => p.id === currentPost.id ? currentPost : p));
      toast({
        title: "Post updated",
        description: "The blog post has been updated successfully",
      });
    } else {
      // Add new post
      setPosts([...posts, currentPost]);
      toast({
        title: "Post added",
        description: "The new blog post has been added successfully",
      });
    }
    
    setIsEditing(false);
    setCurrentPost({ id: 0, title: "", category: "", excerpt: "", content: "", author: "", date: "", image: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentPost({ id: 0, title: "", category: "", excerpt: "", content: "", author: "", date: "", image: "" });
  };

  const handlePreview = (post: typeof currentPost) => {
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
                  {currentPost.id !== 0 ? "Update Post" : "Publish Post"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
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
    </div>
  );
};

export default AdminBlog;
