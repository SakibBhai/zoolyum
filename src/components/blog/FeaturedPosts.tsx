
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/components/admin/blog/useBlogPosts";

interface FeaturedPostsProps {
  posts: BlogPost[];
  calculateReadTime: (post: BlogPost) => string;
}

const FeaturedPosts = ({ posts, calculateReadTime }: FeaturedPostsProps) => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 fade-up">Featured Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <div 
            key={post.id}
            className="rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:translate-y-[-5px] bg-card fade-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="h-60 overflow-hidden">
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
                  <Clock size={14} className="mr-1" />
                  {calculateReadTime(post)}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{post.title}</h3>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <Link 
                to={`/blog/${post.id}`} 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                Read More <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
