
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "./useBlogPosts";

interface BlogItemProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  onPreview: (post: BlogPost) => void;
}

const BlogItem = ({ post, onEdit, onDelete, onPreview }: BlogItemProps) => {
  const navigate = useNavigate();
  
  const handleViewBlog = () => {
    // Navigate to the blog detail page
    navigate(`/blog/${post.id}`);
  };

  return (
    <TableRow key={post.id}>
      <TableCell className="w-24 cursor-pointer" onClick={handleViewBlog}>
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-20 h-16 object-cover rounded"
        />
      </TableCell>
      <TableCell className="font-medium cursor-pointer" onClick={handleViewBlog}>
        {post.title}
      </TableCell>
      <TableCell>{post.category}</TableCell>
      <TableCell>{post.author}</TableCell>
      <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => handleViewBlog()}>
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
