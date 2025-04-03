
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FileUpload from "../common/FileUpload";
import { Info, PlusCircle, BookOpen, Lightbulb } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
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

interface BlogFormProps {
  initialPost: BlogPost;
  onSubmit: (post: BlogPost) => void;
  onCancel: () => void;
}

const BlogForm = ({ initialPost, onSubmit, onCancel }: BlogFormProps) => {
  const [post, setPost] = useState<BlogPost>(initialPost);
  const [categories, setCategories] = useState<string[]>([
    "Design", "Development", "Marketing", "Business", "Technology"
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [showSeoTips, setShowSeoTips] = useState(false);

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
    setPost(initialPost);
  }, [initialPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(post);
  };

  const handleImageUpload = (url: string) => {
    setPost({...post, image: url});
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
        {/* SEO Tips Collapsible Section */}
        <Collapsible 
          open={showSeoTips} 
          onOpenChange={setShowSeoTips}
          className="mb-6 border border-border rounded-lg overflow-hidden"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-muted/30">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium">SEO Best Practices</h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {showSeoTips ? "-" : "+"}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 bg-card text-sm space-y-4">
              <div>
                <h4 className="font-semibold mb-1">SEO-Friendly URL Structure:</h4>
                <p>Keep URLs short and descriptive:</p>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 font-medium">✅</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">example.com/real-estate-investment-dubai</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-medium">❌</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">example.com/blog?id=1234</code>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-1">Optimized Headings & Content:</h4>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Use H1 for the main title and H2-H3 for subheadings.</li>
                  <li>Write engaging and value-driven content.</li>
                  <li>Use bullet points & short paragraphs for readability.</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-1">Meta Title & Description:</h4>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Meta Title: 50-60 characters, keyword-rich, catchy.</li>
                  <li>Meta Description: 150-160 characters, summarizing the content.</li>
                </ul>
                <div className="mt-1">
                  <p>Example:</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-green-500 font-medium">✅</span>
                    <p className="text-xs font-medium">"Top 10 Real Estate Investment Tips in Dubai | Expert Guide"</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-1">Internal & External Linking:</h4>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Link to other relevant blog posts & service pages within your site.</li>
                  <li>Include external links to high-authority sources for credibility.</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-1">Image Optimization:</h4>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Use descriptive filenames & ALT text for images.</li>
                  <li>Compress images to improve page load speed.</li>
                </ul>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={post.title} 
              onChange={(e) => setPost({...post, title: e.target.value})}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
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
                    <SelectValue placeholder="Select a category" />
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
              <Label htmlFor="author">Author</Label>
              <Input 
                id="author" 
                value={post.author} 
                onChange={(e) => setPost({...post, author: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Publish Date</Label>
              <Input 
                id="date" 
                type="date"
                value={post.date} 
                onChange={(e) => setPost({...post, date: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea 
              id="excerpt" 
              value={post.excerpt} 
              onChange={(e) => setPost({...post, excerpt: e.target.value})}
              rows={2}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="content">Content</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={16} className="text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="max-w-sm">
                      <p className="mb-1"><strong>Special Content Tags:</strong></p>
                      <p className="mb-1">• Add images: <code>[image:https://example.com/image.jpg]</code></p>
                      <p className="mb-1">• Add videos: <code>[video:https://youtube.com/watch?v=xxxxx]</code></p>
                      <p className="mb-1">• Add hyperlinks: <code>[link:https://example.com:Link Text]</code></p>
                      <p>• URLs will automatically become clickable links</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea 
              id="content" 
              value={post.content} 
              onChange={(e) => setPost({...post, content: e.target.value})}
              rows={12}
              required
              placeholder="Write your content here. Use special tags for enhanced features:
- Add images with [image:https://example.com/image.jpg]
- Add videos with [video:https://youtube.com/watch?v=xxxxx]
- Add custom hyperlinks with [link:https://example.com:Link Text]
- URLs will automatically become clickable links"
              className="font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <FileUpload 
              onUploadComplete={handleImageUpload}
              currentImageUrl={post.image}
              label="Feature Image"
            />
            <p className="text-xs text-muted-foreground">
              For SEO: Use descriptive filenames and ensure images are properly sized and compressed.
            </p>
          </div>
          
          <div className="flex gap-2 justify-end mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowSeoTips(!showSeoTips)}
              className="mr-auto"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              {showSeoTips ? "Hide SEO Tips" : "Show SEO Tips"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {post.id ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;
