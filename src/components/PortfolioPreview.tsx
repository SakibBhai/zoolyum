
import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

const PortfolioPreview = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) {
          throw error;
        }
        
        setFeaturedProjects(data || []);
      } catch (error) {
        console.error('Error fetching portfolio projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

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

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
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
                    <Link to={`/portfolio?id=${project.id}`} className="text-white flex items-center gap-2 font-medium">
                      View Project <ExternalLink className="h-4 w-4" />
                    </Link>
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
        )}

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
