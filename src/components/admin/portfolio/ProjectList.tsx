
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProjectItem from "./ProjectItem";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectList = ({ projects, onEdit, onDelete }: ProjectListProps) => {
  return (
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
            <ProjectItem 
              key={project.id}
              project={project} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectList;
