import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BookOpen } from "lucide-react";
import Navbar from "../components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/components/admin/blog/useBlogPosts";

// Import new components
import BlogSearch from "@/components/blog/BlogSearch";
import BlogCategories from "@/components/blog/BlogCategories";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import BlogGrid from "@/components/blog/BlogGrid";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import BlogHeader from "@/components/blog/BlogHeader";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [visiblePosts, setVisiblePosts] = useState<number>(6);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSeoTips, setShowSeoTips] = useState(false);

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
  }, [blogPosts]);

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

  const loadMore = () => {
    setVisiblePosts(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Zoolyum</title>
        <meta name="description" content="Insights, strategies, and industry knowledge to help your business grow." />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <BlogHeader 
          title="Our Blog"
          description="Insights, strategies, and industry knowledge to help your business grow."
        />
        
        <BlogSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {featuredPosts.length > 0 && searchTerm === "" && activeCategory === "all" && (
              <FeaturedPosts posts={featuredPosts} calculateReadTime={calculateReadTime} />
            )}

            <BlogCategories 
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            {filteredPosts.length > 0 ? (
              <>
                <BlogGrid posts={filteredPosts.slice(0, visiblePosts)} formatDate={formatDate} />

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
            ) : (
              <div className="text-center py-16 fade-up">
                <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  We couldn't find any articles matching your search. Try different keywords or browse by category.
                </p>
              </div>
            )}
          </>
        )}
        
        <NewsletterSignup />
      </div>
    </div>
  );
};

export default Blog;
