
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
}

const BlogPreview = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false })
          .limit(3);
        
        if (error) {
          throw error;
        }
        
        setFeaturedPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <section id="blog" className="py-20 px-4 bg-secondary/5">
      <div className="container mx-auto">
        <div className="text-center">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Blog
          </span>
          <h2 className="mt-8 text-3xl md:text-4xl font-bold text-secondary">
            Latest Insights
          </h2>
          <p className="mt-4 text-secondary/80 max-w-2xl mx-auto">
            Stay updated with our latest thoughts, tips, and industry trends.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 fade-up"
              >
                <div className="h-52 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-primary">{post.category}</span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 flex items-center">
                      <User size={12} className="mr-1" />
                      {post.author}
                    </span>
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition-all duration-300"
          >
            View All Articles <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
