
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowRight, BookOpen, Tag, Search } from "lucide-react";
import Navbar from "../components/Navbar";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [visiblePosts, setVisiblePosts] = useState<number>(6);

  // Sample blog posts
  const blogPosts = [
    {
      id: 1,
      title: "10 Branding Trends to Watch in 2023",
      category: "branding",
      summary: "Explore the latest branding trends that are shaping the industry landscape and how businesses can stay ahead.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      author: "Jessica Chen",
      date: "April 15, 2023",
      readTime: "8 min read",
      featured: true
    },
    {
      id: 2,
      title: "The Psychology of Color in Marketing",
      category: "marketing",
      summary: "Understand how color psychology influences consumer behavior and how to leverage it in your marketing strategy.",
      image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Michael Rodriguez",
      date: "May 3, 2023",
      readTime: "10 min read",
      featured: true
    },
    {
      id: 3,
      title: "UX Design Principles for Higher Conversion",
      category: "web",
      summary: "Learn the key UX design principles that can significantly improve your website's conversion rates.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Sarah Johnson",
      date: "June 12, 2023",
      readTime: "12 min read",
      featured: false
    },
    {
      id: 4,
      title: "Creating Compelling Brand Stories",
      category: "content",
      summary: "Discover how storytelling can elevate your brand and create deeper connections with your audience.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "David Park",
      date: "July 8, 2023",
      readTime: "9 min read",
      featured: false
    },
    {
      id: 5,
      title: "Social Media Strategies for 2023",
      category: "marketing",
      summary: "Expert strategies to maximize your social media presence and engagement in the current digital landscape.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2174&q=80",
      author: "Emma Wilson",
      date: "August 20, 2023",
      readTime: "7 min read",
      featured: false
    },
    {
      id: 6,
      title: "The Future of Web Design: AI and Automation",
      category: "web",
      summary: "How artificial intelligence and automation are transforming the web design industry and what it means for businesses.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Alex Thompson",
      date: "September 5, 2023",
      readTime: "11 min read",
      featured: false
    },
    {
      id: 7,
      title: "Building a Consistent Brand Voice",
      category: "branding",
      summary: "Strategies for developing and maintaining a consistent brand voice across all communication channels.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2174&q=80",
      author: "Olivia Brown",
      date: "October 14, 2023",
      readTime: "9 min read",
      featured: false
    },
    {
      id: 8,
      title: "Video Marketing: Tips for Higher Engagement",
      category: "content",
      summary: "Proven techniques to create engaging video content that resonates with your target audience.",
      image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2046&q=80",
      author: "Ryan Garcia",
      date: "November 7, 2023",
      readTime: "10 min read",
      featured: false
    }
  ];

  // Categories
  const categories = [
    { name: "all", label: "All Posts" },
    { name: "branding", label: "Branding" },
    { name: "marketing", label: "Marketing" },
    { name: "web", label: "Web Design" },
    { name: "content", label: "Content" }
  ];

  // Filter and search blog posts
  const filteredPosts = blogPosts
    .filter(post => 
      (activeCategory === "all" || post.category === activeCategory) && 
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       post.summary.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

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
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.summary}</p>
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
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.summary}</p>
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
