
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

interface ProjectItemProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectItem = ({ project, onEdit, onDelete }: ProjectItemProps) => {
  return (
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
          <Button size="sm" variant="ghost" onClick={() => onEdit(project)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(project.id)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProjectItem;
