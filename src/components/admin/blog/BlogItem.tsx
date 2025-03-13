
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Eye } from "lucide-react";

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

interface BlogItemProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  onPreview: (post: BlogPost) => void;
}

const BlogItem = ({ post, onEdit, onDelete, onPreview }: BlogItemProps) => {
  return (
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
          <Button size="sm" variant="ghost" onClick={() => onPreview(post)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onEdit(post)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(post.id)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BlogItem;
