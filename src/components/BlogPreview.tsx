
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";

const BlogPreview = () => {
  // Sample blog posts - just showing 3 for the preview
  const featuredPosts = [
    {
      id: 1,
      title: "10 Branding Trends to Watch in 2023",
      category: "Branding",
      excerpt: "Discover the latest trends shaping brand identity and how to leverage them for your business.",
      image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80",
      date: "June 12, 2023",
      author: "Sarah Johnson"
    },
    {
      id: 2,
      title: "How to Create a Social Media Strategy That Actually Works",
      category: "Digital Marketing",
      excerpt: "Learn the step-by-step process to develop a social media strategy that drives engagement and conversions.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2374&q=80",
      date: "July 5, 2023",
      author: "Michael Chen"
    },
    {
      id: 3,
      title: "UX Design Principles Every Website Owner Should Know",
      category: "Web Design",
      excerpt: "Explore essential UX design principles that can dramatically improve your website's performance and user satisfaction.",
      image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80",
      date: "August 17, 2023",
      author: "Alex Rodriguez"
    }
  ];

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
                    {post.date}
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
