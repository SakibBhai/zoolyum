
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  useEffect(() => {
    setProject(initialProject);
  }, [initialProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(project);
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
            <Select 
              value={project.category}
              onValueChange={(value) => setProject({...project, category: value})}
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
              value={project.description} 
              onChange={(e) => setProject({...project, description: e.target.value})}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input 
              id="image" 
              value={project.image} 
              onChange={(e) => setProject({...project, image: e.target.value})}
              required
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
