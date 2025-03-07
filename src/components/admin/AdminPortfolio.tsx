
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
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample data - in a real app, this would come from a database
const initialProjects = [
  {
    id: 1,
    title: "Luxury Brand Redesign",
    category: "Branding & Identity",
    description: "Complete rebranding for a premium jewelry company, including logo design, brand guidelines, and marketing materials.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "E-commerce Growth Campaign",
    category: "Digital Marketing & Growth",
    description: "Implemented a comprehensive digital marketing strategy that increased online sales by 78% in just three months.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Premium Real Estate Website",
    category: "Web & UI/UX Design",
    description: "Designed and developed a conversion-optimized website for a luxury real estate agency with virtual tour integration.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const AdminPortfolio = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    id: 0,
    title: "",
    category: "",
    description: "",
    image: "",
  });
  const { toast } = useToast();

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentProject({
      id: Date.now(), // Simple ID generation
      title: "",
      category: "",
      description: "",
      image: "",
    });
  };

  const handleEdit = (project: typeof currentProject) => {
    setIsEditing(true);
    setCurrentProject(project);
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Project deleted",
      description: "The project has been removed successfully",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (projects.some(p => p.id === currentProject.id)) {
      // Update existing project
      setProjects(projects.map(p => p.id === currentProject.id ? currentProject : p));
      toast({
        title: "Project updated",
        description: "The project has been updated successfully",
      });
    } else {
      // Add new project
      setProjects([...projects, currentProject]);
      toast({
        title: "Project added",
        description: "The new project has been added successfully",
      });
    }
    
    setIsEditing(false);
    setCurrentProject({ id: 0, title: "", category: "", description: "", image: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentProject({ id: 0, title: "", category: "", description: "", image: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio Projects</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add New Project
        </Button>
      </div>

      {isEditing ? (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input 
                  id="title" 
                  value={currentProject.title} 
                  onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={currentProject.category}
                  onValueChange={(value) => setCurrentProject({...currentProject, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Branding & Identity">Branding & Identity</SelectItem>
                    <SelectItem value="Web & UI/UX Design">Web & UI/UX Design</SelectItem>
                    <SelectItem value="Digital Marketing & Growth">Digital Marketing & Growth</SelectItem>
                    <SelectItem value="Mobile App Development">Mobile App Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={currentProject.description} 
                  onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={currentProject.image} 
                  onChange={(e) => setCurrentProject({...currentProject, image: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentProject.id !== 0 ? "Update Project" : "Add Project"}
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
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="w-24">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-20 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell className="max-w-xs truncate">{project.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(project)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(project.id)}>
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

export default AdminPortfolio;
