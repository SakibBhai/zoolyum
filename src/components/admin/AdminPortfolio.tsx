
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProjectForm from "./portfolio/ProjectForm";
import ProjectList from "./portfolio/ProjectList";

// Define the Project type
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

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

const emptyProject: Project = {
  id: 0,
  title: "",
  category: "",
  description: "",
  image: "",
};

const AdminPortfolio = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>(emptyProject);
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

  const handleEdit = (project: Project) => {
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

  const handleSubmit = (updatedProject: Project) => {
    if (projects.some(p => p.id === updatedProject.id)) {
      // Update existing project
      setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
      toast({
        title: "Project updated",
        description: "The project has been updated successfully",
      });
    } else {
      // Add new project
      setProjects([...projects, updatedProject]);
      toast({
        title: "Project added",
        description: "The new project has been added successfully",
      });
    }
    
    setIsEditing(false);
    setCurrentProject(emptyProject);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentProject(emptyProject);
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
        <ProjectForm 
          initialProject={currentProject}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <ProjectList 
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminPortfolio;
