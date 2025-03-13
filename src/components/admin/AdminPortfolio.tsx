
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProjectForm from "./portfolio/ProjectForm";
import ProjectList from "./portfolio/ProjectList";
import { supabase } from "@/integrations/supabase/client";

// Define the Project type
interface Project {
  id: number | string;
  title: string;
  category: string;
  description: string;
  image: string;
}

const emptyProject: Project = {
  id: 0,
  title: "",
  category: "",
  description: "",
  image: "",
};

const AdminPortfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>(emptyProject);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error fetching projects",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentProject({
      id: 0,
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

  const handleDelete = async (id: number | string) => {
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setProjects(projects.filter(project => project.id !== id));
      toast({
        title: "Project deleted",
        description: "The project has been removed successfully",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error deleting project",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (updatedProject: Project) => {
    try {
      if (updatedProject.id !== 0) {
        // Update existing project
        const { error } = await supabase
          .from('portfolio_projects')
          .update({
            title: updatedProject.title,
            category: updatedProject.category,
            description: updatedProject.description,
            image: updatedProject.image
          })
          .eq('id', updatedProject.id);
        
        if (error) {
          throw error;
        }
        
        setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
        toast({
          title: "Project updated",
          description: "The project has been updated successfully",
        });
      } else {
        // Add new project
        const { data, error } = await supabase
          .from('portfolio_projects')
          .insert({
            title: updatedProject.title,
            category: updatedProject.category,
            description: updatedProject.description,
            image: updatedProject.image
          })
          .select();
        
        if (error) {
          throw error;
        }
        
        setProjects([...projects, data[0]]);
        toast({
          title: "Project added",
          description: "The new project has been added successfully",
        });
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error saving project",
        description: error.message,
        variant: "destructive"
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
        <>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ProjectList 
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdminPortfolio;
