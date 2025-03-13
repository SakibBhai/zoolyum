
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowRight, BookOpen, Tag, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  image: string;
  featured?: boolean;
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [visiblePosts, setVisiblePosts] = useState<number>(6);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch blog posts from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Process data to mark some posts as featured
        const processedPosts = data.map((post, index) => ({
          ...post,
          featured: index < 2 // Mark the first two posts as featured
        }));
        
        setBlogPosts(processedPosts || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Get unique categories
  const categories = [
    { name: "all", label: "All Posts" },
    ...Array.from(new Set(blogPosts.map(post => post.category)))
      .map(category => ({ 
        name: category.toLowerCase(), 
        label: category 
      }))
  ];

  // Filter and search blog posts
  const filteredPosts = blogPosts
    .filter(post => 
      (activeCategory === "all" || post.category.toLowerCase() === activeCategory) && 
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Calculate read time based on content length
  const calculateReadTime = (post: BlogPost) => {
    const contentLength = (post.content?.length || 0) + (post.excerpt?.length || 0);
    const wordsPerMinute = 200;
    const minutes = Math.max(1, Math.ceil(contentLength / 5 / wordsPerMinute));
    return `${minutes} min read`;
  };

  // Effect for animations
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [filteredPosts]);

  const loadMore = () => {
    setVisiblePosts(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-up">Our Blog</h1>
          <p className="text-lg text-muted-foreground mb-8 fade-up">
            Insights, strategies, and industry knowledge to help your business grow.
          </p>
          
          {/* Search bar */}
          <div className="relative max-w-md mx-auto mb-12 fade-up">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-3 pl-10 rounded-full border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Featured posts */}
            {featuredPosts.length > 0 && searchTerm === "" && activeCategory === "all" && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-8 fade-up">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.map((post, index) => (
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <User size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm">{post.author}</span>
                          </div>
                          <Link 
                            to={`/blog/${post.id}`} 
                            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                          >
                            Read More <ArrowRight size={16} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category filter */}
            <div className="flex flex-wrap gap-3 mb-8 fade-up">
              {categories.map(category => (
                <button
                  key={category.name}
                  className={`px-5 py-2 rounded-full transition-all ${
                    activeCategory === category.name 
                      ? 'bg-primary text-white' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                  onClick={() => setActiveCategory(category.name)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Blog posts grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(0, visiblePosts).map((post, index) => (
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
            ) : (
              <div className="text-center py-16 fade-up">
                <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  We couldn't find any articles matching your search. Try different keywords or browse by category.
                </p>
              </div>
            )}

            {/* Load more button */}
            {visiblePosts < filteredPosts.length && (
              <div className="text-center mt-12">
                <button 
                  onClick={loadMore}
                  className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Newsletter signup */}
        <div className="mt-24 glass rounded-xl p-8 text-center max-w-4xl mx-auto fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Get the latest industry insights and tips delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
