
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

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

interface ProjectFormProps {
  initialProject: Project;
  onSubmit: (project: Project) => void;
  onCancel: () => void;
}

const ProjectForm = ({ initialProject, onSubmit, onCancel }: ProjectFormProps) => {
  const [project, setProject] = useState<Project>(initialProject);
  const [categories, setCategories] = useState<string[]>([
    "Branding & Identity", "Web & UI/UX Design", "Digital Marketing & Growth", "Mobile App Development"
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  // Fetch existing categories from portfolio_projects table
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
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
    setProject(initialProject);
  }, [initialProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(project);
  };

  const handleImageUpload = (url: string) => {
    setProject({...project, image: url});
  };

  const addCustomCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setProject({...project, category: newCategory});
      setNewCategory("");
      setShowCustomCategory(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input 
              id="title" 
              value={project.title} 
              onChange={(e) => setProject({...project, title: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <div className="flex gap-2">
              <Select 
                value={project.category}
                onValueChange={(value) => {
                  if (value === "custom") {
                    setShowCustomCategory(true);
                  } else {
                    setProject({...project, category: value});
                  }
                }}
              >
                <SelectTrigger>
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
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={project.description} 
              onChange={(e) => setProject({...project, description: e.target.value})}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <FileUpload 
              onUploadComplete={handleImageUpload}
              currentImageUrl={project.image}
              label="Project Image"
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {project.id ? "Update Project" : "Add Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
