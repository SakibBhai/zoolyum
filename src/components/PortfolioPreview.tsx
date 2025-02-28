
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const PortfolioPreview = () => {
  // Sample featured projects - just showing 3 for the preview
  const featuredProjects = [
    {
      id: 1,
      title: "Luxury Brand Redesign",
      category: "Branding & Identity",
      description: "Complete rebranding for a premium jewelry company, including logo design, brand guidelines, and marketing materials.",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "E-commerce Growth Campaign",
      category: "Digital Marketing & Growth",
      description: "Implemented a comprehensive digital marketing strategy that increased online sales by 78% in just three months.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Premium Real Estate Website",
      category: "Web & UI/UX Design",
      description: "Designed and developed a conversion-optimized website for a luxury real estate agency with virtual tour integration.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="portfolio" className="py-20 px-4 bg-secondary/5">
      <div className="container mx-auto">
        <div className="text-center">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Our Portfolio
          </span>
          <h2 className="mt-8 text-3xl md:text-4xl font-bold text-secondary">
            Featured Projects
          </h2>
          <p className="mt-4 text-secondary/80 max-w-2xl mx-auto">
            Explore a selection of our best work across different industries and services.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 fade-up"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <a href="#" className="text-white flex items-center gap-2 font-medium">
                    View Project <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <span className="text-sm font-medium text-gray-500">{project.category}</span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/portfolio" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition-all duration-300"
          >
            View All Projects <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
