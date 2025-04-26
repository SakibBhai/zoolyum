
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { BlogPost } from "@/components/admin/blog/useBlogPosts";

interface BlogGridProps {
  posts: BlogPost[];
  formatDate: (date: string) => string;
}

const BlogGrid = ({ posts, formatDate }: BlogGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <div 
          key={post.id} 
          className="rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:translate-y-[-5px] bg-card fade-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="h-48 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar size={14} className="mr-1" />
                {formatDate(post.date)}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">{post.title}</h3>
            <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
            <Link 
              to={`/blog/${post.id}`} 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              Read Article <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogGrid;
